/// <reference path = "./EscenaActividad.ts" />

class AlienLevantaTuercas extends EscenaActividad {

	public iniciar(): void {
		this.setFondo(new pilas.fondos.Laberinto1())
		this.setCuadricula(new Cuadricula(0, -25, 5, 6, { alto: 400 }, { grilla: 'invisible.png', cantColumnas: 1 }))
		this.setAutomata(new AlienAnimado(0, 0))
		this.getCuadricula().agregarActorEnPerspectiva(this.getAutomata(), 4, 0, false)

		for (var i = 0; i < 5; i++) {
			var nut = new TuercaAnimada(0, 0)
			this.getCuadricula().agregarActorEnPerspectiva(nut, i, i)
			nut.aprender(Vibrar, { 'gradosDeAumentoStep': 2, 'tiempoVibracion': 40 })
			nut.setEscala(1.0)
		}

		this.buildState()
	}

	private buildState(): void {
		this.setEstado(new Estado(() => this.cantidadObjetosConEtiqueta('TuercaAnimada') == 0))
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
