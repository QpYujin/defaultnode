#!/bin/sh
service nginx start

consul-template -consul-addr "$CONSUL_HOST" -template "/templates/services.conf.ctmpl:/etc/nginx/conf.d/services.conf:service nginx reload"
