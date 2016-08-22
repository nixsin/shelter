
export default {
    isDevServer: function isDevServer() {
        return Boolean(process.argv.find(v => v.includes('server-dev')));
    }
};
