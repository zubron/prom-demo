#!/bin/bash

eval $(minikube docker-env)

docker build -t todo-demo:s0 .
