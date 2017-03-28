#!/bin/bash

echo "Provisioning virtual machine..."

#nodejs and npm
sudo apt-get install curl python-software-properties
curl -sL https://deb.nodesource.com/setup_7.x | sudo bash -
sudo apt-get install nodejs

#others
