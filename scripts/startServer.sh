#!/bin/bash
export NVM_DIR=~/.nvm
source ~/.nvm/nvm.sh

cd /var/www/html/Aquarium/api/
pnpm install 
cd /var/www/html/Aquarium/api/apps/server
pm2 start --name AquariumServer pnpm -- run start