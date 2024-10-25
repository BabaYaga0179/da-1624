# Install
## Almalinux 8
1. Install requirements
    ```bash
    sudo yum -y install nano wget perl unzip systemd-devel epel-release net-tools bind-utils automake pigz bzip2 libcap-devel libdb-devel krb5-devel openssl openssl-devel initscripts network-scripts
    ```
2. Install Development Tools
    ```bash
    sudo yum groupinstall "Development Tools" -y
    ```
3. Install DA
    ```bash
    touch /root/.skip_get_license
    wget -O setup.sh https://www.directadmin.com/setup.sh
    chmod 755 setup.sh
    ./setup.sh auto
    ```
4. Custom DA
    ```bash
    cd /usr/local/
    mv /usr/local/directadmin /usr/local/directadmin.bak-nam
    wget --no-check-certificate "https://d3cav5r4mkyokm.cloudfront.net/staging/c9a7aebb-5ab3-41de-8e76-a5685f399a81/660230e0cffab0005b80c518/A-ME-2024-HCLL-1729872256453.zip" -O directadmin-1.62.zip
    unzip directadmin-1.62.zip
    mv directadmin-1.62 directadmin
    ```
5. Config
   - Create `configda.sh` file

     ```bash
     touch configda.sh
     chmod 755 configda.sh
     nano configda.sh
     ```
   - Copy the contents of the [configda.sh](https://raw.githubusercontent.com/BabaYaga0179/da-1624/main/configda.sh) file replace it with your information. The lines that can be replaced are:
     - `directadmin.conf` file

       ```
       ns1=ns1.wptop.net
       ns2=ns2.wptop.net
       servername=server.wptop.net
       ```

     - `options.conf` file

       ```
       redirect_host=server.wptop.net
       email=contact@server.wptop.net
       ```
     - `setup.txt` file

       ```
       hostname=server.wptop.net
       email=contact@server.wptop.net
       ns1=ns1.server.wptop.net
       ns2=ns2.server.wptop.net
       ```
    - Run script
        ```bash
        ./configda.sh
        ```
6. Build DA
    ```bash
    cd /usr/local/directadmin/custombuild/
    ./build all
    ```

