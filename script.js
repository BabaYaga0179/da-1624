const directadminConfig = `#Auth: wptop.net

cp /usr/local/directadmin/conf/directadmin.conf /usr/local/directadmin/conf/directadmin.conf_1.conf
cat <<EOF >> /usr/local/directadmin/conf/directadmin.conf
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

const optionsConfig = `#Auth: wptop.net

cp /usr/local/directadmin/custombuild/options.conf /usr/local/directadmin/custombuild/options_1.conf
cat <<EOF >> /usr/local/directadmin/custombuild/options.conf
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

const setupConfig = `#Auth: wptop.net

cp /usr/local/directadmin/scripts/setup.txt /usr/local/directadmin/scripts/setup.txt_1.conf
cat <<EOF >> /usr/local/directadmin/scripts/setup.txt
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
`;

const networkConfig=`#Auth: wptop.net

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
