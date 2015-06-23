# "ported" by Adam Miller <maxamillion@fedoraproject.org> from
#   https://github.com/fedora-cloud/Fedora-Dockerfiles
#
# Originally written for Fedora-Dockerfiles by
#   "Jason Clark" <jclark@redhat.com>

FROM centos:centos6
MAINTAINER The CentOS Project <cloud-ops@centos.org>

RUN yum -y update; yum clean all
RUN yum -y install epel-release; yum clean all
RUN yum -y install nodejs npm; yum clean all
RUN yum -y install zabbix-agent; yum clean all

#ADD zabbix_agent/countContainers.sh /usr/local/bin/countContainers.sh
#ADD zabbix_agent/containerHelper.py /usr/local/bin/containerHelper.py

ADD . /src

RUN cd /src; npm install

EXPOSE 80
EXPOSE 10050

#CMD ["npm", "start"]
CMD PORT=80 node www/bin
