DOCKER_COMPOSE_DEV=docker-compose.yml

dev: 
	docker compose -f $(DOCKER_COMPOSE_DEV) up --build

# dev:
# 	docker compose -f $(DOCKER_COMPOSE_BASE) -f $(DOCKER_COMPOSE_DEV) up --build

down:  docker-compose -f $(DOCKER_COMPOSE_DEV) up

re: down dev