'use strict';
var fs = require('fs');
var path = require('path');
var util = require('util');
var angularUtils = require('./util.js');
var wiredep = require('wiredep');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var lodash = require('underscore.string');

module.exports = yeoman.Base.extend({
    constructor: function (args, options) {
        yeoman.Base.apply(this, arguments);
        this.argument('appname', {
            type: String,
            required: false
        });
        this.appname = this.appname || path.basename(process.cwd());
        this.appname = lodash.camelize(lodash.slugify(lodash.humanize(this.appname)));

        this.scriptAppName = this.appname + angularUtils.appName(this);

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

        this.pkg = require('../../package.json');
        this.sourceRoot(path.join(__dirname, '../templates/common'));

    },

    initializing: function () {
        if (!this.options['skip-welcome-message']) {
            this.log(yosay(
                'Welcome to the amazing ' + chalk.yellow('full separated\nangular spring') + ' generator!'
            ));
            this.log(chalk.yellow('This generator is based on the official yeoman generator-angular and davetownsend\'s generator-spring.\nBeta'));
        }
    },

    genericFiles: function () {
        this.sourceRoot(path.join(__dirname, './templates/'));
        this.copy('gitignore', '.gitignore');
    },

    callSub: function () {
        this.composeWith('full-separated-angular-spring:angular', {
            options: {
                appname: this.appname,
                'skip-welcome-message': this.options['skip-welcome-message'],
                appPath: this.appPath,
                scriptAppName: this.scriptAppName,
                'skip-install': this.options['skip-install']
            }
        });
        this.composeWith('full-separated-angular-spring:spring', {
            options: {
                appname: this.appname,
                'skip-welcome-message': this.options['skip-welcome-message']
            }
        });
    }
});