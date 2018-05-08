FROM bitnami/node:8

RUN install_packages apt-transport-https

# Install Yarn
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - && \
    echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list && \
    install_packages yarn

ENV PORT 3000

COPY app/ /app
RUN yarn install

CMD ["yarn", "start"]
