
-- =============================================================================
-- AETHERNEXUS OS — PRODUCTION MULTI-TENANT DDL & ROW-LEVEL SECURITY
-- =============================================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. ORGANIZATIONS (Multi-Tenant Workspaces across all 11 Industry Categories)
CREATE TABLE IF NOT EXISTS organizations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(120) NOT NULL,
    slug VARCHAR(80) UNIQUE NOT NULL,
    industry_category VARCHAR(60) NOT NULL,
    subscription_tier VARCHAR(30) DEFAULT 'GROWTH_4999',
    ai_credits_remaining INT DEFAULT 50000,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. USERS & ROLE-BASED ACCESS CONTROL (RBAC)
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    org_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(120) UNIQUE NOT NULL,
    role VARCHAR(40) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. EDGE HARDWARE & CLOUD NODES
CREATE TABLE IF NOT EXISTS nodes (
    id VARCHAR(64) PRIMARY KEY,
    org_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    node_type VARCHAR(40) NOT NULL,
    silicon_dna_hash VARCHAR(128) NOT NULL,
    status VARCHAR(30) DEFAULT 'HEALTHY',
    active_i2c_devices JSONB DEFAULT '["0x68_MPU6050", "0x40_INA219", "0x76_BME280"]',
    last_seen TIMESTAMPTZ DEFAULT NOW()
);

-- 4. CYBER-PHYSICAL TIME-MACHINE TELEMETRY FRAMES
CREATE TABLE IF NOT EXISTS telemetry_frames (
    time TIMESTAMPTZ NOT NULL,
    org_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    node_id VARCHAR(64) NOT NULL REFERENCES nodes(id),
    temp_celsius FLOAT,
    is_phantom_synthesized BOOLEAN DEFAULT FALSE,
    phantom_confidence FLOAT DEFAULT 1.0,
    power_watts FLOAT,
    vibration_hz FLOAT,
    wifi_radar_variance_dbm FLOAT,
    radar_motion_state VARCHAR(30),
    api_latency_ms FLOAT,
    silicon_dna_verified BOOLEAN DEFAULT TRUE,
    raw_payload JSONB
);

-- 5. DIAGNOSTIC MRI AUDITS & CRYPTOGRAPHIC QUALITY CERTIFICATES
CREATE TABLE IF NOT EXISTS diagnostic_audits (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    org_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    triggered_by_role VARCHAR(40),
    scan_type VARCHAR(40),
    overall_health_score FLOAT,
    grade VARCHAR(4),
    faults_detected JSONB,
    autonomous_actions_taken JSONB,
    money_saved_inr FLOAT DEFAULT 0,
    pdf_certificate_sha256 VARCHAR(64),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. STRICT ROW-LEVEL SECURITY POLICIES
ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE nodes ENABLE ROW LEVEL SECURITY;
ALTER TABLE telemetry_frames ENABLE ROW LEVEL SECURITY;
ALTER TABLE diagnostic_audits ENABLE ROW LEVEL SECURITY;

-- 7. SEED INITIAL ENTERPRISE ORGANIZATION
INSERT INTO organizations (name, slug, industry_category, subscription_tier)
VALUES ('AetherNexus Systems Enterprise', 'aethernexus-enterprise', 'IIOT', 'ENTERPRISE_14999')
ON CONFLICT (slug) DO NOTHING;

INSERT INTO nodes (id, org_id, node_type, silicon_dna_hash, status)
SELECT 
    'ESP32_MASTER_01', 
    id, 
    'PHYSICAL_ESP32', 
    'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855', 
    'HEALTHY'
FROM organizations WHERE slug = 'aethernexus-enterprise'
ON CONFLICT (id) DO NOTHING;
