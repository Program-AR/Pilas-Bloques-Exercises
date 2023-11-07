/// <reference path = "EscenaActividad.ts" />
/// <reference path = "../actores/ScoutAnimado.ts" />
/// <reference path = "../actores/Cuadricula.ts" />
/// <reference path = "../actores/CompuAnimada.ts" />


class PaleteandoConParametros extends EscenaActividad {
    cuadricula;
    cantidadFilas;
    cantidadColumnas;

    iniciar() {
        this.cantidadFilas = 5;
        this.cantidadColumnas = 5;

        let matriz = [
          ['T','T','T','T','T'],
          ['T','F','F','F','T'],
          ['T','F','F','F','T'],
          ['T','F','F','F','T'],
          ['T','T','T','T','T']
        ];


        this.cuadricula = new CuadriculaEsparsa(0, 0, 
            { separacionEntreCasillas: 5, ancho: 360, alto: 360}, 
            {grilla: 'casilla.chuy.png'}, matriz)

        this.fondo = new Fondo('fondo.chuy.png', 0, 0);

        this.agregarPelotasDePingPong();

        this.automata = new Chuy();
        this.cuadricula.agregarActor(this.automata, 0, 0);
        this.automata.escala *= 3;
        this.automata.y += 50;
    }

    private agregarPelotasDePingPong() {

      for (var i=1; i<this.cantidadColumnas-1; i++){
        if (Math.random() < .5) {
          this.agregarPelotaDePingPong(0, i);
        //filaSuperior
        }

        if (Math.random() < .5) {
          this.agregarPelotaDePingPong(this.cantidadFilas-1, i);
        }
        //filaInferior
      }

      for (var j=1; j<this.cantidadFilas-1; j++){
        if (Math.random() < .5) {
          this.agregarPelotaDePingPong(j, 0);
        }

        if (Math.random() < .5) {
          this.agregarPelotaDePingPong(j, this.cantidadColumnas-1);
        }
      }
    }

    private agregarPelotaDePingPong(fila, columna) {
      let pelota = new PingPong();
      this.cuadricula.agregarActor(pelota, fila, columna);
      pelota.aprender(Flotar, { Desvio: 2 });
      pelota.escala *= 0.3;
    }

    estaResueltoElProblema() {
      return pilas.escena_actual().noHay("PingPong");
    }

}
