module.exports = function (grunt) {

  grunt.initConfig({

    concat: {
      options: {
        separator: ';',
      },
      dist: {
        src: [
          'dependencias/helpers.js',
          'dependencias/listHelper.js',
          'node_modules/nearley/lib/nearley.js',
          'dist/gramaticaAleatoria.js',
          'dist/ejerciciosPilas.js',
        ],
        dest: 'dist/ejerciciosPilas.js',
      },
    },

    copy: {
      main: {
        expand: true,
        src: 'dist/ejerciciosPilas.js',
        dest: '../public/libs/',
        flatten: true,
        filter: 'isFile'
      },
    },

    typescript: {
      base: {
        src: ['src/**/*.ts'],
        dest: 'dist/ejerciciosPilas.js',
        options: {
          module: 'commonjs',
          target: 'es5',
          rootDir: 'src',
          experimentalDecorators: true,
          emitDecoratorMetadata: true,
          sourceMap: false,
          fullSourceMapPath: false,
          declaration: false,
          comments: true,
        }
      }
    },

    watch: {
      scripts: {
        files: ['src/**'],
        tasks: ['compile'],
      }
    },

    run: {
      compilarGramaticaAleatoria: {
        cmd: 'npm',
        args: [
          'run',
          'compilarGramaticaAleatoria'
        ]
      }
    }
  });

  grunt.loadNpmTasks('grunt-typescript');
  grunt.loadNpmTasks('grunt-ts');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-open');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-run');

  grunt.registerTask('default', ['typescript', 'run:compilarGramaticaAleatoria', 'concat']);

};
