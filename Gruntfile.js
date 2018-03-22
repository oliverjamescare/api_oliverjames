module.exports = function (grunt) {
    require('load-grunt-tasks')(grunt);
    grunt.initConfig({
        
        pkg:grunt.file.readJSON("package.json"),
        concurrent:
        {
            Docs:
            {
                tasks:['watch:docs_api', 'watch:docs_admin'],
                options: 
                {
                    logConcurrentOutput: true
                }
            }
        },
        watch:
        {
            docs_api:
            {
                files:'docs/api/input/*.js',
                tasks: ['apidoc:api']
            },
            docs_admin:
            {
                files:'docs/admin/input/*.js',
                tasks: ['apidoc:admin']
            }
        },
        apidoc: 
        {
            api: {
                src: "docs/api/input/",
                dest: "public/api/",
                template: "docs/template/",
            },
            admin: {
                src: "docs/admin/input/",
                dest: "public/admin/",
                template: "docs/template/",
            }
        }
    });
    grunt.registerTask('Docs',['concurrent:Docs']);
};
