help:
    @just --list

start:
    tmux new-session -d -s vite 'npm run dev'
    docker compose up -d
    sleep 3
    just open

stop:
    docker compose down
    tmux kill-session -t vite 2>/dev/null || true

restart:
    docker compose restart

tests:
    docker compose exec php bin/phpunit

open:
    open https://localhost

biome:
    npm run lint:fix
