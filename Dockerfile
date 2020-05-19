# Specify the image
FROM golang:latest

# Update debian and install dependencies
RUN apt-get update && apt-get install -y poppler-utils wv unrtf tidy vim

# Create folder within image to hold source files
RUN mkdir /app

# Copy everything in the root directory
ADD . /app

# Run all commands inside /app directory
WORKDIR /app

# Add mods to pull any dependencies
RUN go get github.com/JalfResi/justext
RUN go get code.sajari.com/docconv/...
RUN go get go.mongodb.org/mongo-driver/mongo

# Compile the binary
RUN go build -o server server/*.go

# Start web server
CMD ["/app/server"]
