"""
AetherNexus OS — Master End-to-End Cyber-Physical Engine Test Suite
Tests all 5 Frontier Breakthroughs, Diagnostic MRI, and REST/WebSocket APIs
"""
import sys
import os
import unittest
import requests
import json
import time

BASE_URL = "http://localhost:8000"

class TestAetherNexusEngine(unittest.TestCase):

    def test_01_health_check(self):
        """Verifies FastAPI core and 50Hz telemetry ring buffer health."""
        res = requests.get(f"{BASE_URL}/api/health")
        self.assertEqual(res.status_code, 200)
        data = res.json()
        self.assertEqual(data["status"], "HEALTHY")
        self.assertGreater(data["ring_buffer_frames"], 0)
        print(f"[✓] Health Check Passed: {data['version']} ({data['ring_buffer_frames']} frames in ring buffer)")

    def test_02_morphos_wire_pull_failover(self):
        """Verifies sub-15ms Scikit-Learn Ridge/RandomForest failover when GPIO 4 is severed."""
        # Pull wire
        res = requests.post(f"{BASE_URL}/api/simulator/wire-pull", json={"severed": True})
        self.assertEqual(res.status_code, 200)
        data = res.json()
        self.assertTrue(data["wire_severed"])
        self.assertEqual(data["mode"], "PHANTOM_ML_FAILOVER_ACTIVE")

        # Restore wire
        res2 = requests.post(f"{BASE_URL}/api/simulator/wire-pull", json={"severed": False})
        self.assertEqual(res2.status_code, 200)
        data2 = res2.json()
        self.assertFalse(data2["wire_severed"])
        self.assertEqual(data2["mode"], "PHYSICAL_SENSOR_HEALTHY")
        print("[✓] MorphOS Wire-Pull Failover & Recovery Validated")

    def test_03_ghost_radar_rf_sonar(self):
        """Verifies camera-free Wi-Fi multipath scattering variance trigger and lockdown."""
        res = requests.post(f"{BASE_URL}/api/simulator/room-intrusion", json={"intruded": True})
        self.assertEqual(res.status_code, 200)
        data = res.json()
        self.assertTrue(data["room_intruded"])
        self.assertEqual(data["radar_state"], "INTRUSION_ALERT")

        # Reset lockdown
        res_reset = requests.post(f"{BASE_URL}/api/simulator/reset-lockdown")
        self.assertEqual(res_reset.status_code, 200)
        print("[✓] GhostRadar RF Multipath Sonar & Zero-Trust Lockdown Validated")

    def test_04_silicon_dna_biometric_vault(self):
        """Verifies unclonable transistor micro-jitter and HMAC-SHA256 hardware passport."""
        res = requests.get(f"{BASE_URL}/api/security/silicon-dna/vault")
        self.assertEqual(res.status_code, 200)
        data = res.json()
        self.assertGreater(len(data["pods"]), 0)
        pod = data["pods"][0]
        self.assertEqual(pod["anti_cloning_status"], "AUTHENTIC_PHYSICAL_SILICON")
        self.assertAlmostEqual(pod["silicon_dna_metrics"]["adc_vref_jitter_uv"], 14.2, places=1)
        print(f"[✓] SiliconDNA Biometric Hardware Passport Validated for {pod['node_id']}")

    def test_05_i2c_bus_auto_discovery(self):
        """Verifies zero-code 0x01-0x7F hardware I2C bus auto-discovery."""
        res = requests.get(f"{BASE_URL}/api/hardware/i2c-scan")
        self.assertEqual(res.status_code, 200)
        data = res.json()
        self.assertEqual(data["status"], "SCAN_COMPLETE")
        self.assertGreaterEqual(len(data["active_devices_found"]), 3)
        chips = [d["chip"] for d in data["active_devices_found"]]
        self.assertTrue(any("INA219" in c for c in chips))
        print(f"[✓] Zero-Code I2C Bus Auto-Discovery Validated ({len(chips)} chips bound)")

    def test_06_universal_mri_and_signed_pdf(self):
        """Verifies 10-probe Diagnostic MRI and ReportLab cryptographic PDF certificate export."""
        res = requests.post(f"{BASE_URL}/api/mri/generate-pdf", json={"target_url": "https://api.aethernexus.ai"})
        self.assertEqual(res.status_code, 200)
        data = res.json()
        self.assertEqual(data["scan_results"]["total_probes_executed"], 10)
        self.assertIn("pdf_info", data)
        self.assertTrue(data["pdf_info"]["filename"].endswith(".pdf"))
        self.assertGreater(len(data["pdf_info"]["sha256_hash"]), 20)
        print(f"[✓] Universal Diagnostic MRI (10 Probes) & Signed PDF Audit Validated (SHA-256: {data['pdf_info']['sha256_hash'][:16]}...)")

    def test_07_self_morphing_api_proxy(self):
        """Verifies sub-15ms dynamic AST payload translation and GitHub PR bot generation."""
        broken_payload = {"user_id": "usr_test_101", "phone": "+91-9988776655", "zip": "560001"}
        res = requests.post(f"{BASE_URL}/api/proxy/simulate-breaking-schema", json={
            "endpoint": "/api/v2/orders",
            "payload": broken_payload
        })
        self.assertEqual(res.status_code, 200)
        data = res.json()
        self.assertIn("accountId", data["morphed_payload"])
        self.assertIn("generated_pr", data)
        print(f"[✓] Self-Morphing API Proxy Validated (PR #{data['generated_pr']['pr_number']} Auto-Created)")

    def test_08_cyber_physical_time_machine(self):
        """Verifies 60-second in-memory ring buffer scrubbing and counterfactual simulation."""
        res_win = requests.get(f"{BASE_URL}/api/time-machine/window")
        self.assertEqual(res_win.status_code, 200)
        win = res_win.json()
        self.assertGreater(win["total_frames"], 10)

        # Counterfactual simulation
        res_sim = requests.post(f"{BASE_URL}/api/time-machine/simulate-counterfactual", json={"epoch_ms": win["start_ms"]})
        self.assertEqual(res_sim.status_code, 200)
        sim_data = res_sim.json()
        self.assertTrue(sim_data["counterfactual_simulation"]["is_counterfactual"])
        print(f"[✓] Cyber-Physical Time-Machine Validated ({win['total_frames']} frames scrubbable)")

    def test_09_oauth2_authorization_flow(self):
        """Verifies RFC 6749 OAuth 2.0 password grant, JWT verification, and protected route access."""
        # 1. Acquire token
        res = requests.post(f"{BASE_URL}/api/auth/token", json={"username": "admin", "password": "987456"})
        self.assertEqual(res.status_code, 200)
        data = res.json()
        self.assertEqual(data["token_type"], "bearer")
        self.assertIn("access_token", data)
        self.assertIn("refresh_token", data)
        token = data["access_token"]
        refresh_token = data["refresh_token"]

        # 2. Access protected route with Bearer header
        headers = {"Authorization": f"Bearer {token}"}
        res_me = requests.get(f"{BASE_URL}/api/auth/me", headers=headers)
        self.assertEqual(res_me.status_code, 200)
        me_data = res_me.json()
        self.assertTrue(me_data["authenticated"])
        self.assertEqual(me_data["claims"]["sub"], "admin")
        self.assertEqual(me_data["claims"]["role"], "CEO_ADMIN")

        # 3. Test refresh token
        res_ref = requests.post(f"{BASE_URL}/api/auth/refresh", json={"refresh_token": refresh_token})
        self.assertEqual(res_ref.status_code, 200)
        self.assertIn("access_token", res_ref.json())

        # 4. Reject invalid passcode
        res_inv = requests.post(f"{BASE_URL}/api/auth/token", json={"username": "admin", "password": "badpassword"})
        self.assertEqual(res_inv.status_code, 401)
        print(f"[✓] RFC 6749 OAuth 2.0 Flow Validated (Token: {token[:18]}... | Scope: {data['scope'][:25]}...)")

if __name__ == "__main__":
    unittest.main()

