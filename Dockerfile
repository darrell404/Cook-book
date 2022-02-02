# Get default node docker image
FROM node:16-alpine3.14

ENV NODE_ENV=production

# Change working directory
WORKDIR /app
RUN mkdir backend
RUN mkdir frontend

COPY ["./backend/package.json", "./backend"]
COPY ["./frontend/package.json", "./frontend" ]

WORKDIR /app/frontend
RUN npm install
COPY ["./frontend" , "."]
RUN npm run build

WORKDIR /app/backend
RUN npm install --production
COPY ["./backend", "."]
EXPOSE 5000

CMD ["npm", "run", "server"]