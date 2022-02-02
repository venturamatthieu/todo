#!/bin/bash

## install common for k8s


HOSTNAME=$(hostname)
IP=$(hostname -I | awk '{print $2}')
echo "START - install common - "$IP

echo "[1]: add host name for ip"
host_exist=$(cat /etc/hosts | grep -i "$IP" | wc -l)
if [ "$host_exist" == "0" ];then
echo "$IP $HOSTNAME "
sudo -- sh -c -e "echo '$IP $HOSTNAME' >> /etc/hosts";
fi

echo "[2]: disable swap"
# swapoff -a to disable swapping
sudo swapoff -a
# sed to comment the swap partition in /etc/fstab
sudo sed -i.bak -r 's/(.+ swap .+)/#\1/' /etc/fstab

echo "[3]: install utils"
sudo apt-get update -qq > /dev/null
sudo apt-get install -y -qq apt-transport-https curl > /dev/null

echo "[4]: install docker if not exist"
if [ ! -f "/usr/bin/docker" ];then
sudo apt install wget unzip
sudo echo "autocmd filetype yaml setlocal ai ts=2 sw=2 et" > /home/vagrant/.vimrc
sudo echo "alias python=/usr/bin/python3" >> /home/vagrant/.bashrc
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker vagrant
sudo cat <<EOF | sudo tee /etc/docker/daemon.json
{
  "exec-opts": ["native.cgroupdriver=systemd"],
  "log-driver": "json-file",
  "log-opts": {
    "max-size": "100m"
  },
  "storage-driver": "overlay2"
}
EOF
sudo systemctl enable docker
sudo systemctl daemon-reload
sudo systemctl restart docker
fi

echo "[5]: add kubernetes repository to source.list"
if [ ! -f "/etc/apt/sources.list.d/kubernetes.list" ];then
curl -s https://packages.cloud.google.com/apt/doc/apt-key.gpg | sudo apt-key add -
cat <<EOF | sudo tee /etc/apt/sources.list.d/kubernetes.list
deb https://apt.kubernetes.io/ kubernetes-xenial main
EOF
fi
sudo apt-get update -qq >/dev/null

echo "[6]: install kubelet / kubeadm / kubectl / kubernetes-cni"
sudo apt-get install -y kubelet kubeadm kubectl kubernetes-cni > /dev/null
sudo sed -i 's/ChallengeResponseAuthentication no/ChallengeResponseAuthentication yes/g' /etc/ssh/sshd_config
sudo systemctl restart sshd

echo "END - install common - " $IP
