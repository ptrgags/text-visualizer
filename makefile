PROJECTS = alchemy-easel alchemy-coffee
COFFEE = alchemy-coffee
DEST = ~/public_html/

.PHONY: deploy clean build
all: deploy

deploy: build
	\cp -r $(PROJECTS) $(DEST)
	./bin/dependencies $(foreach proj, $(COFFEE), $(proj))

clean:
	-\rm -r $(foreach proj, $(PROJECTS), $(DEST)$(proj)/)
	-\rm -r $(foreach proj, $(COFFEE), $(proj)/scripts)
	-\rm $(foreach proj, $(COFFEE), $(proj)/index.html)

build: 
	./bin/compile-coffee $(foreach proj, $(COFFEE), $(proj))
