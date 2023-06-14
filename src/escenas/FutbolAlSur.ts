/// <reference path = "FutbolRobots.ts" />

class FutbolAlSur extends FutbolRobots {

  static clasesDeActoresInvolucrados(): typeof ActorAnimado[] {
    return [Chuy, PelotaAnimada];
  };

  static imagenesAdicionales(): string[] {
    return ['casilla.futbolChuy1.png', 'casilla.futbolChuy2.png'].concat(Obstaculo.imagenesPara('chuy'));
  }

  static pathFondo(): string {
    return 'fondo.chuy.png';
  }

  ajustarAutomata() {
    this.automata.traer_al_frente()
		this.automata.escala *= this.escalaSegunCuadricula(3.3);
		this.automata.setY(this.automata.getY() + this.automata.getAlto() / 4);
    this.automata.setX(this.automata.getX() + 10)
  }

  obtenerAutomata() {
    return new Chuy();
  }

  obtenerFondo() {
    return new Fondo('fondo.chuy.png', 0, 0);
  }

  imagenCasillas() {
    return 'casilla.futbolChuy1.png'
  }

  imagenCasillasInicio() {
    return 'casilla.futbolChuy2.png'
  }
}
