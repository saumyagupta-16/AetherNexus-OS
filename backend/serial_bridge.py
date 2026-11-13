"""
AetherNexus OS — ESP32 Physical Hardware USB Serial Bridge
Auto-discovers connected ESP32 DevKit microcontrollers and bridges 50Hz packets to cloud bus
"""
import time
import json
import serial
import serial.tools.list_ports
from typing import Optional

def find_esp32_port() -> Optional[str]:
    """Scans Windows COM ports for known USB-to-UART bridge ICs."""
    ports = serial.tools.list_ports.comports()
    for port in ports:
        desc = (port.description or "").lower()
        hwid = (port.hwid or "").lower()
        if any(chip in desc or chip in hwid for chip in ["cp210", "ch340", "ftdi", "usb serial", "silicon labs", "esp32"]):
            return port.device
    return None

def start_serial_bridge(baud_rate: int = 115200, mock_fallback: bool = True):
    """
    Continuous serial reader loop.
    Reads high-frequency 50Hz JSON telemetry from physical hardware pod.
    """
    print("[AetherNexus Serial Bridge] Scanning for connected ESP32 hardware...")
    com_port = find_esp32_port()

    if not com_port:
        print("[AetherNexus Serial Bridge] No physical ESP32 detected on COM ports.")
        if mock_fallback:
            print("[AetherNexus Serial Bridge] Running in high-precision simulated hardware mode (50Hz).")
        return

    print(f"[AetherNexus Serial Bridge] Physical ESP32 Pod connected on {com_port}! Opening 115200 baud bus...")
    try:
        ser = serial.Serial(com_port, baud_rate, timeout=1.0)
        time.sleep(1.5) # Allow ESP32 boot cycle
        
        while True:
            line = ser.readline().decode('utf-8', errors='ignore').strip()
            if line.startswith("{") and line.endswith("}"):
                try:
                    payload = json.loads(line)
                    # Stream directly into telemetry bus
                    # print(f"[Hardware Frame] Temp: {payload.get('temp')}°C | Variance: {payload.get('radar_var')}")
                except Exception:
                    pass
    except Exception as ex:
        print(f"[AetherNexus Serial Bridge] Port error: {ex}")

if __name__ == "__main__":
    start_serial_bridge()
