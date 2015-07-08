
module.exports = function(grunt) {
    
    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        
        jshint: {
            all: { 
                src: ["src/**/*.js"
            ],
            options: {
                    jshintrc: ".jshintrc",
                    jshintignore: ".gitignore"
                }
                }
            },
        
    });
    
    grunt.loadNpmTasks("grunt-contrib-jshint");
    
    grunt.registerTask("default",["jshint"]);
  
};
