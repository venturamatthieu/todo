#!/bin/bash

## install master for k8s

TOKEN="abcdef.0123456789abcdef"
HOSTNAME=$(hostname)
IP=$(hostname -I | awk '{print $2}')
echo "START - install master - "$IP

echo "[0]: reset cluster if exist"
#sudo kubeadm reset -f

echo "[1]: kubadm init"
sudo systemctl enable kubelet
sudo kubeadm init --apiserver-advertise-address=$IP --node-name $HOSTNAME --token="$TOKEN" --pod-network-cidr=10.244.0.0/16
#sudo kubeadm init --apiserver-advertise-address=192.168.56.101  --node-name $HOSTNAME --pod-network-cidr=10.244.0.0/16

echo "[2]: create config file"
sudo mkdir -p $HOME/.kube
sudo cp /etc/kubernetes/admin.conf $HOME/.kube/config

echo "[3]: create flannel pods network"
sudo sysctl net.bridge.bridge-nf-call-iptables=1
sudo kubectl apply -f kube-flannel.yml

echo "[4]: restart and enable kubelet"
#sudo systemctl enable kubelet
sudo service kubelet restart

echo "END - install master - " $IP
