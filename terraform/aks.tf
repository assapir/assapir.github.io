resource "azurerm_kubernetes_cluster" "aks" {
  name                = "ass-af-aks"
  location            = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name
  dns_prefix          = "ass-af-aks"

  linux_profile {
    admin_username = "ubuntu"

    ssh_key {
      key_data = file(pathexpand(var.ssh_public_key))
    }
  }

  identity {
    type = "SystemAssigned"
  }

  default_node_pool {
    name            = "agentpool"
    node_count      = var.agent_count
    vm_size         = "Standard_D2_v4"
    os_disk_size_gb = 30
    vnet_subnet_id  = azurerm_subnet.aks_subnet.id
  }

  network_profile {
    load_balancer_sku = "Standard"
    network_plugin    = "kubenet"
  }

  tags = {
    Environment = "Production"
  }
}

resource "azurerm_subnet" "aks_subnet" {
  name                 = "snet-aks"
  virtual_network_name = azurerm_virtual_network.primary_vnet.name
  resource_group_name  = azurerm_resource_group.rg.name
  service_endpoints = [
    "Microsoft.ContainerRegistry",
    "Microsoft.KeyVault",
    "Microsoft.AzureActiveDirectory"
  ]
  address_prefixes = ["192.168.1.0/24"]

  depends_on = [
    azurerm_virtual_network.primary_vnet
  ]
}

output "kubernetes_cluster_name" {
  value = azurerm_kubernetes_cluster.aks.name
}

output "kubernetes_cluster_fqdn" {
  value = azurerm_kubernetes_cluster.aks.fqdn
}
