const colors = require('colors');

const NODE_ENV = process.env.NODE_ENV;
const nodeEnvWarning = `NODE environment: ${NODE_ENV}`;
if (NODE_ENV === 'production') {
    console.log(colors.bgRed.bold(nodeEnvWarning));
} else {
    console.log(colors.bgCyan.bold(nodeEnvWarning));
}
