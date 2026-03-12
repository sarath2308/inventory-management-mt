FROM node:22.17.0-alpine

WORKDIR /app

# copy dependency files first (docker caching)
COPY package*.json ./

# install dependencies
RUN npm install

# copy application code
COPY . .

# expose backend port
EXPOSE 5000

# run development server
CMD ["npm", "run", "dev"]