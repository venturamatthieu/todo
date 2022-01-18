terraform {
  required_providers {
    docker = {
      source  = "kreuzwerker/docker"
      version = "2.15.0"
    }
  }
}

resource "null_resource" "ssh_target" {
  connection {
    type        = "ssh"
    user        = var.ssh_user
    host        = var.ssh_host
    private_key = file(var.ssh_key)
  }
  provisioner "remote-exec" {
    inline = [
      "sudo mkdir -p /srv/wordpress/",
      "sudo chmod 777 -R /srv/wordpress/",
      "sleep 5s"
    ]
  }
}

provider "docker" {
  host = "tcp://${var.ssh_host}:2375"
}

data "docker_registry_image" "mysql" {
  name = "mysql:5.7"
}

data "docker_registry_image" "wordpress" {
  name = "wordpress:latest"
}

resource "docker_image" "mysql" {
  name          = data.docker_registry_image.mysql.name
  pull_triggers = [ data.docker_registry_image.mysql.sha256_digest ]
}

resource "docker_image" "wordpress" {
  name          = data.docker_registry_image.wordpress.name
  pull_triggers = [ data.docker_registry_image.wordpress.sha256_digest ]
}

resource "docker_network" "wordpress" {
  name = "wordpress_net"
}

resource "docker_volume" "myvolwordpress" {
  name = "myvol"
  driver = "local"
  driver_opts = {
    o = "bind"
    type = "none"
    device = "/srv/wordpress/"
  }
  depends_on = [ null_resource.ssh_target ]

}

resource "docker_container" "db" {
  name  = "db"
  image = docker_image.mysql.latest
  restart = "always"
  env = [
     "MYSQL_ROOT_PASSWORD=wordpress",
     "MYSQL_PASSWORD=wordpress",
     "MYSQL_USER=wordpress",
     "MYSQL_DATABASE=wordpress"
  ]
  networks_advanced {
    name = docker_network.wordpress.name
  }
  volumes {
    host_path = docker_volume.myvolwordpress.driver_opts.device
    container_path = "/var/lib/mysql/"
    volume_name = docker_volume.myvolwordpress.name
  }
}

resource "docker_container" "wordpress" {
  name  = "wordpress"
  image = docker_image.wordpress.latest
  restart = "always"
  working_dir  = "/var/www/html"
  networks_advanced {
    name = docker_network.wordpress.name
  }
  env = [
    "WORDPRESS_DB_USER=wordpress",
    "WORDPRESS_DB_HOST=db:3306",
    "WORDPRESS_DB_PASSWORD=wordpress"
  ]
  ports {
    internal = 80
    external = var.wordpress_port
  }
}

