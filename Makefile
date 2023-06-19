serve:
	mkdocs serve

build:
	mkdocs build --clean

prepare:
	pip3 install -r requirements.txt

deploy: prepare
	mkdocs build --clean
