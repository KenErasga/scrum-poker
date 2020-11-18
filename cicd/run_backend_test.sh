#!/bin/sh

set -e

echo "Node Version: $(node --version)"
echo "NPM Version: $(npm --version)"
cd scrum-poker/server
npm i
npm test
