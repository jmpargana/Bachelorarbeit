build:
	docker build -t bachelor-arbeit-server .

run:
	docker run \
		-p 8080:8080 \	# where all will run
		-p 8888:8888 \	# docd runs to convert .pdf files to text
		-d bachelor-arbeit-server

exec:
	docker run \
		--rm \
		-it \
		-p 8080:8080 \
		-p 8888:8888 \
		bachelor-arbeit-server \
		/bin/bash
