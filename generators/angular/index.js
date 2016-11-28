'use strict';
var fs = require('fs');
var path = require('path');
var util = require('util');
var angularUtils = require('../../util.js');
var wiredep = require('wiredep');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var lodash = require('underscore.string');

module.exports = yeoman.Base.extend({
    constructor: function (args, options) {
        yeoman.Base.apply(this, arguments);
        /*this.argument('appname', {
            type: String,
            required: false
        });
        this.appname = this.appname || path.basename(process.cwd());
        this.appname = lodash.camelize(lodash.slugify(lodash.humanize(this.appname)));
        this.log(this.appname);

        this.scriptAppName = this.appname + angularUtils.appName(this);

        this.log(this.appname);
        args = ['main'];

        if (typeof this.env.options.appPath === 'undefined') {

            this.env.options.appPath = this.options.appPath;

            if (!this.env.options.appPath) {
                try {
                    this.env.options.appPath = require(path.join(process.cwd(), 'bower.json')).appPath;
                } catch (e) {}
            }
            this.env.options.appPath = this.env.options.appPath || 'app';
            this.options.appPath = this.env.options.appPath;
        }

        this.appPath = this.env.options.appPath;
        this.log(this.appname);*/

        this.scriptAppName = this.options.scriptAppName;
        this.appPath = this.options.appPath;
        this.appname = this.options.appname;
        
        this.pkg = require('../../package.json');
        this.sourceRoot(path.join(__dirname, '../templates/common'));

    },

    initializing: function () {
        if (!this.options['skip-welcome-message']) {
            this.log(chalk.yellow('Welcome to the angularjs part of the generator. Just answer some questions\n'));
        }
    },
    copyFiles: function () {
        // ###############################################
        var join = path.join;

        this.destinationRoot(join(this.destinationRoot(), this.appname + '-frontend'));
        this.sourceRoot(join(__dirname, './templates/common/root'));

        this.copy('.editorconfig');
        this.copy('.gitattributes');
        if (!this.env.options.coffee) {
            this.copy('.jscsrc');
        }
        this.copy('.jshintrc');
        this.copy('.yo-rc.json');
        this.copy('gitignore', '.gitignore');
        this.directory('test');

        this.sourceRoot(join(__dirname, './templates/common'));
        var appPath = this.options.appPath;
        var copy = function (dest) {
            this.copy(join('app', dest), join(appPath, dest));
        }.bind(this);

        copy('404.html');
        copy('favicon.ico');
        copy('robots.txt');
        copy('views/main.html');
        this.directory(join('app', 'images'), join(appPath, 'images'));

        // ###############################################
    },
    askForGulp: function () {
        var cb = this.async();

        this.prompt([{
            type: 'confirm',
            name: 'gulp',
            message: 'Would you like to use Gulp (experimental) instead of Grunt?',
            default: false
        }]).then(function (props) {
            this.gulp = props.gulp;
            cb();
        }.bind(this));
    },
    askForStyles: function () {
        var gulp = this.gulp;
        var cb = this.async();

        this.prompt([{
            type: 'confirm',
            name: 'sass',
            message: 'Would you like to use Sass?',
            default: true,
            when: function () {
                return gulp;
            }
        }, {
            type: 'confirm',
            name: 'compass',
            message: 'Would you like to use Sass (with Compass)?',
            default: true,
            when: function () {
                return !gulp;
            }
        }]).then(function (props) {
            this.sass = props.sass;
            this.compass = props.compass;

            cb();
        }.bind(this));
    },
    askForBootstrap: function () {
        var compass = this.compass;
        var gulp = this.gulp;
        var cb = this.async();

        this.prompt([{
            type: 'confirm',
            name: 'bootstrap',
            message: 'Would you like to include Bootstrap?',
            default: true
        }, {
            type: 'confirm',
            name: 'compassBootstrap',
            message: 'Would you like to use the Sass version of Bootstrap?',
            default: true,
            when: function (props) {
                return !gulp && (props.bootstrap && compass);
            }
        }]).then(function (props) {
            this.bootstrap = props.bootstrap;
            this.compassBootstrap = props.compassBootstrap;

            cb();
        }.bind(this));
    },
    askForModules: function () {
        var cb = this.async();

        var prompts = [{
            type: 'checkbox',
            name: 'modules',
            message: 'Which modules would you like to include?',
            choices: [
                {
                    value: 'animateModule',
                    name: 'angular-animate.js',
                    checked: true
                }, {
                    value: 'ariaModule',
                    name: 'angular-aria.js',
                    checked: false
                }, {
                    value: 'cookiesModule',
                    name: 'angular-cookies.js',
                    checked: true
                }, {
                    value: 'resourceModule',
                    name: 'angular-resource.js',
                    checked: true
                }, {
                    value: 'messagesModule',
                    name: 'angular-messages.js',
                    checked: false
                }, {
                    value: 'routeModule',
                    name: 'angular-route.js',
                    checked: true
                }, {
                    value: 'sanitizeModule',
                    name: 'angular-sanitize.js',
                    checked: true
                }, {
                    value: 'touchModule',
                    name: 'angular-touch.js',
                    checked: true
                }
            ]
        }];

        this.prompt(prompts).then(function (props) {
            var hasMod = function (mod) {
                return props.modules.indexOf(mod) !== -1;
            };
            this.animateModule = hasMod('animateModule');
            this.ariaModule = hasMod('ariaModule');
            this.cookiesModule = hasMod('cookiesModule');
            this.messagesModule = hasMod('messagesModule');
            this.resourceModule = hasMod('resourceModule');
            this.routeModule = hasMod('routeModule');
            this.sanitizeModule = hasMod('sanitizeModule');
            this.touchModule = hasMod('touchModule');

            var angMods = [];

            if (this.animateModule) {
                angMods.push("'ngAnimate'");
            }

            if (this.ariaModule) {
                angMods.push("'ngAria'");
            }

            if (this.cookiesModule) {
                angMods.push("'ngCookies'");
            }

            if (this.messagesModule) {
                angMods.push("'ngMessages'");
            }

            if (this.resourceModule) {
                angMods.push("'ngResource'");
            }

            if (this.routeModule) {
                angMods.push("'ngRoute'");
                this.env.options.ngRoute = true;
            }

            if (this.sanitizeModule) {
                angMods.push("'ngSanitize'");
            }

            if (this.touchModule) {
                angMods.push("'ngTouch'");
            }

            if (angMods.length) {
                this.env.options.angularDeps = '\n    ' + angMods.join(',\n    ') + '\n  ';
            }

            cb();
        }.bind(this));
    },
    readIndex: function () {
        this.engine = require('ejs').render;
        this.ngRoute = this.env.options.ngRoute;
        this.indexFile = this.engine(this.read('app/index.html'), this);
    },
    bootstrapFiles: function () {
        var sass = this.compass || this.sass;
        var cssFile = 'styles/main.' + (sass ? 's' : '') + 'css';
        this.copy(
            path.join('app', cssFile),
            path.join(this.appPath, cssFile)
        );
    },
    appJs: function () {
        this.indexFile = this.appendFiles({
            html: this.indexFile,
            fileType: 'js',
            optimizedPath: 'scripts/scripts.js',
            sourceFileList: ['scripts/app.js', 'scripts/controllers/main.js'],
            searchPath: ['.tmp', this.appPath]
        });
    },
    createIndexHtml: function () {
        this.indexFile = this.indexFile.replace(/&apos;/g, "'");
        this.write(path.join(this.appPath, 'index.html'), this.indexFile);
    },
    packageFiles: function () {
        this.lodash = lodash;
        this.coffee = this.env.options.coffee;
        this.typescript = this.env.options.typescript;
        this.template('root/_bower.json', 'bower.json');
        this.template('root/_bowerrc', '.bowerrc');
        this.template('root/_package.json', 'package.json');
        if (this.gulp) {
            this.template('root/_gulpfile.js', 'gulpfile.js');
        } else {
            this.template('root/_Gruntfile.js', 'Gruntfile.js');
        }
        if (this.typescript) {
            this.template('root/_tsd.json', 'tsd.json');
        }
        this.template('root/README.md', 'README.md');
    },
    _injectDependencies: function () {
        var taskRunner = this.gulp ? 'gulp' : 'grunt';
        if (this.options['skip-install']) {
            this.log(
                'After running `npm install & bower install`, inject your front end dependencies' +
                '\ninto your source code by running:' +
                '\n' +
                '\n' + chalk.yellow.bold(taskRunner + ' wiredep')
            );
        } else {
            this.spawnCommand(taskRunner, ['wiredep']);
        }
    },

    //    writing: function () {
    //        this.fs.copy(
    //            this.templatePath('dummyfile.txt'),
    //            this.destinationPath('dummyfile.txt')
    //        );
    //    },
    //
    install: function () {
        if (!this.options['skip-install']) {
            this.installDependencies();
        }
    }
});



//var Generator = module.exports = function Generator(args, options) {
//
//    this.hookFor('angular:common', {
//        args: args
//    });
//
//    this.hookFor('angular:main', {
//        args: args
//    });
//
//    this.hookFor('angular:controller', {
//        args: args
//    });
//
//    this.on('end', function () {
//        var jsExt = this.options.coffee ? 'coffee' : 'js';
//
//        var bowerComments = [
//      'bower:js',
//      'endbower'
//    ];
//        if (this.options.coffee) {
//            bowerComments.push('bower:coffee');
//            bowerComments.push('endbower');
//        }
//
//        this.invoke('karma:app', {
//            options: {
//                'skip-install': this.options['skip-install'],
//                'base-path': '../',
//                'coffee': this.options.coffee,
//                'travis': true,
//                'files-comments': bowerComments.join(','),
//                'app-files': 'app/scripts/**/*.' + jsExt,
//                'test-files': [
//          'test/mock/**/*.' + jsExt,
//          'test/spec/**/*.' + jsExt
//        ].join(','),
//                'bower-components-path': 'bower_components'
//            }
//        });
//
//        this.installDependencies({
//            skipInstall: this.options['skip-install'],
//            skipMessage: this.options['skip-message'],
//            callback: this._injectDependencies.bind(this)
//        });
//
//        if (this.env.options.ngRoute) {
//            this.invoke('angular:route', {
//                args: ['about']
//            });
//        }
//    });
//
//    this.pkg = require('../../package.json');
//    this.sourceRoot(path.join(__dirname, '../templates/common'));
//};