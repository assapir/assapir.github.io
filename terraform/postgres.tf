resource "azurerm_postgresql_server" "comments" {
  name                = "postgresql-comments"
  location            = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name

  sku_name = "B_Gen5_2"

  storage_mb                   = 5120
  backup_retention_days        = 7
  geo_redundant_backup_enabled = false
  auto_grow_enabled            = false

  administrator_login              = "dbadmin"
  administrator_login_password     = azurerm_key_vault_secret.dbpassword.value
  version                          = "11"
  ssl_enforcement_enabled          = true
  ssl_minimal_tls_version_enforced = "TLS1_2"
  tags                             = {}
}

resource "azurerm_postgresql_database" "comments" {
  name                = "commentsdb"
  resource_group_name = azurerm_resource_group.rg.name
  server_name         = azurerm_postgresql_server.comments.name
  charset             = "UTF8"
  collation           = "en-US"
}

resource "azurerm_postgresql_firewall_rule" "home" {
  name                = "home"
  resource_group_name = azurerm_resource_group.rg.name
  server_name         = azurerm_postgresql_server.comments.name
  start_ip_address    = "46.31.99.71"
  end_ip_address      = "46.31.99.71"
}

resource "azurerm_postgresql_firewall_rule" "azure" {
  name                = "azure"
  resource_group_name = azurerm_resource_group.rg.name
  server_name         = azurerm_postgresql_server.comments.name
  start_ip_address    = "0.0.0.0"
  end_ip_address      = "0.0.0.0"
}

resource "random_password" "dbpassword" {
  length           = 48
  special          = false
}

resource "azurerm_key_vault_secret" "dbpassword" {
  name         = "comments-db-password"
  value        = random_password.dbpassword.result
  key_vault_id = azurerm_key_vault.keyvault.id
  tags         = {}
}

output "postgresql_comments_fqdn" {
  value = azurerm_postgresql_server.comments.fqdn
}
