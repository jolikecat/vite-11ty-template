const config = require('./config-schema');

/**
 * For available configurations, see: config-schema.js
 */
config.load({
	publicPath: '',
});

config.validate({
	allowed: 'strict',
});

module.exports = config;
