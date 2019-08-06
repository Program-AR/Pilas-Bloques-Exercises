/// <reference path = "./EscenaActividad.ts" />
/// <reference path = "../actores/AlienAnimado.ts" />
/// <reference path = "../actores/TuercaAnimada.ts" />
/// <reference path = "../comportamientos/MovimientosEnCuadricula.ts" />
/// <reference path = "../comportamientos/Recoger.ts" />
/// <reference path = "../habilidades/Vibrar.ts" />

class AlienLevantaTuercas extends EscenaActividad {

	public iniciar(): void {
		this.setEstado(new Estado(() => this.cantidadObjetosConEtiqueta('TuercaAnimada') == 0))
		this.setFondo(new pilas.fondos.Laberinto1())
		this.setCuadricula(new Cuadricula(0, -25, 5, 6, { alto: 400 }, { grilla: 'invisible.png', cantColumnas: 1 }))
		this.setAutomata(new AlienAnimado(0, 0))
		this.getCuadricula().agregarActorEnPerspectiva(this.getAutomata(), 4, 0, false)

		for (var i = 0; i < 5; i++) {
			var tuerca = new TuercaAnimada(0, 0)
			this.getCuadricula().agregarActorEnPerspectiva(tuerca, i, i)
			tuerca.aprender(Vibrar, { 'gradosDeAumentoStep': 2, 'tiempoVibracion': 40 })
			tuerca.escala = 1.0
		}

	}

	public moverIzquierda(): void {
		this.getAutomata().hacer_luego(MoverACasillaIzquierda)
	}

	public moverDerecha(): void {
		this.getAutomata().hacer_luego(MoverACasillaDerecha)
	}

	public moverAbajo(): void {
		this.getAutomata().hacer_luego(MoverACasillaAbajo)
	}

	public moverArriba(): void {
		this.getAutomata().hacer_luego(MoverACasillaArriba)
	}

	public levantaTuerca(): void {
		this.getAutomata().hacer_luego(Recolectar, { 'etiqueta': 'TuercaAnimada', 'mensajeError': 'No hay una tuerca aquí' })
	}

}
