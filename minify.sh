# Description: Minify browsercheck.js

[ -f browsercheck.min.js ] && rm browsercheck.min.js
cat browsercheck.js |docker run -i --rm gildas/terser > browsercheck.min.js
[ -f browsercheck.min.js ] && echo "browsercheck.min.js created" || echo "browsercheck.min.js not created"
