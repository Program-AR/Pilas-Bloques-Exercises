/// <reference path = "EscenaActividad.ts" />
/// <reference path="../actores/CuadriculaMultiple.ts"/>
/// <reference path="../actores/segundoCiclo/Manic/Estrella.ts"/>
/// <reference path="../actores/segundoCiclo/Manic/Planeta.ts"/>
/// <reference path="../actores/segundoCiclo/Manic/Manic.ts"/>
/// <reference path="../actores/Tablero.ts"/>
/// <reference path="../actores/ObservadoAnimado.ts"/>




class ContandoPlanetasYEstrellas extends EscenaActividad {
    fondo;
    cuadricula : CuadriculaMultipleColumnas;
    tableros;

    iniciar() {
        this.fondo = new Fondo('fondo.manic.png',0,0);
        this.cuadricula = new CuadriculaMultipleColumnas(
            new DefinidorColumnasRandom(5, 6),
            0, -45,
            { separacionEntreCasillas: 5 },
            { alto: 40, ancho: 40, grilla: 'casillas.manic.png', cantColumnas: 1 })
        this.cuadricula.cambiarImagenInicio('casillainicio.manic.png');
        this.cambiarImagenesFin();

        this.cuadricula.completarConObjetosRandom(new ConjuntoClases([Planeta, Estrella]),
          {condiciones:[
              (casilla) => casilla.hayArriba(), //no incluye en primera fila
              (casilla) => casilla.hayAbajo() //no incluye en ultima fila
          ]}
          );

        this.automata = new Manic();
        this.cuadricula.agregarActorEnPerspectiva(this.automata, 0, 0);
        this.automata.escala *= 1.5;

        this.tableros = {};
        this.tableros.Planeta = new Tablero(150,210,{texto:"Planetas"});
        this.tableros.Estrella = new Tablero(-150,210,{texto:"Estrellas"});
    }

    cambiarImagenesFin(){
        this.cuadricula.cambiarImagenFin('casillafin.manic.png');
    }

    estaResueltoElProblema(){
      return this.cantidadObjetosConEtiqueta('Planeta') === this.tableros.Planeta.dameValor() &&
        this.cantidadObjetosConEtiqueta('Estrella') === this.tableros.Estrella.dameValor();
    }

}
