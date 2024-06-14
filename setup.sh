
cp .env apps/web/.env 2> /dev/null || :
apk update 
apk install libuuid