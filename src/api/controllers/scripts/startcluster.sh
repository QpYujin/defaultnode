#! /bin/bash

export AWS_ACCESS_KEY_ID=$1
export AWS_SECRET_ACCESS_KEY=$2

aws s3api create-bucket --bucket qpair-state-store --region us-east-1
aws s3api put-bucket-versioning --bucket qpair-state-store --versioning-configuration Status=Enabled

export NAME=deploybytes.com
export KOPS_STATE_STORE=s3://qpair-state-store

kops create cluster --zones us-east-1a --master-size t2.medium --node-count=3 --kubernetes-version=1.7.6 $NAME
kops update cluster $NAME --yes
