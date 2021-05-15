#!/usr/bin/env bash

_rm_if_exists() {
  if [ -n "$1" ] && [ -e "$1" ]; then
    rm -rf "$1"
  fi
}


OUT_DIR="src/api"

curl http://localhost:8080/rzp-backend/v2/api-docs > ./openapi.spec.json &&\
        openapi-generator generate \
        -g typescript-axios \
        -c ./openapi.config.yaml \
        -i ./openapi.spec.json \
        -o "$OUT_DIR"

_rm_if_exists "$OUT_DIR/git_push.sh"
_rm_if_exists "$OUT_DIR/README.md"
_rm_if_exists "$OUT_DIR/.gitignore"
_rm_if_exists "$OUT_DIR/.npmignore"
_rm_if_exists "$OUT_DIR/.openapi-generator"
_rm_if_exists "$OUT_DIR/index.ts"
