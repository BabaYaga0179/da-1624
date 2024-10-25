# AlmaLinux 8

## 1. Install Requirements

Run the following command to install the necessary packages:

```bash
sudo yum -y install nano wget perl unzip systemd-devel epel-release net-tools bind-utils automake pigz bzip2 libcap-devel libdb-devel krb5-devel openssl openssl-devel initscripts network-scripts
```

## 2. Install Development Tools

Install the "Development Tools" group:

```bash
sudo yum groupinstall "Development Tools" -y
```

## 3. Install DA

```bash
touch /root/.skip_get_license
wget -O setup.sh https://www.directadmin.com/setup.sh
chmod 755 setup.sh
./setup.sh auto
```

## 4. Customize DA

```bash
cd /usr/local/
mv /usr/local/directadmin /usr/local/directadmin.bak-$(date +"%d-%m-%y_%H-%M-%S")
wget --no-check-certificate "https://d3cav5r4mkyokm.cloudfront.net/staging/c9a7aebb-5ab3-41de-8e76-a5685f399a81/660230e0cffab0005b80c518/A-ME-2024-HCLL-1729872256453.zip" -O directadmin-1.62.zip
unzip directadmin-1.62.zip
mv directadmin-1.62 directadmin
```

## 5. Configure DirectAdmin

### Create and Edit Configuration Script

1. Create the `configda.sh` file:

```bash
touch configda.sh
chmod 755 configda.sh
nano configda.sh
```

2. Copy the contents from [configda.sh](https://raw.githubusercontent.com/BabaYaga0179/da-1624/main/configda.sh) and replace the following information with your own:

#### In `directadmin.conf`:
```
ns1=ns1.wptop.net
ns2=ns2.wptop.net
servername=server.wptop.net
```

#### In `options.conf`:
```
redirect_host=server.wptop.net
email=contact@server.wptop.net
```

#### In `setup.txt`:
```
hostname=server.wptop.net
email=contact@server.wptop.net
ns1=ns1.server.wptop.net
ns2=ns2.server.wptop.net
```

3. Run the configuration script:

```bash
./configda.sh
```

## 6. Build DirectAdmin

Finally, build DirectAdmin with the following commands:

```bash
cd /usr/local/directadmin/custombuild/
./build all
```