let fs = require('fs');

module.exports = (grunt) => {
  require('load-grunt-tasks')(grunt);

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  let uliBabelTargets = {};
  let uliUglifyTargets = {};
  let umdGlobalRenames = {};

  let upcaseLocale = (locale) => {
    return locale.charAt(0).toUpperCase() + locale.substring(1).toLowerCase();
  }

  fs.readdirSync('./src/uliExceptions/').forEach( (file) => {
    let localeOffset = file.lastIndexOf('.js');
    let locale = file.substring(0, localeOffset);
    let upcasedLocale = upcaseLocale(locale);
    let sourcePath = './src/uliExceptions/' + file;
    let distPath = './dist/cldr-segmentation-uli-' + locale + '.js';

    uliBabelTargets['uliExceptions' + upcasedLocale] = {
      options: {
        moduleId: 'cldr/segmentation/uliExceptions/' + locale,
      },

      files: {
        [distPath]: sourcePath
      }
    };

    let minPath = './dist/cldr-segmentation-uli-' + locale + '.min.js';

    uliUglifyTargets['uliExceptions' + upcasedLocale] = {
      files: {
        [minPath]: distPath
      }
    };

    let oldGlobal = 'cldrSegmentationUliExceptions' + upcasedLocale;
    let newGlobal = 'cldrSegmentation.uliExceptions.' + locale;
    umdGlobalRenames[oldGlobal] = newGlobal;
  });


  grunt.initConfig({
    concat: {
      options: {
        separator: ';',
      },
      dist: {
        src: [
          'src/uliExceptions.js',
          'src/breakIterator.js',
          'src/cursor.js',
          'src/rule.js',
          'src/ruleMatchData.js',
          'src/ruleSet.js',
          'src/ruleSets/*.js'
        ],
        dest: 'build/cldr-segmentation.js',
      },

      deps: {
        src: [
          'node_modules/utfstring/utfstring.js',
          'dist/cldr-segmentation.js'
        ],
        dest: 'dist/cldr-segmentation.js'
      }
    },

    babel: {
      options: {
        presets: ['es2015'],
        plugins: [
          'add-module-exports',
          'transform-es2015-modules-umd',
          ['rename-umd-globals', umdGlobalRenames],
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
      },

      ...uliBabelTargets
    },

    uglify: {
      options: {
        mangle: true
      },

      main: {
        files: {
          'dist/cldr-segmentation.min.js': ['dist/cldr-segmentation.js']
        }
      },

      ...uliUglifyTargets
    }
  });

  grunt.registerTask('default', ['concat:dist', 'babel', 'concat:deps', 'uglify']);
};
