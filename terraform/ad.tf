data "azuread_client_config" "current" {}

resource "azuread_application" "terraform" {
  display_name = "PS for terraform"
  owners       = [data.azuread_client_config.current.object_id]
}

resource "azuread_service_principal" "terraform" {
  application_id = azuread_application.terraform.application_id
  owners         = [data.azuread_client_config.current.object_id]


}

resource "azurerm_role_assignment" "terraform" {
  scope                = "/subscriptions/c1f1d48d-3fa3-41f4-a704-e6f7124e19cc"
  role_definition_name = "Contributor"
  principal_id         = azuread_service_principal.terraform.object_id
}

resource "azuread_service_principal_password" "sp" {
  service_principal_id = azuread_service_principal.terraform.id
}

resource "azurerm_key_vault_secret" "sp" {
  name         = "azure-sp-password"
  value        = azuread_service_principal_password.sp.value
  key_vault_id = azurerm_key_vault.keyvault.id
  tags         = {}
}

output "app_id" {
  value = azuread_service_principal.terraform.application_id
}

output "tenant_id" {
  value = azuread_service_principal.terraform.application_tenant_id
}
