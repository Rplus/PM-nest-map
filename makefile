
all:
	@echo 'run tasks in diff tabs'

rollup_js_watch:
	rollup -c rollup.config.js -w

rollup_js:
	rollup -c rollup.config.js

browser-sync:
	browser-sync start --server --no-open --no-notify --files="**/*" --ignore="node_modules/*"

deploy: rollup_js
	git add js/main.min.js;           \
	git commit -m 'update built file'; \
	git push;
