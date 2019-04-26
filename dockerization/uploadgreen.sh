#!/bin/sh

if [ ! -d /home/ubuntu/tempclone    ]; then
            mkdir /home/ubuntu/tempclone
fi

cd /home/ubuntu/tempclone || { printf "cd failed, exiting\n" >&2;  return 1; }

rm -rf CodeNinja502

git clone "https://github.com/airavata-courses/CodeNinja502.git"


cd /home/ubuntu/tempclone/CodeNinja502 || { printf "cd failed, exiting\n" >&2; unset ans; return 1; }




git checkout upload_green
git branch
cd uploadService
sudo docker build -t pmorpari/upload-green .
sudo docker login -u pmorpari -p sgapsp2019
sudo docker push pmorpari/upload-green
