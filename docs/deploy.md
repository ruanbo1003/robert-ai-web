
## deploy on AWS
* update code and build image
```shell
cd /home/ubuntu && ./build_web.sh
```

* run docker
```shell
sudo docker run -d -it -p 3000:3000 --name ai_web robert_ai_web:dev
```

* update docker run
```shell
sudo docker stop ai_web && sudo docker rm ai_web && sudo docker run -d -it -p 3000:3000 --name ai_web robert_ai_web:dev
```

