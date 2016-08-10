module.exports = function(grunt) {
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    var path = require('path');

        /* Import Package */
    var pkg = grunt.file.readJSON('package.json'),

        /* Create contributors template */
        contributors = grunt.template.process('<% _.forEach( contributors, function(contributor) { %>\n *   <%= contributor.name %> - <<%= contributor.email %>><% }); %>', {data: {'contributors': pkg.contributors}}),

        /* set bundle name */
        bundleName = pkg.toolkit.namespace + 'BUNDLE';

        /* Setup banner */
        banner ='/*! \n' +
                ' * <%= pkg.name %> - v<%= pkg.version %>\n' +
                ' * -------------------------------------------------------- \n' +
                ' * \n' +
                ' * Contributors: ' + contributors + '\n' +
                ' */ \n';

    grunt.initConfig({
        pkg: pkg,


        jshint: {
            files: ['gruntfile.js', 'src/**/*.js'],
            options: {
                // options here to override JSHint defaults
                globals: {
                    jQuery: true,
                    console: true,
                    document: true
                }
            }
        },

        concat: {
            bundle: {
                src: ['src/**/*.js'],
                dest: 'src/' + bundleName + '.js'
            }
        },

        uglify: {
            options: {
                banner: banner,
                report: 'min'
            },
            snippets: {
                files: [{
                    expand: true,
                    cwd: 'src',
                    src: '*.js',
                    dest: 'dist',
                    ext: '.min.js'
                }]
            },
            bundle: {
                src: 'dist/' + bundleName + '.js',
                dest: 'dist/' + bundleName + '.min.js'
            }
        },

        watch: {
            files: ['<%= jshint.files %>'],
            tasks: ['jshint']
        }

    });

    grunt.registerTask('default', ['jshint', 'newer:uglify:snippets']);
};
