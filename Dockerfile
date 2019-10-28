FROM keymetrics/pm2:latest-alpine

# Bundle APP files

WORKDIR /app

#handle package installation
COPY package*.json /app/
ENV NPM_CONFIG_LOGLEVEL warn
RUN npm ci --only=production
#copy project files
COPY . .

EXPOSE 8080


CMD [ "pm2-runtime", "start", "pm2.json" ]

