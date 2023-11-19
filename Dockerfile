# Use a Node.js image as the base image for development
FROM node:alpine as development

WORKDIR /usr/src/app

COPY package.json ./
COPY tsconfig.json tsconfig.json
COPY nest-cli.json nest-cli.json

# Install NPM globally
RUN npm install -g npm

COPY . .

# Install dependencies using NPM
RUN npm install

CMD ["npm", "run", "start"]

# Use a smaller Node.js image for the production environment
FROM node:alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package.json ./
COPY tsconfig.json tsconfig.json
COPY nest-cli.json nest-cli.json

# Install NPM globally
RUN npm install -g npm

# Install production dependencies only
RUN npm install --prod

COPY --from=development /usr/src/app/dist ./dist

CMD ["npm", "run", "start"]
