FROM nginx
MAINTAINER Trinh Phuoc Thai <tphuocthai@gmail.com>

ENV CONSUL_HOST consul:8500
ENV CONSUL_TPL_VERSION 0.18.0

ADD https://releases.hashicorp.com/consul-template/$CONSUL_TPL_VERSION/consul-template_${CONSUL_TPL_VERSION}_linux_amd64.tgz /tmp
RUN tar zxf /tmp/consul-template_${CONSUL_TPL_VERSION}_linux_amd64.tgz -C /usr/bin && rm /tmp/consul-template_${CONSUL_TPL_VERSION}_linux_amd64.tgz

# Remove default config
RUN rm -rf /etc/nginx/conf.d/*

COPY conf.d/* /etc/nginx/conf.d/
COPY config/* /etc/nginx/

ADD templates /templates
ADD docker-entrypoint.sh /docker-entrypoint.sh

EXPOSE 80 443

CMD ["/docker-entrypoint.sh"]
