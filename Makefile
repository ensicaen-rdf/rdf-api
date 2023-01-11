.PHONY: keys
keys:
	rm -rf keys
	mkdir -p keys
	ssh-keygen -t rsa -b 4096 -m PEM -f ./keys/jwt-RS256.key -q -N ""
	openssl rsa -in ./keys/jwt-RS256.key -pubout -outform PEM -out ./keys/jwt-RS256.key.pub
