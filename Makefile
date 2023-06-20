serve:
	mkdocs serve

build:
	mkdocs build --clean

prepare:
	pip3 install -r requirements.txt
ifdef GH_TOKEN
	echo "Installing mkdocs-material-insiders version (because GH_TOKEN is set)"
	@pip3 install --upgrade \
		"git+https://$$GH_TOKEN@github.com/koor-tech/mkdocs-material-insiders.git"
endif

deploy: prepare
	mkdocs build --clean
