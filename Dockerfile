FROM node:13.2.0-stretch-slim

LABEL Name=pv-node-postgres-dev Version=1.0.0

EXPOSE 5000
#Adjust localtime to your needs
#Set locale
ENV DEBIAN_FRONTEND=noninteractive

RUN   apt-get update && apt-get install -y --no-install-recommends \
        locales \
        tzdata \
        ca-certificates \
        libpq-dev \
        && sed -i -e 's/# en_US.UTF-8 UTF-8/en_US.UTF-8 UTF-8/' /etc/locale.gen \
        && echo 'LANG="en_US.UTF-8"'>/etc/default/locale \
        && dpkg-reconfigure --frontend=noninteractive locales \
        && update-locale LANG=en_US.UTF-8 \
        && apt-get clean && rm -rf /var/lib/apt/lists/*

RUN mkdir /home/node/app && chown -R node:node /home/node/app

USER node

WORKDIR /home/node/app

COPY . ./

RUN npm install --no-optional && npm cache clean --force

CMD ["npm", "start"]
