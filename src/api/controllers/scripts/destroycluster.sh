#! /bin/bash
export AWS_ACCESS_KEY_ID=$1
export AWS_SECRET_ACCESS_KEY=$2

export NAME=deploybytes.com
export KOPS_STATE_STORE=s3://qpair-state-store

kops delete cluster $NAME --yes
