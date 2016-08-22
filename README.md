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

```
#!shell
nitsingh$ tar -cf $(date +'%m-%d-%Y').tar ./node_modules
nitsingh$ tar -xf 08-09-2016.tar
```

# Useful commands #
ln -s ../../node_modules/bootstrap/ ./public/components/
### List down all globally installed packages ###
```
#!shell
nitsingh$ npm list -g --depth=0
