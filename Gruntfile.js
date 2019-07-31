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
          'tmp/gramaticaAleatoria.js',
          'dist/pilas-bloques-exercises.js',
        ],
        dest: 'dist/pilas-bloques-exercises.js',
      },
    },

    typescript: {
      base: {
        src: ['src/**/*.ts'],
        dest: 'dist/pilas-bloques-exercises.js',
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
      createTmp: {
        cmd: 'mkdir', args: ['-p', 'tmp']
      },
      compilarGramaticaAleatoria: {
        cmd: 'npm', args: ['run', 'compilar-gramatica-aleatoria']
      },
      generateImageList: {
        cmd: 'npm', args: ['run', 'generate-image-list']
      },
      clean: {
        cmd: 'rm', args: ['-rf', 'tmp']
      }
    }
  });

  grunt.loadNpmTasks('grunt-typescript');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-run');
  grunt.registerTask('compile', ['typescript', 'run:createTmp', 'run:compilarGramaticaAleatoria', 'concat', 'run:generateImageList']);
  grunt.registerTask('default', ['compile']);

};
