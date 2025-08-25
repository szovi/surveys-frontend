# ---- Build Stage ----
FROM node:22 AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# ---- Run Stage ----
FROM nginx:alpine

# Vite build kimenete -> nginx static
COPY --from=build /app/dist /usr/share/nginx/html

# Alap nginx conf felülírása SPA fallback miatt
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]