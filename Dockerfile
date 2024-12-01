FROM node:20-alpine
WORKDIR /app
RUN npm i -g serve pnpm
COPY package.json pnpm-lock.yaml .
RUN pnpm i
COPY . .
COPY sample.env .env
RUN pnpm build
EXPOSE 3000
CMD [ "serve", "-s", "dist" ]
