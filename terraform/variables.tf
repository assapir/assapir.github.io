variable "resource_group_name" {
  type    = string
  default = "ass.af"
}

variable "resource_group_location" {
  type    = string
  default = "West Europe"
}

variable "ssh_public_key" {
  default = "~/.ssh/id_rsa.pub"
}

variable "agent_count" {
  default = 1
}
