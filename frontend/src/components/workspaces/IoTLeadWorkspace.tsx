'use client';

import React, { useState, useEffect } from 'react';
import { Cpu, RefreshCw, Zap, Layers, Activity, CheckCircle2 } from 'lucide-react';

interface I2CDevice {
  hex_address: string;
  chip: string;
  device_type: string;
  registers: string[];
  live_reading: string;
  status: string;
}

export const IoTLeadWorkspace: React.FC = () => {
  const [devices, setDevices] = useState<I2CDevice[]>([
    {
      hex_address: '0x40',
      chip: 'INA219 / INA226',
      device_type: 'High-Side DC Current & Power Sensor',
      registers: ['0x00_CONFIG', '0x01_SHUNT_VOLTAGE', '0x02_BUS_VOLTAGE', '0x04_CURRENT'],
      live_reading: '380.5 mA | 3.29 V Bus',
      status: 'ONLINE_BOUND'
    },
    {
      hex_address: '0x68',
      chip: 'MPU6050 / MPU9250',
      device_type: '6-Axis Gyroscope & Accelerometer',
      registers: ['0x6B_PWR_MGMT_1', '0x3B_ACCEL_XOUT_H', '0x43_GYRO_XOUT_H'],
      live_reading: 'Vibration Harmonics: 120.4 Hz | 0.04g RMS',
      status: 'ONLINE_BOUND'
    },
    {
      hex_address: '0x76',
      chip: 'BME280 / BMP280',
      device_type: 'Digital Barometric Pressure, Temp & Humidity',
      registers: ['0xD0_CHIP_ID', '0xF4_CTRL_MEAS', '0xF7_PRESS_MSB'],
      live_reading: 'Humidity: 48.2% | Pressure: 1013.25 hPa',
      status: 'ONLINE_BOUND'
    },
    {
      hex_address: '0x23',
      chip: 'BH1750',
      device_type: 'Digital Ambient Light Lux Sensor',
      registers: ['0x10_CONTINUOUS_H_RES_MODE'],
      live_reading: 'Lux: 342.5 lx (Cleanroom Lighting)',
      status: 'ONLINE_BOUND'
    },
    {
      hex_address: '0x3C',
      chip: 'SSD1306',
      device_type: '128x64 Monochrome OLED Display',
      registers: ['0x00_COMMAND', '0x40_DATA'],
      live_reading: 'Rendering Dynamic Edge Diagnostic QR Code',
      status: 'ONLINE_BOUND'
    }
  ]);
  const [isScanning, setIsScanning] = useState(false);

  const handleScanBus = async () => {
    setIsScanning(true);
    try {
      const res = await fetch('http://localhost:8000/api/hardware/i2c-scan');
      if (res.ok) {
        const data = await res.json();
        if (data.active_devices_found) setDevices(data.active_devices_found);
      }
    } catch (e) {
    } finally {
      setIsScanning(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Top Hardware Diagnostics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-3xl bg-white border border-slate-200/90 shadow-xs">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">ESP32 Free SRAM Heap</div>
          <div className="text-2xl font-black text-emerald-600 mt-1">214 KB</div>
          <div className="text-[11px] text-slate-500 mt-0.5">Heap fragmentation: 1.2%</div>
        </div>

        <div className="p-4 rounded-3xl bg-white border border-slate-200/90 shadow-xs">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Sub-15ms Anomaly Trigger</div>
          <div className="text-2xl font-black text-slate-900 mt-1">12.8 ms</div>
          <div className="text-[11px] text-emerald-600 font-semibold mt-0.5">dV/dt open-circuit hook</div>
        </div>

        <div className="p-4 rounded-3xl bg-white border border-slate-200/90 shadow-xs">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">3.3V Power Rail Ripple</div>
          <div className="text-2xl font-black text-blue-600 mt-1">6.8 mV RMS</div>
          <div className="text-[11px] text-slate-500 mt-0.5">LDO regulator nominal</div>
        </div>

        <div className="p-4 rounded-3xl bg-white border border-slate-200/90 shadow-xs">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">I2C Fast Mode Speed</div>
          <div className="text-2xl font-black text-purple-600 mt-1">400 kHz</div>
          <div className="text-[11px] text-slate-500 mt-0.5">GPIO 21 (SDA) / 22 (SCL)</div>
        </div>
      </div>

      {/* 0x01-0x7F I2C Explorer Table */}
      <div className="p-5 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-xl bg-blue-50 text-blue-600 border border-blue-100">
              <Cpu className="w-4 h-4" />
            </span>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Zero-Code 0x01-0x7F I2C Hardware Bus Auto-Discovery</h3>
              <p className="text-xs text-slate-500">Live peripheral chip auto-detection without firmware recompilation</p>
            </div>
          </div>

          <button
            onClick={handleScanBus}
            disabled={isScanning}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-900 text-white hover:bg-slate-800 transition-all cursor-pointer shadow-xs disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isScanning ? 'animate-spin' : ''}`} />
            Scan Hardware Bus
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 text-slate-400 uppercase tracking-wider font-semibold">
                <th className="pb-2.5">Hex Address</th>
                <th className="pb-2.5">Auto-Identified Chip</th>
                <th className="pb-2.5">Sensor Functional Class</th>
                <th className="pb-2.5">Live Register Telemetry</th>
                <th className="pb-2.5 text-right">Binding State</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {devices.map((d, i) => (
                <tr key={i} className="hover:bg-slate-50/60 transition-colors">
                  <td className="py-2.5 font-mono font-bold text-blue-600">{d.hex_address}</td>
                  <td className="py-2.5 font-bold text-slate-900">{d.chip}</td>
                  <td className="py-2.5 text-slate-500">{d.device_type}</td>
                  <td className="py-2.5 font-mono text-[11px] text-slate-600">{d.live_reading}</td>
                  <td className="py-2.5 text-right">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-100">
                      <CheckCircle2 className="w-3 h-3" />
                      {d.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

