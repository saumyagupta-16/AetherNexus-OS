"""
AetherNexus OS — 11-Industry 50-Node Multi-Fleet Simulation Engine
Generates 50Hz edge cyber-physical telemetry across all 11 enterprise sectors
"""
import time
import math
import random
from typing import Dict, Any, List
from morphos_ml import morphos_engine
from ghost_radar import ghost_radar_engine
from silicon_dna import silicon_dna_vault

INDUSTRIES = [
    {"id": "IT_PRODUCT", "name": "Product Software", "primary_node": "SIM_PROD_API_01"},
    {"id": "IT_SERVICE", "name": "Service IT & QA", "primary_node": "SIM_QA_TEST_02"},
    {"id": "SAAS", "name": "SaaS Platform", "primary_node": "SIM_SAAS_TENANT_03"},
    {"id": "IIOT", "name": "Industrial IoT & Turbines", "primary_node": "ESP32_MASTER_01"}, # Live primary pod!
    {"id": "CONSUMER_IOT", "name": "Consumer Wearables", "primary_node": "SIM_WEARABLE_05"},
    {"id": "IOT_PLATFORM", "name": "MQTT Connectivity Hub", "primary_node": "SIM_BROKER_06"},
    {"id": "SEMICONDUCTOR", "name": "Semiconductor Validation", "primary_node": "SIM_FAB_CHIP_07"},
    {"id": "CLOUD_IAAS", "name": "Cloud FinOps & Infra", "primary_node": "SIM_K8S_NODE_08"},
    {"id": "CYBERSECURITY", "name": "Cybersecurity & SecOps", "primary_node": "SIM_SOC_TERMINAL_09"},
    {"id": "AI_DATA", "name": "AI & LLM Ops", "primary_node": "SIM_NEURAL_ROUTER_10"},
    {"id": "TELECOM", "name": "Telecom Cell Tower", "primary_node": "SIM_5G_TOWER_11"},
]

class FleetSimulator:
    def __init__(self, node_count: int = 50):
        self.node_count = node_count
        self.step = 0
        
        # State override flags for interactive demonstrations:
        self.wire_severed: bool = False
        self.room_intruded: bool = False
        self.schema_broken: bool = False
        self.llm_rate_limited: bool = False

    def toggle_wire_pull(self, severed: bool) -> bool:
        self.wire_severed = severed
        return self.wire_severed

    def toggle_room_intrusion(self, intruded: bool) -> bool:
        self.room_intruded = intruded
        return self.room_intruded

    def generate_50hz_frame(self, primary_node_id: str = "ESP32_MASTER_01") -> Dict[str, Any]:
        """
        Synthesizes a single high-frequency 50Hz cyber-physical telemetry frame.
        """
        self.step += 1
        t_now = time.time()
        t_ms = int(t_now * 1000)

        # Baseline sinusoidal physics
        ambient_drift = math.sin(self.step * 0.05) * 1.5
        motor_current_ma = 380.0 + math.cos(self.step * 0.08) * 45.0 + random.uniform(-2, 2)
        bus_voltage_v = 3.29 + random.uniform(-0.015, 0.015)
        humidity_pct = 48.0 + math.sin(self.step * 0.02) * 5.0
        core_temp_c = 38.5 + (motor_current_ma * 0.01) + random.uniform(-0.2, 0.2)
        vibration_hz = 120.0 + random.uniform(-3, 3)

        # Real physical reading calculation
        nominal_temp = round(42.5 + ambient_drift + (motor_current_ma * 0.015), 2)

        # Ingest live sample into MorphOS ML engine for continuous calibration
        if not self.wire_severed:
            morphos_engine.ingest_training_sample(
                motor_current_ma, bus_voltage_v, humidity_pct, core_temp_c, vibration_hz, nominal_temp
            )

        # MorphOS Failover State Machine
        if self.wire_severed:
            # Physical wire is CUT (0V / NaN). Instant ML failover!
            synthesized_temp, confidence, inference_ms = morphos_engine.predict_phantom_temperature({
                "current_draw_ma": motor_current_ma,
                "bus_voltage_v": bus_voltage_v,
                "humidity_pct": humidity_pct,
                "core_temp_celsius": core_temp_c,
                "vibration_freq_hz": vibration_hz
            })
            temp_display = synthesized_temp
            is_synthesized = True
            is_connected = False
            node_status = "PHANTOM_HEALED"
            failover_latency_ms = inference_ms
            badge_text = f"MorphOS Phantom ML Active ({confidence*100:.1f}% Confidence)"
        else:
            temp_display = nominal_temp
            is_synthesized = False
            is_connected = True
            node_status = "HEALTHY"
            failover_latency_ms = 0.0
            badge_text = "Physical Sensor Nominal (100% SLA)"

        # GhostRadar 50Hz Wi-Fi RF Sonar calculation
        if self.room_intruded:
            # Human physical movement generates large scattering variance (> 4.2 dBm)
            raw_rssi = -52.0 + random.uniform(-14.0, 14.0)
        else:
            # Clean static baseline (variance ~ 0.25 dBm)
            raw_rssi = -52.0 + random.uniform(-0.8, 0.8)

        radar_data = ghost_radar_engine.update_rssi(raw_rssi)

        # SiliconDNA Biometric Hardware Passport
        silicon_signature = silicon_dna_vault.generate_hardware_signature(
            primary_node_id, f"temp={temp_display}", t_ms
        )

        return {
            "node_id": primary_node_id,
            "org_slug": "qualimatrix-enterprise",
            "timestamp_ms": t_ms,
            "node_status": node_status,
            "metrics": {
                "temp_celsius": temp_display,
                "is_wire_connected": is_connected,
                "is_phantom_synthesized": is_synthesized,
                "phantom_confidence": 0.964 if is_synthesized else 1.0,
                "failover_latency_ms": failover_latency_ms,
                "current_draw_ma": round(motor_current_ma, 2),
                "bus_voltage_v": round(bus_voltage_v, 3),
                "humidity_pct": round(humidity_pct, 1),
                "core_temp_celsius": round(core_temp_c, 1),
                "vibration_freq_hz": round(vibration_hz, 1),
                "wifi_rssi_dbm": round(raw_rssi, 1),
                "wifi_radar_variance": radar_data["variance"],
                "ghost_radar_state": radar_data["radar_state"],
                "lockdown_active": radar_data["lockdown_active"],
                "badge": badge_text
            },
            "silicon_dna": {
                "chip_id": "0x30AEA405D2",
                "adc_vref_jitter_uv": 14.2,
                "puf_signature": silicon_signature,
                "verified": True
            }
        }

fleet_simulator = FleetSimulator()

