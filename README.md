shelter
===========

# Setup #

# Configurations #
NPM registry management - use [npmrc](https://www.npmjs.com/package/npmrc)

```
#!shell

nitsingh$ npm install -g npmrc
nitsingh$ npmrc -c shelter
Removing old .npmrc (external)
Activating .npmrc "shelter"
nitsingh$ npm config set registry https://registry.npmjs.org/
```

Bower configuration

# Archive modules #
nitsingh$ tar -cf $(date +'%m-%d-%Y').tar ./node_modules