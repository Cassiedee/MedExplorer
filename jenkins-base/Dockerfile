FROM centos:centos6

RUN yum -y update; yum clean all
RUN yum -y install epel-release; yum clean all
RUN yum -y install nodejs npm; yum clean all

EXPOSE 80
EXPOSE 10050

#run once to create image
# docker build --rm -t jenkins-base:latest .
#move this into separate folder
