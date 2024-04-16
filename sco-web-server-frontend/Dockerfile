FROM node:16-alpine3.18

RUN addgroup frontend && adduser -S -G frontend frontend
USER frontend

WORKDIR /app/

COPY --chown=frontend package*.json .

RUN npm install

COPY --chown=frontend . .

EXPOSE 4200
CMD ["npm", "run", "start"]