module.exports = function (grunt) {
    require('load-grunt-tasks')(grunt);
    grunt.initConfig({
        
        pkg:grunt.file.readJSON("package.json"),
        concurrent:
        {
            Docs:
            {
                tasks:['watch:docs'],
                options: 
                {
                    logConcurrentOutput: true
                }
            }
        },
        watch:
        {
            docs:
            {
                files:'docs/input/*.js',
                tasks: ['apidoc:app']
            }
        },
        apidoc: 
        {
            app: {
                src: "docs/input/",
                dest: "public/api/",
                template: "docs/template/",
            }
        }
    });
    grunt.registerTask('Docs',['concurrent:Docs']);
};
