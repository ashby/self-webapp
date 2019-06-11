FROM containers.biw-services.com/cpd/docker-images/node10:latest

RUN apk update \
  && apk add --no-cache ca-certificates openssl bash bash-completion grep curl wget nano \
  && update-ca-certificates

RUN mkdir -p /app

WORKDIR /app

COPY . /app

RUN npm config set registry https://npm-registry.biw-services.com
RUN yarn
RUN yarn build:prod

FROM nginx:alpine

COPY --from=0 /app/static /usr/share/nginx/html

COPY ./nginx.conf /etc/nginx/conf.d/default.conf
