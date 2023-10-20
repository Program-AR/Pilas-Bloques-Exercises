/// <reference path = "EscenaActividad.ts" />
/// <reference path = "../comportamientos/PingPongAnimado.ts"/>
/// <reference path = "../actores/segundoCiclo/Chuy/Paleta.ts" />
/// <reference path = "../actores/segundoCiclo/Chuy/Pelotas.ts" />
/// <reference path = "../actores/segundoCiclo/Chuy/Chuy.ts" />


/**
 * @class NoMeCansoDeRebotar
 *
 * Objetivos: Introducir Repetición
 * Enunciado: Repetir reboteso.
 */
 class NoMeCansoDeRebotar extends EscenaActividad {
   automata
   paleta
   pingpong
   fondo
   rebotesFaltantes
   cuadricula;

   iniciar() {
     this.fondo = new Fondo('fondo.chuy.png',0,0);
     this.colocarCuadricula()
     this.construirObjetos();  
     this.construirAutomata();
     this.rebotesFaltantes=30;
     this.automata.decir(" Tengo que hacer " + this.rebotesFaltantes + " rebotes!");
    }

  colocarCuadricula(){
    this.cuadricula = new Cuadricula(70, 0, 1, 1,
      { alto: 100, ancho: 300 },
      { grilla: 'invisible.png', cantColumnas: 1 });
  }

  construirAutomata() {
    this.automata = new Chuy();
    this.automata.escala *= 1.2;
    this.cuadricula.agregarActor(this.automata, 0, 0, false);
    this.automata.x -= 20;
  }

  construirObjetos() {
    this.paleta = new Paleta();   
    this.paleta.y = -120;
    this.paleta.escala *= 0.2;
    this.paleta.aprender(Flotar, {Desvio: 4});
    this.cuadricula.agregarActor(this.paleta, 0, 0, false);
    this.pingpong = new PingPong();   
    this.pingpong.y = -160;
    this.pingpong.escala *= 0.2;
    this.pingpong.aprender(Flotar, {Desvio: 4});
    this.cuadricula.agregarActor(this.pingpong, 0, 0, false);
  }

  antesDeRebotar(){
    //oculto los objetos
    this.pingpong.escala = 0;
    this.paleta.escala = 0;
  }

  getFraseAlRebotar(): string { 
    if (this.rebotesFaltantes > 0)  return " Faltan " + this.rebotesFaltantes + " rebotes";
    if (this.rebotesFaltantes == 0) return "  ¡Ya hice los rebotes necesarios!";
    throw new ActividadError(" ¡Uy! Hice muchos rebotes... ¡Me pasé!");
  }

  fraseAlRebotar(){
    this.rebotesFaltantes--;
    return this.getFraseAlRebotar();
  }

  estaResueltoElProblema() {
    return this.rebotesFaltantes == 0;
  }

}
