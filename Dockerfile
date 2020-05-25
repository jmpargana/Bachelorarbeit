# Specify the image
FROM golang:latest

# Update debian and install dependencies
RUN apt-get update && apt-get install -y poppler-utils wv unrtf tidy npm
RUN npm i npm@latest -g

# Create folder within image to hold source files
RUN mkdir /app

# Copy everything in the root directory
ADD . /app

# Run all commands inside /app directory
WORKDIR /app/client

# npm build just to be sure (not a good idea if installed node version is old)
RUN npm i && npm run build

WORKDIR /app/server

# Compile the binary
RUN go install

EXPOSE 8080
# EXPOSE 8000
# EXPOSE 3000

# WORKDIR /app

# Start web server
CMD ["server", "-m", "mongodb+srv://icmjmp:XyrFJ0sbYuDqmScg@cluster0-zqgvn.mongodb.net/test"]
