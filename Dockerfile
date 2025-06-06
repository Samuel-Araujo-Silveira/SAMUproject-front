FROM node:22.13.1
WORKDIR /app
COPY . .
RUN npm install
EXPOSE 3000
RUN npm run build
CMD ["npm", "run", "dev"]
