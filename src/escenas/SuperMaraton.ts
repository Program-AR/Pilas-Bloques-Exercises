/// <reference path = "EscenaActividad.ts" />
/// <reference path = "Errores.ts" />
/// <reference path = "../actores/FondoAnimado.ts"/>
/// <reference path = "../actores/segundoCiclo/Chuy/Chuy.ts"/>


/**
 * @class SuperMaraton
 *
 */
class SuperMaraton extends EscenaActividad {
    fondo;
    automata;

    iniciar() {
        this.fondo = new FondoAnimado('fondo.superMaraton.png', pilas.derecha(), 0);
        this.automata = new Chuy();
        this.automata.y = -70;

        this.automata.totalKM = 15 + Math.round(Math.random() * 30);
        this.automata.restantesKM = this.automata.totalKM;

        this.automata.kmsTotales = function(){
          return this.totalKM
        };

        this.crearTablero();

        this.automata.fraseAlCorrer = function() {
          this.restantesKM--;
          if (this.restantesKM == 0) return "¡Llegué!";
          if (this.restantesKM == 1) return "¡Falta 1 kilometro!";
          if (this.restantesKM < 0) throw new ActividadError("Ya llegué, ¡no debo seguir corriendo!");

          return "¡Faltan " + this.restantesKM + " kilometros!";
        }
    }

    crearTablero(){
      Trait.toObject(Observado, this.automata);
      var tablero = new Tablero(0, 210, { texto: "Kilómetros a recorrer" , atributoObservado: 'kmsTotales'});
      this.automata.registrarObservador(tablero);
    }

    estaResueltoElProblema(){
      return this.automata.restantesKM === 0;
    }

}
