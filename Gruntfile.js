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
          'dist/pilas-bloques-exercises.js',
        ],
        dest: 'dist/pilas-bloques-exercises.js',
      },
    },

    run: {
      build: {
        cmd: 'npm', args: ['run', 'build']
      }
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
    }

  });

  grunt.loadNpmTasks('grunt-typescript');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-run');
  grunt.registerTask('compile', ['run:build']);
  grunt.registerTask('default', ['compile']);

};
