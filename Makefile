install:
	npm i
	npm install netlify-cli -g
	netlify login
	netlify dev

dev:
	netlify dev

style:
	npx tailwindcss -i ./assets/css/config.css -o ./assets/css/style.css --watch

.PHONY: install
