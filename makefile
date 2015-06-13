PROJECTS = alchemy-easel
DEST = ~/public_html/

.PHONY: deploy clean
all: deploy

deploy:
	\cp -r $(PROJECTS) $(DEST)

clean:
	\rm -r $(foreach proj, $(PROJECTS), $(DEST)$(proj)/)
