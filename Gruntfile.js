// Generated on 2014-04-19 using generator-angular-component 0.2.3
'use strict';

module.exports = function (grunt) {

    // Configurable paths
    var yoConfig = {
        livereload: 35729,
        src: 'src',
        dist: 'dist'
    };

    // Livereload setup
    var lrSnippet = require('connect-livereload')({port: yoConfig.livereload});
    var mountFolder = function (connect, dir) {
        return connect.static(require('path').resolve(dir));
    };

    // Load all grunt tasks
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    // Project configuration
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        yo: yoConfig,
        meta: {
            banner: '/**\n' +
                ' * <%= pkg.name %>\n' +
                ' * @version v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>\n' +
                ' * @link <%= pkg.homepage %>\n' +
                ' * @author <%= pkg.author.name %> <<%= pkg.author.email %>>\n' +
                ' * @license MIT License, http://www.opensource.org/licenses/MIT\n' +
                ' */\n'
        },
        clean: {
            dist: {
                files: [
                    {
                        dot: true,
                        src: [
                            '.tmp',
                            '<%= yo.dist %>/*',
                            '!<%= yo.dist %>/.git*'
                        ]
                    }
                ]
            }
        },
        watch: {
            gruntfile: {
                files: '<%= jshint.gruntfile.src %>',
                tasks: ['jshint:gruntfile']
            },
            test: {
                files: '<%= jshint.test.src %>',
                tasks: ['jshint:test', 'karma:unit']
            }
        },
        jshint: {
            gruntfile: {
                options: {
                    jshintrc: '.jshintrc'
                },
                src: 'Gruntfile.js'
            },
            src: {
                options: {
                    jshintrc: '.jshintrc'
                },
                src: ['<%= yo.src %>/{,*/}*.js','!<%= yo.src %>/{,*/}*.spec.js']
            },
            test: {
                options: {
                    jshintrc: '.jshintrc-test'
                },
                src: ['<%= yo.src %>/**/*.spec.js']
            }
        },
        karma: {
            options: {
                configFile: 'karma.conf.js',
                browsers: ['PhantomJS']
            },
            unit: {
                singleRun: true
            }
        },
        ngmin: {
            options: {
                banner: '<%= meta.banner %>'
            },
            dist: {
                src: ['<%= yo.src %>/<%= pkg.name %>.js'],
                dest: '<%= yo.dist %>/<%= pkg.name %>.js'
            }
        },
        concat: {
            options: {
                banner: '<%= meta.banner %>',
                stripBanners: true
            },
            dist: {
                src: ['<%= yo.src %>/<%= pkg.name %>.js'],
                dest: '<%= yo.dist %>/<%= pkg.name %>.js'
            }
        },
        uglify: {
            options: {
                banner: '<%= meta.banner %>'
            },
            dist: {
                src: '<%= concat.dist.dest %>',
                dest: '<%= yo.dist %>/<%= pkg.name %>.min.js'
            }
        },
        copy : {
            dist : {
                expand : false, src: ['dist/*.js'], dest: 'demo/', filter: 'isFile'
            }
        }
    });

    grunt.registerTask('test', [
        'jshint',
        'karma:unit'
    ]);

    grunt.registerTask('build', [
        'clean:dist',
        'ngmin:dist',
        'uglify:dist'
    ]);

    grunt.registerTask('updateDemo', [
        'build',
        'copy:dist'
    ]);

    grunt.registerTask('default', ['test']);

};