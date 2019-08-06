/// <reference path = "../EscenaActividad.ts" />

class EscenaLita extends EscenaDesdeMapa {
	xFinal: number
	yFinal: number

	public static clasesDeActoresInvolucrados(): typeof ActorAnimado[] {
		return [Lita, Ensaladera, Tomate, Lechuga, FlechaEscenarioAleatorio]
	}

	public static pathFondo(): string {
		return 'fondo.lita.png'
	}

	public static imagenesAdicionales(): string[] {
		return Casilla.imagenesPara('lita').concat(Obstaculo.imagenesPara('lita'))
	}			//TODO: Usar flatMap (lodash)

	constructor(especificacion: string | Array<string>, opciones?: opcionesMapaAleatorio, posFinal?: [number, number]) {
		super()
		this.initDesdeUnaOVariasDescripciones(especificacion, opciones)

		if (posFinal) {
			this.xFinal = posFinal[0]
			this.yFinal = posFinal[1]
		}
	}

	public iniciar(): void {
		super.iniciar()

		if (!this.hayEnsaladera()) {
			this.setEstado(new Estado(() => this.noHayMasIngredientes()))
		}
	}

	public hayEnsaladera(): boolean {
		return this.contarActoresConEtiqueta("Ensaladera") > 0
	}

	public noHayMasTomates(): boolean {
		return this.contarActoresConEtiqueta("Tomate") === 0
	}

	public noHayMasLechugas(): boolean {
		return this.contarActoresConEtiqueta("Lechuga") === 0
	}

	public noHayMasIngredientes(): boolean {
		return this.noHayMasLechugas() && this.noHayMasTomates()
	}

	hayDeLosDosIngredientes() {
		return this.contarActoresConEtiqueta("Tomate") >= 1 && this.contarActoresConEtiqueta("Lechuga") >= 1
	}

	estaResueltoElProblema(): boolean {
		// Además de verificar que Lita haya cumplido el objetivo de la escena,
		// en el caso de que se haya proporcionado una posición final,
		// queremos verificar que Lita esté ahí.
		return super.estaResueltoElProblema() &&
			(this.xFinal === undefined || this.getAutomata().casillaActual().sos(this.xFinal, this.yFinal))
	}

	ajustarGraficos() {
		this.getAutomata().escala *= this.escalaSegunCuadricula(1.9)
		this.getAutomata().setY(this.getAutomata().getY() + this.getAutomata().getAlto() / 4)

		this.obtenerActoresConEtiqueta("Ensaladera").forEach(ensaladera => {
			ensaladera.enviarAlFrente()
			ensaladera.setY(ensaladera.getY() - ensaladera.getAlto() / 5)
		})

		this.obtenerActoresConEtiquetas(["Tomate", "Lechuga", "Ensaladera"]).forEach(actor => {
			actor.aprender(Flotar, { Desvio: 5 })
			actor.escala *= this.escalaSegunCuadricula(1.2) * 0.85
		})

		this.obtenerActoresConEtiqueta("Obstaculo").forEach(obstaculo => {
			obstaculo.escala *= this.escalaSegunCuadricula(1.1)
		})
	}

	mapearIdentificadorAActor(id, nroFila, nroColumna): ActorAnimado {
		switch (id) {
			case 'A': return this.getAutomata()
			case 'L': return new Lechuga()
			case 'T': return new Tomate()
			case 'E': return new Ensaladera()
			case 'O': return this.obtenerObstaculo(nroFila, nroColumna)
			default: throw new Error("El identificador '" + id +
				"' no es válido en una escena de Lita.")
		}
	}

	obtenerAutomata(): Lita {
		return new Lita()
	}

	obtenerObstaculo(fila: number, columna: number): Obstaculo {
		let archivosObstaculos = ["obstaculo.lita1.png", "obstaculo.lita2.png", "obstaculo.lita3.png", "obstaculo.lita4.png"]
		return new Obstaculo(archivosObstaculos, (fila + 1) + (fila + 1) * (columna + 1))
	}

	archivoFondo() {
		return "fondo.lita.png"
	}
	cuadriculaX() {
		return 0
	}
	cuadriculaY() {
		return -20
	}
	opsCuadricula() {
		return { ancho: 340, alto: 380 }
	}
	opsCasilla() {
		return {
			grilla: 'casillas.lita.png',
			cantFilas: 1,
			cantColumnas: 16,
			bordesDecorados: true,
			relAspecto: 1,
		}
	}
}
