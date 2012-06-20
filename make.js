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

target.storycamp = function(){
  echo('### Creating complete Storycamp + Butter site in dist/');

  var cwd = pwd();

  // Clean
  rm('-fr', 'dist');

  // Update submodule
  exec('git submodule update --init --recursive');

  // Make sure npm is in butter/ submodule
  cd('butter');
  exec('npm install');

  // Run storycamp target in butter
  exec('node make storycamp');

  // Copy butter dist/ to storycamp dist/
  cp('-R', 'dist/', cwd);

  // Create storycamp static content in dist
  cd(cwd);
  mkdir('dist/storycamp');
  cp('-R', 'css/', 'dist/storycamp');
  cp('-R', 'docs/', 'dist/storycamp');
  cp('-R', 'img/', 'dist/storycamp');
  cp('-R', 'js/', 'dist/storycamp');
  cp('-R', 'pop-images/', 'dist/storycamp');
  cp('-R', 'sounds', 'dist/storycamp');
  cp('cinema*', 'dist/storycamp');
  cp('index.html', 'dist/storycamp');

  // Copy maker site to dist/
  cp('-R', 'maker/*', 'dist');
};
