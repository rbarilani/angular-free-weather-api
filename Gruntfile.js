// Generated on 2014-04-19 using generator-angular-component 0.2.3
'use strict';

module.exports = function (grunt) {

    // Configurable paths
    var yoConfig = {
        livereload: 35729,
        src: 'src',
        dist: 'dist',
        pkgname : 'free-weather-api',
        demo : 'demo'
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
        bower: grunt.file.readJSON('bower.json'),
        yo: yoConfig,
        meta: {
            banner: '/**\n' +
                ' * <%= bower.name %>\n' +
                ' * @version v<%= bower.version %> - <%= grunt.template.today("yyyy-mm-dd") %>\n' +
                ' * @link <%= bower.homepage %>\n' +
                ' * @author <%= bower.author.name %> <<%= bower.author.email %>>\n' +
                ' * @license MIT License, http://www.opensource.org/licenses/MIT\n' +
                ' */\n'
        },
        connect: {
            options: {
                hostname: 'localhost',
                port: 9001,
                open: true,
                livereload: '<%= yo.livereload %>'
            },
            server: {
                options: {
                    base: 'demo'
                }
            }
        },
        open : {
            server : {
                path: 'http://<%= connect.options.hostname %>:<%= connect.options.port %>',
                app: 'Google Chrome'
            }
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
            demo : {
                files : ['demo/**/*.{js,html}'],
                options: {
                    livereload: true
                }
            },
            src : {
                files : '<%= jshint.src.src %>',
                tasks: ['jshint:src', 'karma:unit','demo']
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
            dist: {
                src: ['<%= yo.src %>/<%= yo.pkgname %>.js'],
                dest: '<%= yo.dist %>/<%= yo.pkgname %>.js'
            }
        },
        concat: {
            options: {
                stripBanners: true
            },
            dist: {
                src: ['<%= yo.src %>/<%= yo.pkgname %>.js'],
                dest: '<%= yo.dist %>/<%= yo.pkgname %>.js'
            }
        },
        uglify: {
            dist: {
                src: '<%= yo.dist %>/<%= yo.pkgname %>.js',
                dest: '<%= yo.dist %>/<%= yo.pkgname %>.min.js'
            }
        },
        usebanner: {
            dist: {
                options: {
                    position: 'top',
                    banner: '<%= meta.banner %>',
                    linebreak: true
                },
                files: {
                    src: [ 'dist/*.js' ]
                }
            }
        },
        copy : {
            distToDemo : {
                expand : false,
                src: ['<%= yo.dist %>/*.js'],
                dest: 'demo/',
                filter: 'isFile'
            }
        }
    });

    grunt.registerTask('serve' ,[
        'build',
        'demo',
        'connect:server',
        'open:server',
        'watch'
    ]);

    grunt.registerTask('test', [
        'jshint',
        'karma:unit'
    ]);

    grunt.registerTask('release', [
        'test',
        'build',
        'demo'
    ]);

    grunt.registerTask('build', [
        'clean:dist',
        //'ngmin:dist',
        'concat:dist',
        'uglify:dist',
        'usebanner:dist'
    ]);

    grunt.registerTask('demo', [
        'copy:distToDemo'
    ]);

    grunt.registerTask('default', ['test']);

};
