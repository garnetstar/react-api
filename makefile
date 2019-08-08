frontend-build:
	docker-compose run --rm --user=node node-frontend npm run build

frontend-start:
	docker-compose run --rm --user=node node-frontend npm run start
