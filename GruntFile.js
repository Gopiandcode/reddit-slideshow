module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        sass:{
            options: {
                sourceMap: true
            },
            dist: {
                files: {
                    "public/css/style.css":"src/scss/style.sass"
                }
            }
        },
        uglify: {
            options: {
            },
            my_target: {
                files: {
                'public/js/multiform.js': ['src/js/multiform.js'],
                'public/js/slideshow.js': ['src/js/slideshow.js'],
                'public/js/jquery.js'   : ['node_modules/jquery/dist/jquery.js'] 
                }
            }
        },
        watch: {
            sass: {
                files: ['src/scss/*.sass'],
                tasks:['sass']
            },
            scripts: {
                files: ['src/js/*.js'],
                tasks: ['uglify']
            }
        }
    });

    require('load-grunt-tasks')(grunt);

   grunt.registerTask('default', ['watch']); 
}