#!/bin/sh

set -e

echo "Node Version: $(node --version)"
echo "NPM Version: $(npm --version)"
cd scrum-poker/client
yarn
yarn test
