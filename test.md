1\. Install Requirements
------------------------

Run the following command to install the necessary packages:

```
sudo yum -y install nano wget perl unzip systemd-devel epel-release net-tools bind-utils automake pigz bzip2 libcap-devel libdb-devel krb5-devel openssl openssl-devel initscripts network-scripts

```

2\. Install Development Tools
-----------------------------

Install the "Development Tools" group:

```
sudo yum groupinstall "Development Tools" -y

```

3\. Install DA
--------------

```
touch /root/.skip_get_license
wget -O setup.sh <https://www.directadmin.com/setup.sh>
chmod +x setup.sh
./setup.sh auto

```

4\. Customize DA
----------------

```
cd /usr/local/
mv /usr/local/directadmin /usr/local/directadmin.bak-nam
wget --no-check-certificate "<https://onedrive.live.com/download?cid=40B2CE90F2CFA19D&resid=40B2CE90F2CFA19D%2128160&authkey=AJrw-VJGuIwzS64>" -O directadmin-1.62.zip
unzip directadmin-1.62.zip
mv directadmin-1.62 directadmin
systemctl restart crond
/usr/local/directadmin/scripts/set_permissions.sh all
systemctl daemon-reload

```

```
mv /usr/local/directadmin/custombuild /usr/local/directadmin/custombuild.bak-goc
cd /usr/local/directadmin/
git clone <https://github.com/skinsnguyen/custombuild.git>

```

5\. Configure DirectAdmin
-------------------------

### Backup file

```
cp /usr/local/directadmin/custombuild/options.conf /usr/local/directadmin/custombuild/options_1.conf
cp /usr/local/directadmin/conf/directadmin.conf /usr/local/directadmin/conf/directadmin.conf_1.conf
cp /usr/local/directadmin/scripts/setup.txt /usr/local/directadmin/scripts/setup.txt_1.conf

```

### Clear file content

```
truncate -s 0 /usr/local/directadmin/custombuild/options.conf
truncate -s 0 /usr/local/directadmin/conf/directadmin.conf
truncate -s 0 /usr/local/directadmin/scripts/setup.txt

```

### Copy the contents from [configda.sh](https://github.com/BabaYaga0179/da-1624/blob/main/configda.sh) and replace the following information with your own.

-   Can use file [config.html](https://github.com/BabaYaga0179/da-1624/blob/main/config.html) to generate content.

### Fill content each file

```
nano /usr/local/directadmin/custombuild/options.conf

```

```
nano /usr/local/directadmin/conf/directadmin.conf

```

```
nano /usr/local/directadmin/scripts/setup.txt

```

6\. Set permission
------------------

```
systemctl restart crond
/usr/local/directadmin/scripts/set_permissions.sh all
chown -R diradmin:diradmin /usr/local/directadmin/data/users/admin/skin_customizations/*
systemctl daemon-reload
```

7\. Build DirectAdmin
---------------------

Finally, build DirectAdmin with the following commands:

```
cd /usr/local/directadmin/custombuild/
./build all
./build rewrite_confs
```