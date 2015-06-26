# Copyright (c) 2015 Norhtrop Grumman Systems Corporation. All Rights Reserved.
FROM jenkins-base:latest
MAINTAINER The CentOS Project <cloud-ops@centos.org>

ADD . /src
WORKDIR /src/

RUN npm install

#CMD ["npm", "start"]
CMD PORT=80 node ./bin/www
