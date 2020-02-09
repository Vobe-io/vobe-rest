## Installation
First of all you have to find all domain related stuff in the docker-compose.yml and replace it with your domain.\
After that enter your SendGrid api token in the `.env` file:
```shell script
# email
SENDGRID_API_KEY='YOUR KEY'
```
If you don't want to use email verification change DEBUG to True in the `.env` file:
```shell script
#debug
DEBUG=true
```
The run:
```shell script
docker-compose up --build -d
```
Have fun🎉

## Common Errors
##### Can't access *any file in /vobe*
This error usually appears, when the docker container doesn't
has enough permission to read/write files.
The easiest way to fix that is by giving the whole folder default 
Permissions.\
*But* This also makes it possible to write/read on files in there without any permissions.
So take care that the Host-Computer is secured enough

```shell script
chown $USER:$USER -R ./vobe/*
```