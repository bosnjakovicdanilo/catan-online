FROM mysql:latest
COPY init.sql /docker-entrypoint-initdb.d/
EXPOSE 3306
HEALTHCHECK --interval=20s --timeout=3s --start-period=20s --retries=4 \
  CMD mysqladmin ping -h localhost -uroot -p"${MYSQL_ROOT_PASSWORD}" || exit 1
