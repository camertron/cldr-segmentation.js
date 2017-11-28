let fs = require('fs');

module.exports = (grunt) => {
  require('load-grunt-tasks')(grunt);

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.initConfig({
    concat: {
      options: {
        separator: ';',
      },
      dist: {
        src: [
          'src/breakIterator.js',
          'src/cursor.js',
          'src/rule.js',
          'src/ruleMatchData.js',
          'src/ruleSet.js',
          'src/ruleSets/*.js',
          'src/split.js',
          'src/uliExceptions.js',
          'src/uliExceptions/*.js'
        ],
        dest: 'build/cldr-segmentation.js',
      }
    },

    babel: {
      options: {
        presets: ['es2015'],
        plugins: [
          'transform-es2015-modules-umd',
        ]
      },

      globals: {
        UtfString: 'utfstring'
      },

      main: {
        options: {
          sourceMap: true,
          moduleId: 'cldr/segmentation'
        },

        files: {
          'dist/cldr-segmentation.js': 'build/cldr-segmentation.js',
        }
      }
    },

    uglify: {
      options: {
        mangle: true
      },

      main: {
        files: {
          'dist/cldr-segmentation.min.js': ['dist/cldr-segmentation.js']
        }
      }
    }
  });

  grunt.registerTask('default', ['concat', 'babel', 'uglify']);
};
