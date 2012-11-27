
test:
	node_modules/.bin/mocha -r should test.js

test.html:
	node_modules/.bin/mocha -r should test.js -R doc > $@

.PHONY: test