FROM node:18 AS build
WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build:ssr

FROM node:18 AS production
WORKDIR /app

COPY --from=build /app/dist /app/dist

RUN npm ci --only=production

EXPOSE 4000

# Commande pour démarrer le serveur SSR
CMD ["npm", "run", "serve:ssr"]