/// <reference path = "../EscenaActividad.ts" />

class EscenaDuba extends EscenaDesdeMapa {
	private xFinal: number
	private yFinal: number

	public static clasesDeActoresInvolucrados(): typeof ActorAnimado[] {
		return [Duba, Churrasco, FlechaEscenarioAleatorio]
	}

	public static pathFondo(): string {
		return 'fondo.duba.png'
	}

	public static imagenesAdicionales(): string[] {
		return Casilla.imagenesPara('duba').concat(Obstaculo.imagenesPara('duba'))
	}			//TODO: Usar flatMap (lodash)

	constructor(especificacion: string | Array<string>, opciones?: opcionesMapaAleatorio, posFinal?: [number, number]) {
		super()
		this.initDesdeUnaOVariasDescripciones(especificacion, opciones)

		if (posFinal) {
			this.xFinal = posFinal[0]
			this.yFinal = posFinal[1]
		}
	}

	public ajustarGraficos(): void {
		this.getAutomata().setEscala(this.getAutomata().getEscala() * this.escalaSegunCuadricula(1.6))
		this.getAutomata().setY(this.getAutomata().getY() + this.getAutomata().getAlto() / 8)

		this.obtenerActoresConEtiqueta("Churrasco").forEach(churrasco => {
			churrasco.aprender(Flotar, { Desvio: 5 })
			churrasco.setEscala(churrasco.getEscala() * this.escalaSegunCuadricula(1.6) * 0.85)
		})

		this.obtenerActoresConEtiqueta("Obstaculo").forEach(obstaculo => {
			obstaculo.setEscala(obstaculo.getEscala() * this.escalaSegunCuadricula(1.1))
		})
	}

	public mapearIdentificadorAActor(id: string, nroFila: number, nroColumna: number): ActorAnimado {
		switch (id) {
			case 'A': return this.getAutomata()
			case 'O': return this.obtenerObstaculo(nroFila, nroColumna)
			case 'P': return new Churrasco()
			default: throw new Error("El identificador '" + id +
				"' no es válido en una escena de Duba.")
		}
	}

	public obtenerAutomata(): Duba {
		return new Duba()
	}

	public obtenerObstaculo(fila: number, columna: number): Obstaculo {
		let archivosObstaculos = ["obstaculo.duba1.png", "obstaculo.duba2.png", "obstaculo.duba3.png", "obstaculo.duba4.png"]
		return new Obstaculo(archivosObstaculos, (fila + 1) + (fila + 1) * (columna + 1))
	}

	public estaResueltoElProblema(): boolean {
		return (this.contarActoresConEtiqueta("Churrasco")) === 0 &&
			(this.xFinal === undefined || this.getAutomata().casillaActual().sos(this.xFinal, this.yFinal))
	}

	public archivoFondo(): string {
		return "fondo.duba.png"
	}

	public cuadriculaX(): number {
		return 0
	}

	public cuadriculaY(): number {
		return -20
	}

	public opsCuadricula() {
		return { ancho: 340, alto: 380 }
	}

	public opsCasilla() {
		return {
			grilla: 'casillas.duba.png',
			cantFilas: 1,
			cantColumnas: 16,
			bordesDecorados: true,
			relAspecto: 1,
		}
	}
}