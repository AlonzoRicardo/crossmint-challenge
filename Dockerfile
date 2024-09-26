# Use the official Node.js image as the base image
FROM node:20.15.0

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the project dependencies
RUN npm install

# Copy the rest of the project files to the working directory
COPY . .

# Build the TypeScript code
RUN npm run build

# Define the command to run the app with arguments passed to the container
ENTRYPOINT ["npm", "start", "--"]
CMD []
