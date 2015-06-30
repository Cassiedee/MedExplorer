# Copyright (c) 2015 Northrop Grumman Systems Corporation. All Rights Reserved.
FROM jenkins-base:latest
MAINTAINER The CentOS Project <cloud-ops@centos.org>

ADD . /src
WORKDIR /src/


RUN npm install

CMD export NODE_ENV=production
CMD PORT=80 node ./bin/www
