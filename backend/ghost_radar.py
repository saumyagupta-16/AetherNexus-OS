"""
AetherNexus OS — GhostRadar Camera-Free Wi-Fi RF Sonar Physics Engine
50Hz Electromagnetic Multipath Scattering Variance Filter
"""
import numpy as np
from typing import Dict, Any, List

class GhostRadarEngine:
    def __init__(self, window_size: int = 50):
        self.window_size = window_size
        self.rssi_history: List[float] = [-52.0] * window_size
        self.variance: float = 0.28
        self.state: str = "CLEAR" # CLEAR, MOTION_DETECTED, INTRUSION_ALERT
        self.lockdown_active: bool = False
        self.quarantined_tokens: List[str] = []

    def update_rssi(self, rssi: float) -> Dict[str, Any]:
        """
        Updates sliding window with latest 50Hz RSSI measurement and computes variance.
        """
        self.rssi_history.pop(0)
        self.rssi_history.append(rssi)

        arr = np.array(self.rssi_history)
        var = float(np.var(arr))
        self.variance = round(var, 3)

        # Classification based on RF scattering thresholds:
        # Static baseline: variance < 0.35 dBm
        # Subtle hand wave or breathing: 1.2 to 3.5 dBm
        # Active intrusion: > 4.0 dBm
        if self.variance > 4.0:
            self.state = "INTRUSION_ALERT"
            self.lockdown_active = True
            if "TOKEN_SERVER_ROOM_A" not in self.quarantined_tokens:
                self.quarantined_tokens.append("TOKEN_SERVER_ROOM_A")
        elif self.variance >= 1.2:
            self.state = "MOTION_DETECTED"
        else:
            self.state = "CLEAR"

        return {
            "current_rssi": rssi,
            "variance": self.variance,
            "radar_state": self.state,
            "lockdown_active": self.lockdown_active,
            "quarantined_tokens_count": len(self.quarantined_tokens)
        }

    def reset_lockdown(self):
        """Allows SecOps officer to clear lockdown state."""
        self.lockdown_active = False
        self.state = "CLEAR"
        self.quarantined_tokens.clear()

ghost_radar_engine = GhostRadarEngine()

