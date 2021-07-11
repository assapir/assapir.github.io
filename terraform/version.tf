terraform {
  required_version = ">= 1.0.2"
  backend "azurerm" {
    resource_group_name  = "ass.af"
    storage_account_name = "tfstateassafsapir"
    container_name       = "tfstate"
    key                  = "terraform.tfstate"
  }

  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~>2.0"
    }
  }
}

provider "azurerm" {
  features {}
}
