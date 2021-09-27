data "azurerm_client_config" "current" {
}

resource "azurerm_key_vault" "keyvault" {
  name                       = "api-ass-af-kv"
  location                   = azurerm_resource_group.rg.location
  resource_group_name        = azurerm_resource_group.rg.name
  tenant_id                  = data.azurerm_client_config.current.tenant_id
  sku_name                   = "standard"
  soft_delete_retention_days = 7
  purge_protection_enabled   = false

  access_policy {
    tenant_id = data.azurerm_client_config.current.tenant_id
    object_id = data.azurerm_client_config.current.object_id

    key_permissions = [
      "create",
      "get",
    ]

    secret_permissions = [
      "set",
      "get",
      "delete",
      "purge",
      "list",
      "recover"
    ]
  }

  access_policy {
    tenant_id = azuread_service_principal.terraform.application_tenant_id
    object_id = azuread_service_principal.terraform.object_id

    secret_permissions = [
      "get"
    ]
  }
}

resource "azurerm_virtual_network" "primary_vnet" {
  name                = "vnet_primary"
  location            = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name
  address_space       = ["192.168.0.0/16"]
}
