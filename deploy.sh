#!/usr/bin/env sh

set -e

npm run build

cd dist

git init
git add -A
git commit -m 'deploy'

git push -f https://github.com/NTUT-NPC/neo-library-frontend.git master:gh-pages

cd -