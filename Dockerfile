# node底包
FROM node:9.11.1 as builder
# 定义容器中的工作路径
WORKDIR /app
# 安装依赖
COPY package.json yarn.lock ./
#RUN npm config set registry 'https://registry.npm.taobao.org' \
#    && npm install --pure-lockfile
RUN npm install cnpm -g --registry=https://registry.npm.taobao.org \
     && cnpm install --pure-lockfile
# 拷贝所有文件
COPY . .
COPY app/utils/serverUrl.sample.js ./app/utils/serverUrl.js
#定义环境变量 平台代号
ARG SITE_CODE
ARG GATEWAY
# 构建打包
#RUN npm run build
RUN cnpm run build

FROM nginx:stable
COPY --from=builder /app/.nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build /usr/share/nginx/html
