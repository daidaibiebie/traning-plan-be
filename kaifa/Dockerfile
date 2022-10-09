# from 构建镜像的基础源镜像 该image镜像文件继承官方的node image
FROM node:10.0

# 在容器中创建一个目录
RUN mkdir -p /kaifa

# 定位到容器的工作目录
WORKDIR /kaifa

# RUN/COPY是分层的，package.json 提前，只要没修改就不会重新安装包
COPY package.json /kaifa/package.json
RUN cd /kaifa
RUN npm i

# 把当前目录下所有的文件拷贝到 Image 的 /usr/src/app/目录下
COPY . /kaifa

EXPOSE 3000
CMD npm start

EXPOSE 3000
CMD ["node", "server.js"]
