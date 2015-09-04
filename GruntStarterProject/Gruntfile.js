module.exports = function(grunt) {

  grunt.initConfig({

    postcss: {

      options: {
        processors: [
        ]
      },
      dist: {
        src: 'src/style.css',
        dest: 'dest/style.css'
      }

    }
 
  });

  grunt.loadNpmTasks('grunt-postcss');

};