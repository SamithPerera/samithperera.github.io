# Stage 1: install dependencies
FROM node:24-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# Stage 2: local development server
FROM deps AS dev
WORKDIR /app
COPY . .
EXPOSE 4321
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]

# Stage 3: build static Astro output
FROM deps AS builder
WORKDIR /app
COPY . .
RUN npm run build

# Stage 4: serve static site with nginx
FROM nginx:alpine AS server
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
