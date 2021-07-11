resource "azurerm_storage_account" "tfstste" {
  name                     = "tfstateassafsapir"
  resource_group_name      = azurerm_resource_group.rg.name
  location                 = azurerm_resource_group.rg.location
  account_tier             = "Standard"
  account_replication_type = "LRS"
  min_tls_version          = "TLS1_2"
  tags                     = {}
}

resource "azurerm_storage_container" "tfstste" {
  name                 = "tfstate"
  storage_account_name = azurerm_storage_account.tfstste.name
}
