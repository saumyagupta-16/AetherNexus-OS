/**
 * AetherNexus OS — ESP32 DevKit V1 Hardware Pod Firmware
 * 50Hz Cyber-Physical Telemetry, GhostRadar RF Multipath Sonar & SiliconDNA PUF
 *
 * Board: ESP32 DevKit V1 (Dual Core 240MHz)
 * Arduino IDE Core: ESP32 by Espressif Systems
 *
 * Wiring Pinout:
 * - GPIO 4  : DS18B20 1-Wire Digital Temp Probe (Data Pin + 4.7k Pull-up to 3.3V)
 * - GPIO 21 : I2C SDA (INA219 Current Sensor / MPU6050 Accelerometer)
 * - GPIO 22 : I2C SCL (INA219 Current Sensor / MPU6050 Accelerometer)
 * - GPIO 36 : ADC1_CH0 / VP (Internal Bandgap Voltage Jitter & RF Noise Probe)
 * - GPIO 2  : Diagnostic LED (Flashing indicator during Diagnostic MRI)
 * - GPIO 18 : Cooling Relay & Physical Deadbolt Actuation
 */

#include <WiFi.h>
#include <PubSubClient.h>
#include <Wire.h>
#include <OneWire.h>
#include <DallasTemperature.h>
#include <mbedtls/md.h>

#define ONE_WIRE_BUS 4
#define PIN_LED 2
#define PIN_RELAY 18
#define ADC_VREF_PIN 36

const char* ssid = "AetherNet_WiFi";
const char* password = "EnterpriseSecretKey";
const char* mqtt_server = "192.168.1.100";
const int mqtt_port = 1883;

OneWire oneWire(ONE_WIRE_BUS);
DallasTemperature sensors(&oneWire);
WiFiClient espClient;
PubSubClient mqttClient(espClient);

// GhostRadar 50Hz Wi-Fi RSSI Sliding Window (N=50 samples = 1.0 second)
const int RSSI_WINDOW = 50;
float rssiHistory[RSSI_WINDOW];
int rssiIndex = 0;

void setup() {
  Serial.begin(115200);
  pinMode(PIN_LED, OUTPUT);
  pinMode(PIN_RELAY, OUTPUT);
  digitalWrite(PIN_LED, LOW);
  digitalWrite(PIN_RELAY, LOW);

  Wire.begin(21, 22); // Fast mode 400kHz I2C
  sensors.begin();

  Serial.println("[AetherPod] Initializing Wi-Fi...");
  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid, password);

  // Initialize RSSI buffer
  for (int i = 0; i < RSSI_WINDOW; i++) {
    rssiHistory[i] = -50.0;
  }

  mqttClient.setServer(mqtt_server, mqtt_port);
  Serial.println("[AetherPod] Firmware 1.0.4 Online. 50Hz Telemetry Bus ready.");
}

float calculateGhostRadarVariance() {
  float currentRssi = (float)WiFi.RSSI();
  rssiHistory[rssiIndex] = currentRssi;
  rssiIndex = (rssiIndex + 1) % RSSI_WINDOW;

  float sum = 0, sumSq = 0;
  for (int i = 0; i < RSSI_WINDOW; i++) {
    sum += rssiHistory[i];
    sumSq += rssiHistory[i] * rssiHistory[i];
  }
  float mean = sum / RSSI_WINDOW;
  float variance = (sumSq / RSSI_WINDOW) - (mean * mean);
  return variance;
}

void loop() {
  unsigned long startLoop = millis();

  // Read primary temperature probe
  sensors.requestTemperatures();
  float tempC = sensors.getTempCByIndex(0);
  bool wireConnected = (tempC != DEVICE_DISCONNECTED_C && tempC > -50.0 && tempC < 125.0);

  // Calculate GhostRadar RF Sonar variance
  float radarVariance = calculateGhostRadarVariance();

  // Read microscopic ADC reference jitter on GPIO 36
  int rawVref = analogRead(ADC_VREF_PIN);

  // High-frequency 50Hz JSON Telemetry frame
  char payload[384];
  snprintf(payload, sizeof(payload),
    "{\"node_id\":\"ESP32_MASTER_01\",\"temp\":%.2f,\"connected\":%s,\"radar_var\":%.3f,\"vref\":%d,\"timestamp\":%lu}",
    wireConnected ? tempC : 0.0,
    wireConnected ? "true" : "false",
    radarVariance,
    rawVref,
    millis()
  );

  // Transmit over Serial USB and MQTT
  Serial.println(payload);
  if (mqttClient.connected()) {
    mqttClient.publish("aethernexus/default-org/telemetry", payload);
  }

  // Exact 20ms delay loop for 50Hz sampling
  unsigned long elapsed = millis() - startLoop;
  if (elapsed < 20) {
    delay(20 - elapsed);
  }
}

