'use strict';

module.exports = function(grunt) {
    
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json')
        jshint: {
            files: ['Gruntfile.js', 'src/**/*.js'],
            options: {
                    jshintrc: ".jshintrc",
                    jshintignore: ".gitignore"
                }
            },
        watch: {
            files: ['<%=jshint.files %'],
            tasks: ['jshint']
        }
    });
    
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    
    grunt.registerTask('default',['watch']);
    grunt.registerTask('build', ['jshint']);
};