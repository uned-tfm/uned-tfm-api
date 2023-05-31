#!/bin/bash

if [ $# -lt 1 ]; then
  echo "Usage: $0 <docker_up | docker_down>"
  exit 1
fi

if [ $1 == "docker_down" ]; then
  docker-compose -f docker-compose.yml down
  exit 1
fi

if [ $1 == "docker_up" ]; then
  # 1. Creamos el contenedor de node 16.10 y compilamos el proyecto.
  docker run --name tfm_malware_node -v $(pwd)/../:/tfm_malware -it node:16.10 bash -c "sh /tfm_malware/tfm-malware.build.sh"

  # 2. Eliminamos el contenedor y la imagen.
  docker rm tfm_malware_node
  docker rmi node:16.10

  # 3. Desplegamos el proyecto.
  docker-compose -f docker-compose.yml up --build -d
  exit 1
fi
