FROM node:20-alpine AS build
WORKDIR /app
COPY ./ ./
RUN npm install -g @angular/cli \
 && npm install \
 && ng build --configuration=production

FROM nginx:alpine

# remove o que tinha no nginx ( pra arrumar erro )
RUN rm -rf /usr/share/nginx/html/*

COPY --from=build /app/dist/todo-app/browser/ /usr/share/nginx/html/

COPY --from=build /app/dist/todo-app/3rdpartylicenses.txt /usr/share/nginx/html/
COPY --from=build /app/dist/todo-app/prerendered-routes.json /usr/share/nginx/html/

COPY ./nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
