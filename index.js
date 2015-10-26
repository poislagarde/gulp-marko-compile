'use strict'

const PLUGIN_NAME = 'gulp-marko-compile';

/**
 * Dependencies
 */
const gutil = require('gulp-util');
const through = require('through2');
const compiler = require('marko/compiler');

const PluginError = gutil.PluginError;

/**
 * Export the plugin
 */
module.exports = function(options) {
  return through.obj(function(file, enc, cb) {

    // empty file
    if (file.isNull()) {
      return cb(null, file);
    }

    // stream
    if (file.isStream()) {
      return cb(new PluginError(PLUGIN_NAME, 'Streaming not supported'));
    }

    let data;
    let src = file.contents.toString('utf8');
    let path = file.path;
    let dest = gutil.replaceExtension(path, '.marko.js');

    try {
      data = compiler.compile(src, path, options);
    } catch (err) {
      return cb(new PluginError(PLUGIN_NAME, err));
    }

    file.contents = new Buffer(data);
    file.path = dest;

    cb(null, file);

  });
};
