"""
AetherNexus OS — Master Services Engine & Multi-Tenant Workspace Provisioner
Handles dynamic organization provisioning, service subscription binding,
and live execution of cyber-physical diagnostic services.
"""

import time
import uuid
import re
import secrets
from typing import Dict, Any, List, Optional
from pydantic import BaseModel, Field

class ProvisionWorkspaceRequest(BaseModel):
    org_name: str = Field(..., description="Full legal name of the enterprise organization")
    org_slug: Optional[str] = Field(None, description="URL-safe workspace identifier")
    admin_email: str = Field(..., description="Administrator or lead engineer email")
    industry_category: str = Field("IIOT", description="Target industry vertical")
    selected_services: List[str] = Field(default_factory=list, description="Subscribed service IDs")
    tier: str = Field("ENTERPRISE_14999", description="Subscription tier")

class ServiceProbeRequest(BaseModel):
    service_id: str
    target_url: Optional[str] = "https://api.aethernexus.ai"
    node_id: Optional[str] = "ESP32_MASTER_01"

class ServicesEngine:
    def __init__(self):
        # In-memory tenant store with pre-seeded organizations
        self.workspaces: Dict[str, Dict[str, Any]] = {
            "aethernexus-enterprise": {
                "id": "org_aethernexus_01",
                "name": "AetherNexus Systems Enterprise",
                "slug": "aethernexus-enterprise",
                "admin_email": "architect@aethernexus.io",
                "industry_category": "IIOT",
                "tier": "ENTERPRISE_14999",
                "api_key": "aeth_live_aethernexus_master_key_01",
                "silicon_dna_hash": "0x9E7F4A12B8C3D5E6F10A2B4C8D9E0F1A",
                "status": "ACTIVE",
                "created_at": int(time.time()),
                "subscribed_services": [
                    "telemetry-streaming",
                    "autonomous-failover",
                    "time-series-replay",
                    "self-healing-gateway",
                    "diagnostic-scanner",
                    "compliance-certificates",
                    "edge-firmware",
                    "sensor-integration",
                    "hardware-identity",
                    "autonomous-sre"
                ],
                "active_nodes": ["ESP32_MASTER_01", "CLOUD_EDGE_02"]
            },
            "siemens-iiot": {
                "id": "org_siemens_02",
                "name": "Siemens Energy IIoT Lab",
                "slug": "siemens-iiot",
                "admin_email": "energy-lab@siemens.com",
                "industry_category": "IIOT",
                "tier": "ENTERPRISE_14999",
                "api_key": "aeth_live_siemens_iiot_9824f1",
                "silicon_dna_hash": "0x1A2B3C4D5E6F708192A3B4C5D6E7F809",
                "status": "ACTIVE",
                "created_at": int(time.time()) - 86400,
                "subscribed_services": ["telemetry-streaming", "autonomous-failover", "sensor-integration"],
                "active_nodes": ["TURBINE_NODE_07"]
            }
        }

    def sanitize_slug(self, name: str) -> str:
        slug = re.sub(r'[^a-zA-Z0-9\s-]', '', name).strip().lower()
        slug = re.sub(r'[\s-]+', '-', slug)
        return slug or f"tenant-{secrets.token_hex(4)}"

    def provision_workspace(self, req: ProvisionWorkspaceRequest) -> Dict[str, Any]:
        """Provisions an isolated multi-tenant enterprise workspace."""
        slug = req.org_slug if req.org_slug else self.sanitize_slug(req.org_name)
        
        # Avoid collisions
        base_slug = slug
        counter = 1
        while slug in self.workspaces:
            slug = f"{base_slug}-{counter}"
            counter += 1

        org_id = f"org_{uuid.uuid4().hex[:12]}"
        api_key = f"aeth_live_{secrets.token_urlsafe(24)}"
        silicon_hash = f"0x{secrets.token_hex(16).upper()}"

        workspace_data = {
            "id": org_id,
            "name": req.org_name,
            "slug": slug,
            "admin_email": req.admin_email,
            "industry_category": req.industry_category,
            "tier": req.tier,
            "api_key": api_key,
            "silicon_dna_hash": silicon_hash,
            "status": "ACTIVE",
            "created_at": int(time.time()),
            "subscribed_services": req.selected_services or [
                "telemetry-streaming",
                "diagnostic-scanner",
                "compliance-certificates"
            ],
            "active_nodes": [f"NODE_{secrets.token_hex(3).upper()}"]
        }

        self.workspaces[slug] = workspace_data

        return {
            "success": True,
            "message": f"Enterprise workspace for '{req.org_name}' successfully provisioned.",
            "workspace": workspace_data,
            "workspace_url": f"/{slug}"
        }

    def get_workspace(self, slug: str) -> Optional[Dict[str, Any]]:
        return self.workspaces.get(slug)

    def list_workspaces(self) -> List[Dict[str, Any]]:
        return list(self.workspaces.values())

# Global Singleton Engine
services_engine = ServicesEngine()
