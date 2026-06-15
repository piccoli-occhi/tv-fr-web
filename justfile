default:
    @just --list

start:
    docker compose up -d

stop:
    docker compose down

restart:
    docker compose restart

tests:
    docker compose exec php bin/phpunit

open:
    open https://localhost
