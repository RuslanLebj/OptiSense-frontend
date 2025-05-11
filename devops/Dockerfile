# Сборка 
FROM node:20-alpine AS builder

WORKDIR /app

# Сначала только манифесты (кеш слоёв)
COPY package*.json ./

# Установка зависимостей 
RUN npm ci

# Копируем остальной исходный код
COPY . .

# Сборка оптимизированного бандла
RUN npm run build


# Продакшн
FROM nginx:1.25-alpine

# Удаляем дефолтную конфигурацию
RUN rm /etc/nginx/conf.d/default.conf

# Кладём свою
COPY devops/nginx/nginx.conf /etc/nginx/conf.d/app.conf

# Копируем собранную статику
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

# Проверяем, что фронт отдаёт 200 OK
HEALTHCHECK --interval=30s --timeout=3s --retries=3 \
  CMD wget -qO- http://localhost/ || exit 1

# Запускаем Nginx на переднем плане
CMD ["nginx", "-g", "daemon off;"]
