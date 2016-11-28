'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var mkdirp = require('mkdirp');

var SpringGenerator = module.exports = function SpringGenerator(args, options, config) {
    yeoman.Base.apply(this, arguments);
};

util.inherits(SpringGenerator, yeoman.Base);

SpringGenerator.prototype.askFor = function askFor() {
    var cb = this.async();

    if (!this.options['skip-welcome-message']) {
        this.log(`  .   ____          _            __ _ _\n /\\\\ / ___'_ __ _ _(_)_ __  __ _ \\ \\ \\ \\\n( ( )\\___ | '_ | '_| | '_ \\/ _\` | \\ \\ \\ \\\n \\\\/  ___)| |_)| | | | | || (_| |  ) ) ) )\n  '  |____| .__|_| |_|_| |_\\__, | / / / /\n =========|_|==============|___/=/_/_/_/`);
        this.log(chalk.yellow('Welcome to the spring part of the generator. Just answer some questions\n'));
    }

    var prompts = [
        {
            type: 'string',
            name: 'bootVersion',
            message: 'Enter Spring Boot version:',
            default: '1.4.2.RELEASE'
        }, {
            type: 'string',
            name: 'packageName',
            message: 'Enter default package name:',
            default: 'com.myapp'
        }, {
            type: 'string',
            name: 'baseName',
            message: 'Enter base name of app / artifactId:',
            default: this.options.appname
        }, {
            type: 'string',
            name: 'baseDesc',
            message: 'Enter description of app:',
            default: 'This is new the new ' + this.options.appname
        }, {
            type: 'string',
            name: 'javaVersion',
            message: 'Enter Java version:',
            default: '1.8'
        },
        /* {
                    type: 'checkbox',
                    name: 'packagingType',
                    message: 'Package type:',
                    choices: [
                        {
                            name: 'Jar',
                            value: 'jar'
                        }, {
                            name: 'War',
                            value: 'war'
                        }
                    ]
                },
        {
            type: 'checkbox',
            name: 'buildTool',
            message: 'Select build tool:',
            choices: [
                {
                    name: 'Gradle',
                    value: 'gradle'
                }, {
                    name: 'Maven',
                    value: 'maven'
                }
            ]
        },*/
        {
            type: 'checkbox',
            name: 'coreWeb',
            message: 'Select Core/Web Dependencies:',
            pageSize: 20,
            choices: [
                {
                    name: 'Web',
                    value: 'web',
                    checked: true
                }, {
                    name: 'Jetty (Tomcat will be uninstalled)',
                    value: 'jetty'
                }, {
                    name: 'Security',
                    value: 'security'
                }, {
                    name: 'AOP',
                    value: 'aop'
                }, {
                    name: 'Websocket',
                    value: 'websocket'
                }, {
                    name: 'Jersey (JAX-RS)',
                    value: 'jersey'
                }, {
                    name: 'Rest Repositories',
                    value: 'rest'
                }, {
                    name: 'Hypermedia (HATEOAS)',
                    value: 'hateoas'
                }, {
                    name: 'Mobile',
                    value: 'mobile'
                }, {
                    name: 'REST Docs',
                    value: 'restdocs'
                }
            ]
        }, {
            type: 'checkbox',
            name: 'templates',
            message: 'Select Template Engine:',
            pageSize: 20,
            choices: [
                {
                    name: 'Thymeleaf',
                    value: 'thymeleaf'
                }, {
                    name: 'Groovy Templates',
                    value: 'gtemplates'
                }, {
                    name: 'Mustache',
                    value: 'mustache'
                }
            ]
        }, {
            type: 'checkbox',
            name: 'data',
            message: 'Select Data support:',
            pageSize: 20,
            choices: [
                {
                    name: 'Jdbc',
                    value: 'jdbc'
                }, {
                    name: 'JPA',
                    value: 'jpa'
                }, {
                    name: 'MongoDB',
                    value: 'mongodb'
                }, {
                    name: 'Redis',
                    value: 'redis'
                }, {
                    name: 'Solr',
                    value: 'solr'
                }, {
                    name: 'Elasticsearch',
                    value: 'elasticsearch'
                }
            ]
        }, {
            type: 'checkbox',
            name: 'database',
            message: 'Select Database support:',
            pageSize: 20,
            choices: [
                {
                    name: 'H2',
                    value: 'h2'
                }, {
                    name: 'HSQLDB',
                    value: 'hsqldb'
                }, {
                    name: 'Apache Derby',
                    value: 'derby'
                }, {
                    name: 'MySQL',
                    value: 'mysql'
                }, {
                    name: 'PostgreSQL',
                    value: 'postgresql'
                }
            ]
        }, {
            type: 'checkbox',
            name: 'cloud',
            message: 'Select Spring Cloud support:',
            pageSize: 20,
            choices: [
                {
                    name: 'Cloud Connectors',
                    value: 'connectors'
                }, {
                    name: 'Cloud Bootstrap',
                    value: 'bootstrap'
                }, {
                    name: 'Config Client',
                    value: 'configClient'
                }, {
                    name: 'Config Server',
                    value: 'configServer'
                }, {
                    name: 'Eureka',
                    value: 'eureka'
                }, {
                    name: 'Eureka Server',
                    value: 'eurekaServer'
                }, {
                    name: 'Feign',
                    value: 'feign'
                }, {
                    name: 'Hystrix',
                    value: 'hystrix'
                }, {
                    name: 'Hystrix Dashboard',
                    value: 'hystrixDashboard'
                }, {
                    name: 'OAuth2',
                    value: 'oauth2'
                }, {
                    name: 'Ribbon',
                    value: 'ribbon'
                }, {
                    name: 'Turbine',
                    value: 'turbine'
                }, {
                    name: 'Turbine AMQP',
                    value: 'turbineAmqp'
                }, {
                    name: 'Zuul',
                    value: 'zuul'
                }, {
                    name: 'AWS',
                    value: 'aws'
                }, {
                    name: 'AWS JDBC',
                    value: 'awsJdbc'
                }, {
                    name: 'AWS Messaging',
                    value: 'awsMessaging'
                }, {
                    name: 'Cloud Bus AMQP',
                    value: 'cloudBus'
                }, {
                    name: 'Cloud Security',
                    value: 'cloudSecurity'
                }
            ]
        }, {
            type: 'checkbox',
            name: 'io',
            message: 'Select I/O support:',
            choices: [
                {
                    name: 'Batch',
                    value: 'batch'
                }, {
                    name: 'Integration',
                    value: 'integration'
                }, {
                    name: 'JMS (HornetQ)',
                    value: 'jms'
                }, {
                    name: 'AMQP',
                    value: 'amqp'
                }, {
                    name: 'Mail',
                    value: 'mail'
                }
            ]
        }, {
            type: 'checkbox',
            name: 'social',
            message: 'Select Social APIs:',
            choices: [
                {
                    name: 'Facebook',
                    value: 'facebook'
                }, {
                    name: 'LinkedIn',
                    value: 'linkedin'
                }, {
                    name: 'Twitter',
                    value: 'twitter'
                }
            ]
        }, {
            type: 'checkbox',
            name: 'ops',
            message: 'Select OPS tools:',
            choices: [
                {
                    name: 'Actuator',
                    value: 'actuator'
                }, {
                    name: 'Remote Shell',
                    value: 'remoteshell'
                }
            ]
        }, {
            type: 'confirm',
            name: 'useSpock',
            message: 'Use Spock?',
            default: true
        }, {
            type: 'string',
            name: 'groovyVersion',
            message: 'Enter Groovy version:',
            default: '2.4.4'
        }
    ];

    this.prompt(prompts).then(function (props) {
        this.bootVersion = props.bootVersion;
        this.packageName = props.packageName;
        this.baseName = props.baseName;
        this.baseDesc = props.baseDesc;
        this.javaVersion = props.javaVersion;
        this.packagingType = props.packagingType;
        this.coreWeb = props.coreWeb;
        this.templates = props.templates;
        this.data = props.data;
        this.database = props.database;
        this.cloud = props.cloud;
        this.io = props.io;
        this.social = props.social;
        this.ops = props.ops;
        this.useSpock = props.useSpock;
        this.groovyVersion = props.groovyVersion;
        this.buildTool = 'maven'; // props.buildTool;

        // Packaging Type
        /*var hasPackagingType = function (packagingTypeStarter) {
            return props.packagingType.indexOf(packagingTypeStarter) !== -1;
        };*/
        this.jar = false // hasPackagingType('jar');
        this.war = true; // hasPackagingType('war');

        // Core/Web
        var hasCoreWeb = function (coreWebStarter) {
            return props.coreWeb.indexOf(coreWebStarter) !== -1;
        };
        this.web = hasCoreWeb('web');
        this.jetty = hasCoreWeb('jetty');
        this.security = hasCoreWeb('security');
        this.aop = hasCoreWeb('aop');
        this.websocket = hasCoreWeb('websocket');
        this.jersey = hasCoreWeb('jersey');
        this.rest = hasCoreWeb('rest');
        this.hateoas = hasCoreWeb('hateoas');
        this.mobile = hasCoreWeb('mobile');
        this.restdocs = hasCoreWeb('restdocs');

        // Template Engines
        var hasTemplate = function (templateStarter) {
            return props.templates.indexOf(templateStarter) !== -1;
        };
        this.thymeleaf = hasTemplate('thymeleaf');
        this.gtemplates = hasTemplate('gtemplates');
        this.mustache = hasTemplate('mustache');

        // Spring Data
        var hasData = function (dataStarter) {
            return props.data.indexOf(dataStarter) !== -1;
        };
        this.jdbc = hasData('jdbc');
        this.jpa = hasData('jpa');
        this.mongodb = hasData('mongodb');
        this.redis = hasData('redis');
        this.gemfire = hasData('gemfire');
        this.solr = hasData('solr');
        this.elasticsearch = hasData('elasticsearch');

        // Databases
        var hasDatabase = function (databaseStarter) {
            return props.database.indexOf(databaseStarter) !== -1;
        };
        this.h2 = hasDatabase('h2');
        this.hsqldb = hasDatabase('hsqldb');
        this.derby = hasDatabase('derby');
        this.mysql = hasDatabase('mysql');
        this.postgresql = hasDatabase('postgresql');

        // Spring Cloud
        prompts.push({
            type: 'string',
            name: 'usesCloud',
            message: 'usesCloud',
            default: false
        });
        var hasCloud = function (cloudStarter) {
            return props.cloud.indexOf(cloudStarter) !== -1;
        };
        this.connectors = hasCloud('connectors');
        this.bootstrap = hasCloud('bootstrap');
        this.configClient = hasCloud('configClient');
        this.configServer = hasCloud('configServer');
        this.eureka = hasCloud('eureka');
        this.eurekaServer = hasCloud('eurekaServer');
        this.feign = hasCloud('feign');
        this.hystrix = hasCloud('hystrix');
        this.hystrixDashboard = hasCloud('hystrixDashboard');
        this.oauth2 = hasCloud('oauth2');
        this.ribbon = hasCloud('ribbon');
        this.turbine = hasCloud('turbine');
        this.turbineAmqp = hasCloud('turbineAmqp');
        this.zuul = hasCloud('zuul');
        this.aws = hasCloud('aws');
        this.awsJdbc = hasCloud('awsJdbc');
        this.awsMessaging = hasCloud('awsMessaging');
        this.cloudBus = hasCloud('cloudBus');
        this.cloudSecurity = hasCloud('cloudSecurity');
        this.usesCloud = props.cloud.length > 0;

        // I/O
        var hasIO = function (ioStarter) {
            return props.io.indexOf(ioStarter) !== -1;
        };
        this.batch = hasIO('batch');
        this.integration = hasIO('integration');
        this.jms = hasIO('jms');
        this.amqp = hasIO('amqp');
        this.mail = hasIO('mail');

        // Social
        var hasSocial = function (socialStarter) {
            return props.social.indexOf(socialStarter) !== -1;
        };
        this.facebook = hasSocial('facebook');
        this.linkedin = hasSocial('linkedin');
        this.twitter = hasSocial('twitter');

        // OPS
        var hasOps = function (opsStarter) {
            return props.ops.indexOf(opsStarter) !== -1;
        };
        this.actuator = hasOps('actuator');
        this.remoteshell = hasOps('remoteshell');

        cb();
    }.bind(this));
};

SpringGenerator.prototype.app = function app() {
    if (this.destinationRoot().endsWith('-frontend')) {
        this.destinationRoot(path.join(this.destinationRoot(), '../'));
    }
    var rootFolder = this.options.appname + '-backend';
    var packageFolder = this.packageName.replace(/\./g, '/');
    var srcDir = rootFolder + '/src/main/java/' + packageFolder;
    var resourceDir = rootFolder + '/src/main/resources';
    mkdirp(srcDir);
    mkdirp(srcDir + '/controller');

    /*if ('gradle' === this.buildTool[0]) {
        this.template('build.gradle', 'build.gradle');
    }*/
    //if ('maven' === this.buildTool[0]) {
    this.template('pom.xml', rootFolder + '/pom.xml');
    this.template('basepom.xml', 'pom.xml');
    this.template('frontendpom.xml', this.options.appname + '-frontend/pom.xml');
    //}

    this.template('Application.java', srcDir + '/Application.java');
    this.template('BasicController.java', srcDir + '/controller/BasicController.java');

    if (this.useSpock) {
        var testDir = rootFolder + '/src/test/groovy/' + packageFolder;
        mkdirp(testDir);
    }
    if (this.web || this.thymeleaf || this.gtemplates || this.mustache) {
        mkdirp(rootFolder + '/src/main/resources');
        mkdirp(rootFolder + '/src/main/resources/static');
        mkdirp(rootFolder + '/src/main/resources/templates');
        this.template('application.yml', resourceDir + '/application.yml');
    }
    this.config.set('packageName', this.packageName);
    this.config.set('packageFolder', packageFolder);
};

SpringGenerator.prototype.projectfiles = function projectfiles() {};