# budowanie aplikacji
FROM node:20-alpine AS build
WORKDIR /app
COPY ./frontend ./
RUN npm install
RUN npm run build

# serwowanie przez serwer nginx
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]