/**
 * Config winston logger, settings default config or custom transport here
 * Created by tphuocthai on 3/19/16.
 */

var logConfig = {
  /**
   * Winston log level, possible values:  error, warn, info, verbose, debug, silly
   */
  level: 'debug',
  prettyPrint: true,
  align: false,
  colorize: true

  /**
   * Timestamp format function
   * @returns {*}
   */
  // timestamp: function() {
  //   return new Date().toString();
  // }

  /**
   * Log formatter, this will override other options
   */
  // formatter: function(options) {
  //   return options.timestamp() +' '+ options.level.toUpperCase() +' '+ (undefined !== options.message ? options.message : '') +
  //     (options.meta && Object.keys(options.meta).length ? '\n\t'+ JSON.stringify(options.meta) : '' );
  // }
};

// Setting up logger
['level', 'prettyPrint', 'timestamp', 'align', 'formatter', 'colorize'].forEach(function(name) {
  if (logConfig[name]) {
    server.log.default.transports.console[name] = logConfig[name];
  }
});

module.exports = {};
