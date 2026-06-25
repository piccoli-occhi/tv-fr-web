# tv-fr-web

Web application to browse French TV programs and manage your favorite channels.
fr-api
Based on [tv-fr-api](https://github.com/amiceli/tv-fr-api) and [xml-tv-fr](https://github.com/racacax/XML-TV-Fr).

## Getting started

[just](https://github.com/casey/just) and [tmux](https://github.com/tmux/tmux) are recommended.

```bash
just start
```

Otherwise:

```bash
npm run dev &
docker compose up -d
```

## Vite HTTPS certificate

Vite serves dev assets over HTTPS (matches the app's `https://localhost`, avoids mixed-content errors). One-time setup:

```bash
brew install mkcert
mkcert -install
mkdir -p certs
mkcert -key-file certs/vite.key.pem -cert-file certs/vite.crt.pem localhost 127.0.0.1 ::1
```

## Testing on the iOS Simulator

The simulator needs to trust the same certificate:

```bash
sudo xcode-select -s /Applications/Xcode.app/Contents/Developer
xcrun simctl keychain booted add-root-cert "$(mkcert -CAROOT)/rootCA.pem"
```
