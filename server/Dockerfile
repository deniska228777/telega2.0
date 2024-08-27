FROM node:20-alpine
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . ./
CMD npm run dev
ENV PORT=6556
EXPOSE 6556