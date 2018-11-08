FROM microportal/nginx-kong:latest

ENV SERVICE_NAME=portal \
    SERVICE_URL=http://portal:80/ \
    SERVICE_PATHS=/portal

COPY release /usr/share/nginx/html