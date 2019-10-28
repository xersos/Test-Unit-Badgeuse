FROM nginx:alpine

RUN apk add npm git bash

WORKDIR /app

COPY package*.json /app/
RUN npm install

COPY ./ /app/

ARG configuration=production
RUN npm run build -- --output-path=/app/dist/out --configuration $configuration

RUN cp -R /app/dist/out/* /usr/share/nginx/html/

COPY /nginx-custom.conf /etc/nginx/conf.d/default.conf
CMD ["nginx", "-g", "daemon off;"]


# Multistage is curently not supported on centos.
# Stage 0, "build-stage", based on Node.js, to build and compile the frontend
#FROM tiangolo/node-frontend:10 as buildstage
#WORKDIR /app

#COPY package*.json /app/
#RUN npm install

#COPY ./ /app/
#ARG configuration=production
#RUN npm run build -- --output-path=./dist/out --configuration $configuration
# Stage 1, based on Nginx, to have only the compiled app, ready for production with Nginx
#FROM nginx:1.15
#COPY --from=buildstage /app/dist/out/ /usr/share/nginx/html
# Copy the default nginx.conf provided by tiangolo/node-frontend
#COPY --from=buildstage /nginx.conf /etc/nginx/conf.d/default.conf


