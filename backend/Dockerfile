FROM node:current-alpine3.14 AS builder

LABEL maintainer="me AT ass.af"

WORKDIR /app
ADD . /app

RUN npm ci --production

FROM node:current-alpine3.14 AS runner

ENV "PORT"="1337"

RUN addgroup --gid 1001 app \
    && adduser -g "First Last,RoomNumber,WorkPhone,HomePhone" -u 1001 -D -G app app
USER app

COPY --from=builder --chown=app:app /app /app

EXPOSE ${PORT}

ENTRYPOINT [ "node", "/app/index.js"]
