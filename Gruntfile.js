let fs = require('fs');
let path = require('path');

let prefix = path.join('src', 'suppressions');
let suppressions = [];

fs.readdirSync(prefix).forEach( (file) => {
  if (path.basename(file) !== 'all.js') {
    suppressions.push(path.join(prefix, file));
  }
});

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
          'src/categoryTable.js',
          'src/cursor.js',
          'src/metadata.js',
          'src/nullSuppressions.js',
          'src/ruleSet.js',
          'src/ruleSets/*.js',
          'src/split.js',
          'src/stateMachine.js',
          'src/stateTable.js',
          'src/trie.js',
          'src/suppressions.js',
          'src/customSuppressions.js',
          ...suppressions,
          'src/suppressions/all.js'
        ],
        dest: 'build/cldr-segmentation.js',
      }
    },

    babel: {
      options: {
        presets: ['es2015'],
        plugins: [
          'transform-es2015-modules-umd',
          'transform-class-properties'
        ]
      },

      globals: {
        utfstring: 'utfstring'
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
