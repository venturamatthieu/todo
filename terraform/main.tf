terraform {
  required_version = ">= 0.13"
}

module "install" {
  source        = "./modules/docker_install"
  ssh_host      = var.ssh_host
  ssh_key       = var.ssh_key
  ssh_user      = var.ssh_user
}

module "docker_run" {
  source        = "./modules/docker_run"
  ssh_host      = var.ssh_host
  ssh_key       = var.ssh_key
  ssh_user      = var.ssh_user
}

module "docker_wordpress" {
  source          = "./modules/docker_wordpress"
  ssh_host        = var.ssh_host
  ssh_key         = var.ssh_key
  ssh_user        = var.ssh_user
  wordpress_port  = var.wordpress_port
}

output "ip_container" {
  value = module.docker_run.ip_docker
}
output "docker_ip_db" {
  value = module.docker_wordpress.docker_ip_db
}
output "docker_ip_wordpress" {
  value = module.docker_wordpress.docker_ip_wordpress
}
output "docker_volume" {
  value = module.docker_wordpress.docker_volume
}

