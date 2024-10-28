#!/bin/bash

# Set network
# Remove ifcfg-lo:100 configuration
rm -rf /etc/sysconfig/network-scripts/ifcfg-lo:100
rm -rf /etc/sysconfig/network-scripts/ifcfg-eth0:100

# Create ifcfg-lo:100 configuration
cat <<EOF > /etc/sysconfig/network-scripts/ifcfg-lo:100
DEVICE=lo:100
ONBOOT=no
ARPCHECK="no"
IPADDR=176.99.3.34
NETMASK=255.255.255.255
EOF

# Update ethernet_dev in directadmin.conf
/usr/bin/perl -pi -e 's/^ethernet_dev=.*/ethernet_dev=lo:100/' /usr/local/directadmin/conf/directadmin.conf

# Create directadmin.service configuration
cat <<EOF > /etc/systemd/system/directadmin.service
[Unit]
Description=DirectAdmin Web Control Panel
After=syslog.target network.target
Documentation=http://www.directadmin.com

[Service]
Type=forking
PIDFile=/run/directadmin.pid
ExecStartPre=/usr/sbin/ifup lo:100
ExecStartPost=/usr/bin/sleep 1
ExecStartPost=/usr/sbin/ifdown lo:100
ExecStart=/usr/local/directadmin/directadmin d
ExecReload=/bin/kill -HUP $MAINPID
WorkingDirectory=/usr/local/directadmin
LimitNOFILE=65535

[Install]
WantedBy=multi-user.target
EOF

# Update IP address in ifcfg-lo:100
sed -i -e "s/IPADDR=103.221.222.40/IPADDR=176.99.3.34/g" /etc/sysconfig/network-scripts/ifcfg-lo:100
systemctl daemon-reload

# Restart services
systemctl restart crond
chmod 755 /usr/local/directadmin/scripts/set_permissions.sh
/usr/local/directadmin/scripts/set_permissions.sh all
chown -R diradmin:diradmin /usr/local/directadmin/data/users/admin/skin_customizations/*
