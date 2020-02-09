## Development
In order to run and test anything locally, you just have to change a few things.\
First of all edit `.env`:
```
#debug
DEBUG=true
```
Then start the containers locally:
```shell script
docker-compose -f docker-compose.dev.yml up --build -d
docker attach vobe_node
```
That's all you have to do.

## Tricks
If you are developing on Windows, you will have the problem, that docker uses Linux containers.\
So some node_modules cause problems and prevent the program to start. \
In order to fix this problem you have to delete the modules that cause the problem,\
so the Dockerfile can re-install them on Linux.
To make life easier you can create a simple script for that task.\
Create a file called `docker-reload.cmd`:
```cmd
docker-compose -f docker-compose.dev.yml down
@echo off
del node_modules\\node-sass /Q/S
del node_modules\\bcrypt /Q/S
docker-compose -f docker-compose.dev.yml up --build -d
docker attach vobe_node
```
Than you can run:
```cmd
./docker-reload
```
If you are using Linux create `docker-reload.sh`:
```shell script
#!/bin/sh
docker-compose -f docker-compose.dev.yml down
rm node_modules/node-sass
rm node_modules/bcrypt
docker-compose -f docker-compose.dev.yml up --build -d
docker attach vobe_node
```
And run:
```batch
chmod +x docker-reload.sh
./docker-reload.sh
```