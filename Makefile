install:
	npm i
	composer install

dev:
	php -S localhost:8080 -t .

style:
	npx tailwindcss -i ./assets/css/config.css -o ./assets/css/style.css --watch

.PHONY: install
