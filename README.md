Xbox Voting
===

Sample code demonstrating an game voting application.

### Key Technologies

* [Gulp Browserify](https://www.npmjs.org/package/gulp-browserify) for project generation
* [React](http://facebook.github.io/react/)
* [Fluxxor](http://fluxxor.com/)
* [Bootstrap](http://getbootstrap.com/)

### Getting Started

First download dependencies.  From the root of the project run (this assumes node and bower are installed):

    npm install
    bower install

Install gulp if not installed:

    npm install --global gulp

Run gulp to start up the server:

    gulp

Or to build the static version of the project:

    export NODE_ENV=production;gulp dist

### TODO

* Add error handling for when gulp chokes on invalid require statements
