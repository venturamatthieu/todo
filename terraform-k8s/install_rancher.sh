
#!/bin/bash

## install rancher

sudo apt install wget unzip
sudo echo "autocmd filetype yaml setlocal ai ts=2 sw=2 et" > /home/vagrant/.vimrc
sudo echo "alias python=/usr/bin/python3" >> /home/vagrant/.bashrc
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker vagrant
sudo service docker start
sudo sed -i 's/ChallengeResponseAuthentication no/ChallengeResponseAuthentication yes/g' /etc/ssh/sshd_config
sudo systemctl restart sshd
sudo sysctl net.bridge.bridge-nf-call-iptables=1
sudo docker run --privileged -d --restart=unless-stopped -p 80:80 -p 443:443 rancher/rancher
