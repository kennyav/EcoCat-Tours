FROM node:15.14-alpine

WORKDIR /app
EXPOSE 3000

COPY package.json package-lock.json ./ 

# #RUN npm cache clean --force 
# #rm -rf node_modules package-lock.json    
            
RUN npm install --silent

COPY . ./ 
#RUN npm install --verbose
#RUN npm install react-scripts@latest

CMD ["npm", "start"]