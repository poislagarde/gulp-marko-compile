# IMPORTANT

**There's no point in using this plugin anymore.**

Marko has grown a lot since I first published this gulp plugin, and now they support both run time compilation (via a require extension) and build time compilation (via a CLI). See here for more info: http://markojs.com/docs/installing/#on-the-server.

If you want to pre compile your marko files in a gulp build, you could just install `marko-cli` as a dev dependency and do this (with gulp 4):

```javascript
const { spawn } = require('child_process')
gulp.task('marko', () => spawn('marko', ['compile', 'hello.marko'], { stdio: 'inherit' }))
```

# gulp-marko-compile

[![npm](https://nodei.co/npm/gulp-marko-compile.svg?downloads=true)](https://nodei.co/npm/gulp-marko-compile/)

> Compile Marko templates as part of your Gulp build process.

## Usage

```js
var marko = require('gulp-marko-compile');

gulp.task('marko', function() {
  gulp.src('./src/*.marko')
    .pipe(marko({preserveWhitespace: true}).on('error', gutil.log))
    .pipe(gulp.dest('./public/'))
});
```

### Error handling

gulp-marko-compile will emit an error for cases such as invalid Marko syntax. If uncaught, the error will crash gulp.

You will need to attach a listener (i.e. `.on('error')`) for the error event emitted by gulp-marko-compile:

```javascript
var markoStream = marko({preserveWhitespace: true});

// Attach listener
markoStream.on('error', function(err) {});
```

In addition, you may utilize [gulp-util](https://github.com/wearefractal/gulp-util)'s logging function:

```javascript
var gutil = require('gulp-util');

// ...

var markoStream = marko({preserveWhitespace: true});

// Attach listener
markoStream.on('error', gutil.log);

```

Since `.on(...)` returns `this`, you can make you can compact it as inline code:

```javascript

gulp.src('./src/*.marko')
  .pipe(marko({preserveWhitespace: true}).on('error', gutil.log))
  // ...
```

## Options

The options object supports the same [options](http://markojs.com/docs/marko/javascript-api/#require'markocompiler') as the standard Marko compiler

## TODO

Fully comply with [Gulp plugin guidelines](https://github.com/gulpjs/gulp/blob/master/docs/writing-a-plugin/guidelines.md) AKA write some tests

## License

MIT License
