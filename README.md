# vobe


## Installation

```shell script
docker-compose up --build -d
```
If you want to install and test everything locally, you should use:

```shell script
docker-compose -f docker-compose.dev.yml up --build -d
```

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
