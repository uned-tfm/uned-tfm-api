FROM node:16.10.0

WORKDIR /tfm-malware-api

RUN npm install -g npm@7.24.0
RUN npm install -g pm2

COPY ../build/ /tfm-malware-api
COPY ../package.json /tfm-malware-api

RUN npm install --unsafe-perm

RUN mkdir /tfm-malware-api/pm2-logs
RUN chmod -R 755 /tfm-malware-api/pm2-logs

ENV OPENSSL_CONF=/etc/ssl/

COPY pm2.config.js pm2.config.js
COPY wait-for-it.sh wait-for-it.sh
RUN chmod 777 wait-for-it.sh

EXPOSE 8000
