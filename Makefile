install:
	npm install netlify-cli -g
	netlify login
	netlify dev
 
.PHONY: install
