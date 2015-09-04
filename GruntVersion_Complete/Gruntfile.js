module.exports = function(grunt) {

  grunt.initConfig({

    postcss: {

      options: {
        processors: [
          require('postcss-myplugin')({
            fontstacks: {
              // 'Extra Stack': '"Extra Stack", "Moar Fonts", Extra, serif',
              // 'Arial': 'Arial, "Comic Sans"'
            }
          })
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