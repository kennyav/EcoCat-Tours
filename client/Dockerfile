FROM node:15.14-alpine

WORKDIR /app
EXPOSE 3000

COPY package.json package-lock.json ./ 

RUN npm install --silent

COPY . ./ 

RUN npm run build
# CMD ["npm", "start"]