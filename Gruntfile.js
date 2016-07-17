/**
 * Created by Prudhvi on 5/11/16.
 */
module.exports = function(grunt) {

    grunt.log.writeln('The build is starting..');

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        karma: {
            options: {
                // point all tasks to karma config file
                configFile: 'karma.conf.js'
            },
            unit: {
                // run tests once instead of continuously
                singleRun: true
            }
        },
        connect:{
            server: {
                options: {
                    base: 'app',
                    port: 8000,
                    keepalive: true,
                    app: 'Google chrome',
                    open: {
                        target: 'http://localhost:8000'
                    }
                }
            }
        },
        angularFileLoader:{
            options: {
                scripts: ['app/directives/**/*.js'],
                startTag: 'scripts',
                endTag: 'end-scripts'
            },
            your_target: {
                src: ['app/index.html']
            }
        }
    });

    grunt.registerTask('unitTests', 'default task description', function(){
        grunt.log.writeln('Starting unit tests..');
    });
    // Load the plugin tasks
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-open');
    grunt.loadNpmTasks('grunt-angular-file-loader');

    // Default task(s).
    grunt.registerTask('start', ['unitTests', 'karma', 'connect:server']);

};

//grunt.loadNpmTasks('grunt-contrib-watch');
//watch: {
//    //run unit tests with karma (server needs to be already running)
//    karma: {
//        files: ['app/view*/**/*.js'],
//            tasks: ['karma:unit:run'] //NOTE the :run flag
//    }
//}