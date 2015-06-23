set PATH=%PATH%;"C:\Program Files (x86)\Git\bin"

::call boot2docker ssh "docker build -t med/nodejs:centos6 ."
call boot2docker ssh "docker save -o med/nodejs:centos6 IMAGE"

call scp IMAGE root@10.2.101.112:/

call ssh root@10.2.101.112 "docker load -i IMAGE; docker run -d -p 8080:8080 -p 10050:10050 --name nodejs med/nodejs:centos6"
