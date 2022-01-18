output "docker_ip_db" {
  value = docker_container.db.ip_address
}
output "docker_ip_wordpress" {
  value = docker_container.wordpress.ip_address
}
output "docker_volume" {
  value = docker_volume.myvolwordpress.driver_opts.device
}
