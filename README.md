storycamp
=========

Storycamp

To check CSS:

1) first install node.js: http://nodejs.org/#download
2) in your storycamp/ directory, run `npm install`

Now csslint is setup in the repo, you can run:

`node make check`

It will print errors and warnings.

To build complete website in dist/, including build submodules for butter, popcorn, npm install build packages, bundle butter/popcorn, package maker/ site, storycamp files, do the following:

`node make storycamp`
