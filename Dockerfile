FROM node:17-alpine3.14

ENV NODE_ENV=production

WORKDIR /app/backend

COPY ["./backend/package.json", "."]

RUN yarn install --production

COPY ./backend .
COPY ./frontend/build ../frontend/build
CMD ["yarn", "server"]