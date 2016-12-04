# generator-full-separated-angular-spring [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url]
> A full separated project that features AngularJS as frontend framework and Spring as Java backend framework

## Installation

First, install [Yeoman](http://yeoman.io) and generator-full-separated-angular-spring using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).

```bash
npm install -g yo
npm install -g generator-full-separated-angular-spring
```

Then generate your new project:

```bash
yo full-separated-angular-spring [<project-name> | --skip-welcome-message | --skip-install]
```

## Aim
The reason why I began developing this generator is because I found out the need to have a well-defined, precisely structured base project where to start, that don't take more than few minutes to setup.
The second reason is because I had the need to completely separate the environments in two different servers, one running with high performances for the backend, the second in a standard web-hosting.

This lead the way to a safer environment because you are able to isolate the backend in a secure server at will.

## Getting To The full separated generator

The best way I found to scaffhold a new project is using Yeoman and its generators, so I decided to create one myself for my purpose.
My generator is based upon the official generator-angular and davetownsend's generator-spring.
Initially the two generators will be exactly the same as the original, but I've planned to develop a new version better suited for my idea.
The project is newborn and is subject to extreme changes, but since is not a direct dependency you can trust it to be used in a will-be-in-production project. By the way everything that is published is always of some value to the user.
By now the generator creates a spring-based java structure and an angularjs project both connected with maven, the angular project based upon Grunt or Gulp and Bower. A parent pom is generated and two connected poms are linked to it.
When built each module will generate a deployable war ready to go.

There are some examples pre-created in the project to guide the user in using the new structure.

This readme is also subject to updates. For any information please mail me, if any bug is found just open an issue on GitHub.

## License

MIT © [Gianmarco Laggia](@glaggia)


[npm-image]: https://badge.fury.io/js/generator-full-separated-angular-spring.svg
[npm-url]: https://npmjs.org/package/generator-full-separated-angular-spring
[travis-image]: https://travis-ci.org/kevinpirola/generator-full-separated-angular-spring.svg?branch=master
[travis-url]: https://travis-ci.org/kevinpirola/generator-full-separated-angular-spring
[daviddm-image]: https://david-dm.org/kevinpirola/generator-full-separated-angular-spring.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/kevinpirola/generator-full-separated-angular-spring
