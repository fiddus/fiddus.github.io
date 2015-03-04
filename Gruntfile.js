'use strict';

module.exports = function (grunt) {

    grunt.loadNpmTasks('grunt-ftp-deploy');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-usemin');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.initConfig({


        clean: {
            build: ['build/']
        },

        useminPrepare: {
            html: 'index.html',
            options: {
                dest: 'build'
            }
        },

        copy: {
            build: {
                files: [{
                    expand: true,
                    dot: true,
                    src: [
                        'index.html',
                        '.htaccess',
                        '*.png',
                        '*.ico',
                        'manifest.json'
                    ],
                    dest: 'build/'
                }, {
                    expand: true,
                    src: '.tmp/img/generated/*',
                    dest: 'build/assets/'
                }, {
                    expand: true,
                    flatten: true,
                    src: [
                        'assets/fonts/**/*'
                    ],
                    dest: 'build/fonts/'
                }, {
                    expand: true,
                    flatten: true,
                    src: [
                        'assets/auraTemplate/3dParty/fontello/font/**/*',
                        'assets/auraTemplate/3dParty/rs-plugin/font/**/*'
                    ],
                    dest: 'build/font/'
                }]
            }
        },

        usemin: {
            html: 'build/**/*.html',
            css: 'build/**/*.css',
            js: 'build/**/*.js'
        },

        imagemin: {
            build: {
                options: {
                    optimizationLevel: 7
                },
                files: [{
                    expand: true,
                    src: 'assets/**/*.{png,jpg,jpeg,gif}',
                    dest: 'build/'
                }]
            }
        },

        uglify: {
            build: {
                options: {
                    mangle: true,
                    compress: true,
                    preserveComments: false
                },
                files: [{
                    expand: true,
                    src: 'assets/**/*.js',
                    dest: 'build'
                }]
            }
        },

        'ftp-deploy': {
            build: {
                auth: {
                    host: 'ftp.fiddus.com.br',
                    port: 21,
                    authKey: 'key1'
                },
                src: 'build',
                dest: '/public_html/test'
            }
        }
    });

    grunt.registerTask('build', [
        'clean',
        'useminPrepare',
        'imagemin',
        'concat:generated',
        'cssmin:generated',
//        'uglify:generated',
        'copy',
        'uglify',
        'usemin'
    ]);

    grunt.registerTask('deploy', ['build', 'ftp-deploy']);
};
