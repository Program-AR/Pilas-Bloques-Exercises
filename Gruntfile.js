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

    clean: {
      grammar: ['./dist/gramaticaAleatoria.js']
    },

    run: {
      build: {
        cmd: 'npm', args: ['run', 'build']
      }
    }
  });

  grunt.loadNpmTasks('grunt-typescript');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-run');
  grunt.registerTask('compile', ['run:build']);
  grunt.registerTask('default', ['compile']);

};
