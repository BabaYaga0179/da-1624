const directadminConfig = `cp /usr/local/directadmin.bak-old/conf/cacert.pem /usr/local/directadmin/conf/cacert.pem
cp /usr/local/directadmin.bak-old/conf/cakey.pem /usr/local/directadmin/conf/cakey.pem
cp /usr/local/directadmin.bak-old/conf/carootcert.pem /usr/local/directadmin/conf/carootcert.pem

cp /usr/local/directadmin/conf/directadmin.conf /usr/local/directadmin/conf/directadmin_1.conf
truncate -s 0 /usr/local/directadmin/conf/directadmin.conf
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
ip={ip}
ipv6=0
jail=1
letsencrypt=1
litespeed=0
mail_sni=1
mysql_detect_correct_methods=1
nginx=0
nginx_proxy=0
ns1=ns1.{redirect_host}
ns2=ns2.{redirect_host}
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
servername={redirect_host}
ssl=0
system_user_to_virtual_passwd=1
unified_ftp_password_file=1
use_xfs_quota=0
webmail_link=roundcube
zip=1
zstd=1
EOF
`;

const optionsConfig = `cp /usr/local/directadmin/custombuild/options.conf /usr/local/directadmin/custombuild/options_1.conf
truncate -s 0 /usr/local/directadmin/custombuild/options.conf
cat <<EOF > /usr/local/directadmin/custombuild/options.conf
#WEB Server Settings
php1_release={php1_release}
php1_mode=lsphp
php2_release={php2_release}
php2_mode=lsphp
php3_release={php3_release}
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
mysql_inst={mysql_inst}
mysql_backup=yes
mysql_backup_gzip=no
mysql_backup_dir=/usr/local/directadmin/custombuild/mysql_backups
mysql_force_compile=no

#WEB Server Settings
unit=no
webserver={webserver}
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
redirect_host={redirect_host}
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
email=contact@{redirect_host}
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
`;

const setupConfig = `cp /usr/local/directadmin/scripts/setup.txt /usr/local/directadmin/scripts/setup_1.txt
truncate -s 0 /usr/local/directadmin/scripts/setup.txt
cat <<EOF > /usr/local/directadmin/scripts/setup.txt
hostname={redirect_host}
email=contact@{redirect_host}
mysql=0d7db9ac1c1d09494dcf
mysqluser=da_admin
adminname=admin
adminpass=
ns1=ns1.{redirect_host}
ns2=ns2.{redirect_host}
ip={ip}
netmask=255.255.252.0
uid=13502
lid=187425
services=services_es70_64.tar.gz
litespeedadmin=J6dxMaMTgIl7SR
EOF

cp /usr/local/directadmin/data/admin/ip.list /usr/local/directadmin/data/admin/ip.list_1
truncate -s 0 /usr/local/directadmin/data/admin/ip.list
cat <<EOF > /usr/local/directadmin/data/admin/ip.list
{ip}
EOF

cp /usr/local/directadmin/data/users/admin/ip.list /usr/local/directadmin/data/users/admin/ip.list_1
truncate -s 0 /usr/local/directadmin/data/users/admin/ip.list
cat <<EOF > /usr/local/directadmin/data/users/admin/ip.list
{ip}
EOF

cp /usr/local/directadmin/data/users/admin/user_ip.list /usr/local/directadmin/data/users/admin/user_ip.list_1
truncate -s 0 /usr/local/directadmin/data/users/admin/user_ip.list
cat <<EOF > /usr/local/directadmin/data/users/admin/user_ip.list
{ip}
EOF

cp /usr/local/directadmin/data/users/admin/user.conf /usr/local/directadmin/data/users/admin/user.conf_1
truncate -s 0 /usr/local/directadmin/data/users/admin/user.conf 
cat <<EOF > /usr/local/directadmin/data/users/admin/user.conf 
account=ON
additional_bandwidth=0
aftp=ON
api_with_password=yes
bandwidth=unlimited
catchall=ON
cgi=ON
creator=root
cron=ON
date_created=Sat Sep  4 13:45:58 2021
dnscontrol=ON
docsroot=./data/skins/evolution
domainptr=unlimited
email=admin@{redirect_host}
ftp=unlimited
inode=unlimited
ip=51.79.255.86
language=en
login_keys=ON
mysql=unlimited
name=admin
nemailf=unlimited
nemailml=unlimited
nemailr=unlimited
nemails=unlimited
notify_on_all_question_failures=yes
notify_on_all_twostep_auth_failures=yes
ns1=ns1.{redirect_host}
ns2=ns2.{redirect_host}
nsubdomains=unlimited
package=admin
php=ON
quota=unlimited
security_questions=no
sentnotice_quota_full=no
sentwarning_bandwidth=no
sentwarning_inode=no
sentwarning_quota=no
skin=evolution
spam=ON
ssh=ON
ssl=ON
suspend_at_limit=OFF
suspended=no
sysinfo=ON
twostep_auth=no
user_widgets=WGT_USER_STATS:WGT_ADDITIONAL_DOMAINS
username=admin
usertype=admin
vdomains=unlimited
zoom=100
EOF

cp /usr/local/directadmin/data/users/admin/reseller.conf /usr/local/directadmin/data/users/admin/reseller.conf_1
truncate -s 0 /usr/local/directadmin/data/users/admin/reseller.conf
cat <<EOF > /usr/local/directadmin/data/users/admin/reseller.conf
additional_bandwidth=0
aftp=ON
bandwidth=unlimited
catchall=ON
cgi=ON
clamav=ON
cron=ON
dns=OFF
dnscontrol=ON
domainptr=unlimited
ftp=unlimited
git=ON
inode=unlimited
ip=shared
ips=0
login_keys=ON
mysql=unlimited
nemailf=unlimited
nemailml=unlimited
nemailr=unlimited
nemails=unlimited
ns1=ns1.{redirect_host}
ns2=ns2.{redirect_host}
nsubdomains=unlimited
nusers=unlimited
oversell=OFF
package=admin
php=ON
quota=unlimited
redis=ON
reseller_widgets=WGT_RESELLER_STATS:WGT_LIST_USERS:WGT_SKINS
serverip=ON
spam=ON
ssh=ON
ssl=ON
subject=Your account for |domain| is now ready for use.
sysinfo=ON
userssh=ON
vdomains=unlimited
wordpress=ON
EOF

cp /usr/local/directadmin/data/users/admin/php/php-fpm72.conf /usr/local/directadmin/data/users/admin/php/php-fpm72.conf_1
truncate -s 0 /usr/local/directadmin/data/users/admin/php/php-fpm72.conf
cat <<EOF > /usr/local/directadmin/data/users/admin/php/php-fpm72.conf
[admin]
user = $pool
group = $pool
listen = /usr/local/php72/sockets/$pool.sock
listen.owner = $pool
listen.group = apache
listen.mode = 660
pm = ondemand
pm.max_children = 10
pm.process_idle_timeout = 20
pm.max_requests = 500
php_admin_value[sendmail_path] = /usr/sbin/sendmail -t -i -f admin@{redirect_host}
php_admin_value[session.save_path] = /home/admin/tmp
php_admin_value[open_basedir] = /home/admin/:/tmp/:/var/tmp/:/opt/alt/php72/usr/share/pear/:/dev/urandom:/usr/local/php72/lib/:/usr/local/php72/lib/:/usr/local/php80/lib/:/usr/local/php81/lib/:/usr/local/php82/lib/:/usr/local/lib/php/
php_admin_value[mail.log] = /home/admin/.php/php-mail.log
security.limit_extensions = .php .php52 .php53 .php54 .php55 .php56 .php60 .php70 .php71 .phtml .inc .php72
EOF

mv /usr/local/directadmin/data/admin/show_all_users.cache /usr/local/directadmin/data/admin/show_all_users.cache_1

truncate -s 0 /usr/local/directadmin/custombuild/custombuild.log

/usr/local/directadmin/scripts/ipswap.sh 103.110.84.30 {ip}
`;

const networkConfig=`# Remove ifcfg-lo:100 configuration
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

systemctl daemon-reload
`;

// DOM Elements
const directadminConfigOutput = document.getElementById("directadminConfigOutput");
const optionsConfigOutput = document.getElementById("optionsConfigOutput");
const setupConfigOutput = document.getElementById("setupConfigOutput");
const networkConfigOutput = document.getElementById("networkConfigOutput");

const copyButtons = [
    { button: document.getElementById("copyButton1"), output: directadminConfigOutput, message: document.getElementById("copyMessage1") },
    { button: document.getElementById("copyButton2"), output: optionsConfigOutput, message: document.getElementById("copyMessage2") },
    { button: document.getElementById("copyButton3"), output: setupConfigOutput, message: document.getElementById("copyMessage3") },
    { button: document.getElementById("copyButton4"), output: networkConfigOutput, message: document.getElementById("copyMessage4") },
];

const configForm = document.getElementById("configForm");

// Display default config on page load
directadminConfigOutput.textContent = directadminConfig;
optionsConfigOutput.textContent = optionsConfig;
setupConfigOutput.textContent = setupConfig;
networkConfigOutput.textContent = networkConfig;

// Event listener to update configs when form is submitted
configForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const formData = new FormData(this);
    const configValues = Object.fromEntries(formData);

    // Update each config block
    directadminConfigOutput.textContent = replaceConfigPlaceholders(directadminConfig, configValues);
    optionsConfigOutput.textContent = replaceConfigPlaceholders(optionsConfig, configValues);
    setupConfigOutput.textContent = replaceConfigPlaceholders(setupConfig, configValues);
    networkConfigOutput.textContent = replaceConfigPlaceholders(networkConfig, configValues);

    // Show update message
    const updateMessage = document.getElementById("updateMessage");
    updateMessage.classList.remove("hidden");
    setTimeout(() => {
        updateMessage.classList.add("hidden");
    }, 3000);
});

// Replace placeholders in configs with form values
function replaceConfigPlaceholders(config, values) {
    let updatedConfig = config;
    for (const [key, value] of Object.entries(values)) {
        const placeholder = `{${key}}`;
        updatedConfig = updatedConfig.replace(new RegExp(placeholder, "g"), value);
    }
    return updatedConfig;
}

// Add copy to clipboard functionality for each config output
copyButtons.forEach(({ button, output, message }) => {
    button.addEventListener("click", function () {
        if (!configForm.reportValidity()) {
            const fillMessage = output.previousElementSibling.querySelector(".text-red-500");
            fillMessage.classList.remove("hidden");
            setTimeout(() => {
                fillMessage.classList.add("hidden");
            }, 3000);
        } else {
            navigator.clipboard.writeText(output.textContent).then(() => {
                message.classList.remove("hidden");
                setTimeout(() => {
                    message.classList.add("hidden");
                }, 3000);
            });
        }
    });
});
