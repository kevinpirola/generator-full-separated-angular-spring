'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('generator-full-separated-angular-spring:app', function () {
    before(function () {
        var deps = [
          [helpers.createDummyGenerator(), 'full-separated-angular-spring:angular'],
            [helpers.createDummyGenerator(), 'full-separated-angular-spring:spring']
        ];
        return helpers.run(path.join(__dirname, '../generators/app'))
            .withGenerators(deps)
            .withArguments(['app-name']);
    });

    it('creates the basic gitignore file', function () {
        assert.file(['.gitignore']);
    });
});