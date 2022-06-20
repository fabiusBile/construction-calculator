let target = 'electron-renderer';
console.log(`craco.config.js: setting webpack target to: ${target}`);

module.exports = {
    webpack: {
        configure: {
            target: target
        }
    }
};