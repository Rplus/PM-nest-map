
all:
	@echo 'run tasks in diff tabs'

rollup_js:
	rollup -c rollup.config.js -w

browser-sync:
	browser-sync start --server --no-open --no-notify --files="**/*"
