@echo off
title Docker reset
docker-compose down
docker image prune -af
docker volume prune -f

echo Docker reset finished.
echo Press any key to return.
pause
exit