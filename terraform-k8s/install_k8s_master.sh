#!/bin/bash

## install master for k8s

TOKEN="abcdef.0123456789abcdef"
HOSTNAME=$(hostname)
IP=$(hostname -I | awk '{print $2}')
numberSrv=1
echo "START - install master - "$IP

#(1..numberSrv).each do |i|
sudo -- sh -c -e "echo 192.168.100.11 knode >> /etc/hosts";
#end


#echo "[0]: reset cluster if exist"
#sudo kubeadm reset -f

echo "[1]: kubadm init"
#sudo systemctl enable kubelet
#sudo kubeadm init --apiserver-advertise-address=$IP --node-name $HOSTNAME --token="$TOKEN" --pod-network-cidr=10.244.0.0/16

echo "[2]: create config file"
#sudo mkdir -p $HOME/.kube
#sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
#sudo chown $(id -u):$(id -g) $HOME/.kube/config

echo "[3]: create flannel pods network"
#sudo sysctl net.bridge.bridge-nf-call-iptables=1
#sudo kubectl apply -f /vagrant/kube-flannel.yml

echo "[4]: restart and enable kubelet"
#sudo systemctl enable kubelet
#sudo service kubelet restart

echo "END - install master - " $IP
