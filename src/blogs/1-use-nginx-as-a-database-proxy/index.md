---
title: "Use NGINX as a database proxy"
date: "2024-06-05"
category: "DevOps"
excerpt: "A post about how to use NGINX as a database proxy."
readTime: "1 min read"
---

In our everyday life as DevOps engineers, developers request access to databases from their workstations. Since most of them are connecting from different locations, it results in a wide-open IP list whitelisting from the database end, which may cause severe security problems. Masking the default database endpoint and the port using NGINX can be helpful to centralize the IP whitelisting and enhance security. So, in this kind of situation, we can use a proxy to access the database to resolve this network issue.

---

![Architecture diagram](./diagram.jpg)

---

1. Install NGINX
    apt -y install nginx
2. Install NGINX Stream module
    apt -y install libnginx-mod-stream
3. Configure Nginx, Open */etc/nginx/nginx.conf* file and add the config below to the end of the file.

```
# add to the end

stream {
    upstream db1 {
        server {{ DATABASE ENDPOINT 1 GOES HERE }}:3306
    }
    server {
        listen 8808 so_keepalive=on;
        proxy_connect_timeout 60s;
        proxy_socket_keepalive on;
        proxy_pass db1;
    }
    upstream db2 {
        server {{ DATABASE ENDPOINT 2 GOES HERE }}:3306
    }
    server {
        listen 8809 so_keepalive=on;
        proxy_connect_timeout 60s;
        proxy_socket_keepalive on;
        proxy_pass db2;
    }
}

```

Developers can now access database 1 using <server IP>:8808 with their credentials.

    `mysql -h <IP> -u <UserName> -P 8808 -p`
