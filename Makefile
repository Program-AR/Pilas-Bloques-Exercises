build: 
	@ if [ -d "./dist" ]; then rm -r ./dist; fi
	@ ./node_modules/grunt/bin/grunt typescript
	@ npm run generate-random-grammar
	@ touch ./dist/imageList.js
	@ python scripts/generateImageList.py
	@ cp -r src/assets dist/data
	@ ./node_modules/grunt/bin/grunt concat
	@ rm ./dist/gramaticaAleatoria.js
	@ rm ./dist/imageList.js