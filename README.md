# Triathlon front

Web applications allowing the management of stocks of several stores.
Several roles are available:

* Administrator (management of all stores)
* Store manager (product and seller management for his store)
* Seller (management of the quantity of stock in his store)

The API application is available [here](https://github.com/louisthomaspro/triathlon-api).

For the followings commands, you have to install [Angular CLI](https://github.com/angular/angular-cli).

## Installation

1. Clone

``` sh
git clone https://github.com/louisthomaspro/triathlon-front
cd triathlon-front
```

2. Run docker-compose

``` sh
docker-compose up -d
```

3. This front is working with [Triathlon API](https://github.com/louisthomaspro/triathlon-api), you have to install it.

## Useful commands

Remove all containers and image of docker

``` sh
docker container rm -f $(docker container ls -qa)
docker image rm -f $(docker image ls -q)
```

Copy docker node_modules to local

``` sh
docker cp CONTAINER_ID:/app/node_modules /your/directory/triathlon-front/
```

