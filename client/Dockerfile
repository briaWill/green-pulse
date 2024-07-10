FROM node:22-alpine3.19 AS build

WORKDIR /usr/src/app
COPY package.json package-lock.json ./

# Install dependencies and copy them to the container
RUN npm install
COPY . .

# Build the Angular application for production
RUN npm run build

# Configure the nginx web server
FROM nginx:latest
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /usr/src/app/dist/client /usr/share/nginx/html

# Run the web service on container startup.
CMD ["nginx", "-g", "daemon off;"]
