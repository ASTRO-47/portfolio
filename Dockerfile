FROM node:22-bullseye AS base
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./

FROM base AS development
COPY run-dev.sh /usr/local/bin/run_dev.sh
RUN chmod +x /usr/local/bin/run_dev.sh
CMD ["/usr/local/bin/run_dev.sh"]

FROM base AS production
COPY . .
RUN npm install
RUN npm run build
RUN cp -r src/database dist/
CMD ["npm", "run", "start"]