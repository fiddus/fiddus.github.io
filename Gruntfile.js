'use strict';

module.exports = function (grunt) {

    grunt.loadNpmTasks('grunt-ftp-deploy');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-usemin');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-svgmin');
    grunt.loadNpmTasks('grunt-asset-injector');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.initConfig({


        clean: {
            build: ['build/']
        },

        useminPrepare: {
            html: ['index.html'],
            options: {
                dest: 'build/'
            }
        },

//        usemin: {
//            html: ['build/index.html'],
//            css: ['build/**/*.css'],
//            js: ['build/**/*.js']
//        },

        imagemin: {
            build: {
                files: [{
                    expand: true,
                    src: 'assets/**/*.{png,jpg,jpeg,gif}',
                    dest: 'build/assets/'
                }]
            }
        },

        svgmin: {
            build: {
                files: [{
                    expand: true,
                    src: 'assets/**/.svg',
                    dest: 'build/'
                }]
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
                        'assets/fonts/**/*',
                        'assets/auraTemplate/3dParty/fontello/font/**/*',
                        'assets/auraTemplate/3dParty/rs-plugin/font/**/*'
                    ],
                    dest: 'build/'
                }, {
                    expand: true,
                    src: '.tmp/img/generated/*',
                    dest: 'build/assets/'
                }]
            },
            style: {
                expand: true,
                src: '**/*.css',
                dest: '.tmp/'
            }
        },

        injector: {
            options: {

            },
            scripts: {
                options: {
//                    transform: function (filePath) {
//                        filePath = filePath.replace('/.tmp/', '');
//                        return '<script src="' + filePath + '"></script>';
//                    },
                    starttag: '<!-- injector:js -->',
                    endtag: '<!-- endinjector -->'
                },
                files: {
                    'index.html' : [
                        '{.tmp,assets}/**/*.js'
                    ]
                }
            },
            css: {
                options: {
                    transform: function (filePath) {
                        filePath = filePath.replace('/.tmp/', '');
                        return '<link rel="stylesheet" href="' + filePath + '">';
                    },
                    starttag: '<!-- injector:css -->',
                    endtag: '<!-- endinjector -->'
                },
                files: {
                    'index.html': [
                        'assets/**/*.css'
                    ]
                }
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
        'imagemin',
        'svgmin',
        'injector',
        'useminPrepare',
        'concat:generated',
        'copy:build',
        'cssmin:generated',
        'uglify:generated',
        'usemin'
    ]);

    grunt.registerTask('deploy', ['build', 'ftp-deploy']);
};
