/// <reference path = "EscenaActividad.ts" />
/// <reference path = "../actores/Cuadricula.ts" />
/// <reference path = "../actores/CompuAnimada.ts" />
/// <reference path = "../actores/InstaladorAnimado.ts" />
/// <reference path = "../comportamientos/ComportamientoAnimado.ts" />
/// <reference path = "../comportamientos/MovimientosEnCuadricula.ts" />

class InstalandoJuegosYvoty extends InstalandoJuegos {
  compus;
  automata;
  fondo;
  cuadricula;
  estado;

  static clasesDeActoresInvolucrados(): typeof ActorAnimado[] {
		return [Yvoty, CompuAnimada];
	};

	static pathFondo(): string {
		return 'fondo.yvoty.png';
	}

	static imagenesAdicionales(): string[] {
		return Casilla.imagenesPara('yvoty').concat(Obstaculo.imagenesPara('yvoty'));
	}

  colocarCuadricula(){
    this.cuadricula = new Cuadricula(0, -20, 1, 4,
      { ancho: 400, alto: 380 },
      { grilla: 'casillas.yvoty.png',
        cantFilas: 1,
        cantColumnas: 16,
        bordesDecorados: true,
        relAspecto: 1,
      })
  }

  imagenFondo(){
    return 'fondo.yvoty.png'
  }

  colocarAutomata() {
    this.automata = new Yvoty();
    this.cuadricula.agregarActor(this.automata, 0, 0);
		this.automata.escala *= this.escalaSegunCuadricula(1.5);
		this.automata.setY(3);
    this.automata.x -= 10
  }

  ajustarCompu(compu) {
    compu.escala *= this.escalaSegunCuadricula(0.6)
    compu.setX(compu.getX() + 9)
    compu.setY(compu.getY() + 14)
  }
}