#!/bin/bash

scp -i id_rsa_yujin ec2-user@${1}:/home/ec2-user/.kube/config .
