FROM node as builder
WORKDIR /app

RUN echo "loglevel=silent" > .npmrc

COPY package.json .
COPY package-lock.json .
RUN npm install

COPY client/package.json client/ 
COPY client/package-lock.json client/
RUN (cd client; npm install)

COPY server/package.json server/
COPY server/package-lock.json server/
RUN (cd server; npm install)

FROM node as runner
WORKDIR /app

COPY --from=builder /app/node_modules .
COPY --from=builder /app/client/node_modules ./client/node_modules
COPY --from=builder /app/server/node_modules ./server/node_modules
COPY . .

EXPOSE 3001
EXPOSE 3000
EXPOSE 5000
CMD [ "npm", "run", "dev" ]