# Настройки по умолчанию 
# имя образа
IMAGE       ?= optisense-frontend
# тег (можно передать: make TAG=abc123 build)
TAG         ?= latest
# имя контейнера
CONTAINER   ?= $(IMAGE)-ctr
# внешний порт
PORT        ?= 80

# Расположение Dockerfile
DOCKERFILE  := devops/Dockerfile
# Контекст = корень репозитория (.)
CONTEXT     := .


## Собрать образ (docker build)
build:
	docker build -f $(DOCKERFILE) -t "$(IMAGE):$(TAG)" $(CONTEXT)

## Запустить контейнер (docker run -d -p $(PORT):80 …)
run: stop
	docker run -d --name $(CONTAINER) -p $(PORT):80 $(IMAGE):$(TAG)

## Остановить и удалить контейнер, если он запущен
stop:
	-@docker rm -f $(CONTAINER) 2>/dev/null || true

## Перезапустить контейнер (stop + run)
restart:
	$(MAKE) run

## Смотреть логи (docker logs -f)
logs:
	docker logs -f $(CONTAINER)

## Войти внутрь контейнера (sh)
shell:
	docker exec -it $(CONTAINER) sh

## Удалить образ
clean:
	-@docker rmi $(IMAGE):$(TAG) 2>/dev/null || true
