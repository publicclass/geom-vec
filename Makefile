
test:
	node_modules/.bin/mocha -r should test.js

api.html: test.js index.js support/head.html support/foot.html
	node_modules/.bin/mocha -r should $< -R doc | cat support/head.html - support/foot.html > $@

api.md: test.js index.js
	node_modules/.bin/mocha -r should $< -R markdown > $@

.PHONY: test