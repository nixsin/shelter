var colors = require('colors');

var NODE_ENV = process.env.NODE_ENV;
if (NODE_ENV === 'production'){
    console.log(colors.bgRed.bold('NODE environment: ' + NODE_ENV));
} else {
    console.log(colors.bgCyan.bold('NODE environment: ' + NODE_ENV));
}
