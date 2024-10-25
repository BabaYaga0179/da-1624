#!/bin/bash

# cp /usr/local/directadmin/conf/directadmin.conf /usr/local/directadmin/conf/directadmin.conf-$(date +%d-%m-%y)
cp /usr/local/directadmin/conf/directadmin.conf /usr/local/directadmin/conf/directadmin.conf-$(date +"%d-%m-%y_%H-%M-%S")
echo > /usr/local/directadmin/conf/directadmin.conf
cat <<EOF > /usr/local/directadmin/conf/directadmin.conf
add_userdb_quota=1
admin_ssl_check_retries=0
apache_public_html=0
apache_ver=2.0
awstats=0
backup_gzip=2
brute_force_log_scanner=1
check_subdomain_owner=1
cloud_cache=0
default_private_html_link=1
demodocsroot=./data/skins/evolution
dkim=2
dns_ttl=1
docsroot=./data/skins/evolution
dovecot=1
enforce_difficult_passwords=1
ethernet_dev=lo:100
frontpage_on=0
hide_brute_force_notifications=1
http2=1
ipv6=0
jail=1
letsencrypt=1
litespeed=0
mail_sni=1
mysql_detect_correct_methods=1
nginx=0
nginx_proxy=0
ns1=ns1.wptop.net
ns2=ns2.wptop.net
one_click_pma_login=1
openlitespeed=1
php_fpm_max_children_default=10
pigz=2
pointers_own_virtualhost=1
pureftp=1
quota_partition=/
random_password_length=15
random_password_length_max=18
secure_access_group=access
servername=server.wptop.net
ssl=0
system_user_to_virtual_passwd=1
unified_ftp_password_file=1
use_xfs_quota=0
webmail_link=roundcube
zip=1
zstd=1
EOF

# cp /usr/local/directadmin/custombuild/options.conf /usr/local/directadmin/custombuild/options.conf-$(date +%d-%m-%y)
cp /usr/local/directadmin/custombuild/options.conf /usr/local/directadmin/custombuild/options.conf-$(date +"%d-%m-%y_%H-%M-%S")
echo > /usr/local/directadmin/custombuild/options.conf
cat <<EOF > /usr/local/directadmin/custombuild/options.conf
#WEB Server Settings
php1_release=8.1
php1_mode=lsphp
php2_release=no
php2_mode=lsphp
php3_release=no
php3_mode=lsphp
php4_release=no
php4_mode=lsphp
secure_php=yes
php_ini=no
php_timezone=Asia/Ho_Chi_Minh
php_ini_type=production
x_mail_header=yes

#MySQL Settings
mysql=8.0
mariadb=10.6
mysql_inst=mysql
mysql_backup=yes
mysql_backup_gzip=no
mysql_backup_dir=/usr/local/directadmin/custombuild/mysql_backups
mysql_force_compile=no

#WEB Server Settings
unit=no
webserver=openlitespeed
http_methods=ALL
litespeed_serialno=trial
modsecurity=no
modsecurity_ruleset=owasp
apache_ver=2.4
apache_mpm=auto
mod_ruid2=no
userdir_access=no
harden_symlinks_patch=yes
use_hostname_for_alias=no
redirect_host=server.wptop.net
redirect_host_https=no

#WEB Applications Settings
phpmyadmin=yes
phpmyadmin_public=no
phpmyadmin_ver=5
squirrelmail=no
roundcube=yes
webapps_inbox_prefix=no

#ClamAV-related Settings
clamav=no
clamav_exim=yes
modsecurity_uploadscan=no
proftpd_uploadscan=no
pureftpd_uploadscan=no
suhosin_php_uploadscan=no

#Mail Settings
exim=yes
eximconf=yes
eximconf_release=4.5
blockcracking=no
easy_spam_fighter=no
spamd=no
sa_update=daily
dovecot=yes
dovecot_conf=yes
mail_compress=no
pigeonhole=yes

#FTP Settings
ftpd=pureftpd

#Statistics Settings
awstats=no
webalizer=yes

#PHP Extension Settings
#CustomBuild Settings
custombuild=2.0
custombuild_plugin=yes
autover=no
bold=yes
clean=yes
cleanapache=yes
clean_old_tarballs=yes
clean_old_webapps=yes
downloadserver=mirror.ihost.md
unofficial_mirrors=no

#Cronjob Settings
cron=yes
cron_frequency=daily
email=contact@server.wptop.net
notifications=no
da_autoupdate=no
updates=no
webapps_updates=no

#CloudLinux Settings
cloudlinux=no
cloudlinux_beta=no
cagefs=no

#Advanced Settings
curl=no
ssl_configuration=intermediate

#PHP extensions can be found in php_extensions.conf
redis=yes
csf=no
EOF

# setup.txt
# cp /usr/local/directadmin/scripts/setup.txt /usr/local/directadmin/scripts/setup.txt-$(date +%d-%m-%y)
cp /usr/local/directadmin/scripts/setup.txt /usr/local/directadmin/scripts/setup.txt-$(date +"%d-%m-%y_%H-%M-%S")
echo > /usr/local/directadmin/scripts/setup.txt
cat <<EOF > /usr/local/directadmin/scripts/setup.txt
hostname=server.wptop.net
email=contact@server.wptop.net
mysql=0d7db9ac1c1d09494dcf
mysqluser=da_admin
adminname=admin
adminpass=
ns1=ns1.server.wptop.net
ns2=ns2.server.wptop.net
ip=103.110.84.30
netmask=255.255.252.0
uid=13502
lid=187425
services=services_es70_64.tar.gz
litespeedadmin=J6dxMaMTgIl7SR
EOF

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

# Download and update license key
systemctl daemon-reload
rm -rf /usr/local/directadmin/conf/license.key
/usr/bin/wget -O /tmp/license.key.gz http://license-da.azdigi.com/license.key.gz
/usr/bin/gunzip /tmp/license.key.gz
mv /tmp/license.key /usr/local/directadmin/conf/
chmod 600 /usr/local/directadmin/conf/license.key
chown diradmin:diradmin /usr/local/directadmin/conf/license.key
systemctl restart directadmin

# Restart services
systemctl restart crond
/usr/local/directadmin/scripts/set_permissions.sh all
chown -R diradmin:diradmin /usr/local/directadmin/data/users/admin/skin_customizations/*

# Clean up
rm -f /tmp/license.key.gz