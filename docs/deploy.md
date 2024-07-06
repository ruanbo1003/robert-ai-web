

## deploy to AWS steps  
    because of the limit of AWS vps, we build the docker image in our local laptop,  and push the image to Aliyun harbor.

1. build docker image on local laptop and push to AliYun harbor
* build
    ```shell
    docker build -t registry.cn-heyuan.aliyuncs.com/****/****:v0 -f docker/Dockerfile .
    ```
* push
    ```shell
    docker build -t registry.cn-heyuan.aliyuncs.com/****/****:v0 -f docker/Dockerfile .
    ```

2. login AWS vps
  
3. pull image [aws vps]
*  pull
    ```shell
    sudo docker pull registry.cn-heyuan.aliyuncs.com/****/****:v0
    ```

4. restart docker [aws vps]
* restart
    ```shell
    sudo docker stop ai_web && sudo docker rm ai_web && sudo docker run -d -it -p 3000:3000 --name ai_web registry.cn-heyuan.aliyuncs.com/****/****:v0
    ```
