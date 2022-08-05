FROM node:14

# Bundle APP files
COPY . .
COPY package.json .

# Install app dependenciesss
RUN npm install

# Expose the listening port of your app
EXPOSE 3001

# Show current folder structure in logs
RUN ls -al -R

CMD [ "npm", "run", "start" ]