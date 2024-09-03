setup-env:
	cp -i .env.example .env.local
	cp -i .env.example .env.production

setup-db:
	docker compose up -d

generate-secret:
	openssl rand -base64 32
