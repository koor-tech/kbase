IMAGE ?= squidfunk/mkdocs-material

serve:
	docker run --net=host --volume "$$(pwd)":"$$(pwd)" --workdir "$$(pwd)" -it $(IMAGE)

build:
	docker run --net=host --volume "$$(pwd)":"$$(pwd)" --workdir "$$(pwd)" -it $(IMAGE) build --clean

prepare:
	pip3 install -r requirements.txt

deploy: prepare
	mkdocs build --clean
