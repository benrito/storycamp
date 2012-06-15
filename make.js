#!/usr/bin/env node

var CSSLINT = './node_modules/csslint/cli.js',
    CSS_DIR = 'css',
    SLICE = Array.prototype.slice;

require('shelljs/make');

function checkCSS() {
  echo('### Linting CSS files');

  var dirs = SLICE.call( arguments ).join( ' ' );

  // see cli.js --list-rules.
  var warnings = [
//    "important",
//    "adjoining-classes",
//    "duplicate-background-images",
//    "qualified-headings",
//    "fallback-colors",
//    "empty-rules",
//    "shorthand",
//    "overqualified-elements",
//    "import",
//    "regex-selectors",
//    "rules-count",
//    "font-sizes",
//    "universal-selector",
//    "unqualified-attributes",
    "zero-units"
  ].join(",");

  var errors = [
    "known-properties",
    "compatible-vendor-prefixes",
    "display-property-grouping",
    "duplicate-properties",
    "errors",
    "gradients",
    "font-faces",
    "floats",
    "vendor-prefix"
  ].join(",");

  exec(CSSLINT + ' --warnings=' + warnings +
                 ' --errors=' + errors +
                 ' --quiet --format=compact' +
                 ' ' + dirs);
}

target.check = function() {
  checkCSS( CSS_DIR );
};
