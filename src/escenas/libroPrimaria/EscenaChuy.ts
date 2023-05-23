/// <reference path = "EscenaDesdeMapa.ts" />

class EscenaChuy extends EscenaDesdeMapa {
	automata: Chuy;
	xFinal: number;
	yFinal: number;

	static clasesDeActoresInvolucrados(): typeof ActorAnimado[] {
		return [Chuy, Trofeo, Paleta, Pulpito, PingPong];
	};

	static pathFondo(): string {
		return 'fondo.chuy.png';
	}

	static imagenesAdicionales(): string[] {
		return Casilla.imagenesPara('chuy').concat(Obstaculo.imagenesPara('chuy'));
	}

	constructor(especificacion: Spec, opciones?: opcionesMapaAleatorio, posFinal?: [number, number]) {
		super();
		this.initDesdeUnaOVariasDescripciones(especificacion, opciones);

		if (posFinal) {
			this.xFinal = posFinal[0];
			this.yFinal = posFinal[1];
		}
	}

	ajustarGraficos() {
		this.automata.escala *= this.escalaSegunCuadricula(1.8);
		this.automata.setY(this.automata.getY() + this.automata.getAlto() / 4);

		this.obtenerActoresConEtiquetas(["Trofeo", "Paleta", "PingPong"]).forEach(actor => {
			actor.aprender(Flotar, { Desvio: 4 });
			actor.escala *= this.escalaSegunCuadricula(0.5);
		});

		this.obtenerActoresConEtiqueta("Pulpito").forEach(actor => {
			actor.aprender(Flotar, { Desvio: 4 });
			actor.escala *= this.escalaSegunCuadricula(0.1);
		});

	}

	mapearIdentificadorAActor(id, nroFila, nroColumna): ActorAnimado {
		switch (id) {
			case 'A': return this.automata;
			case 'O': return this.obtenerObstaculo(nroFila, nroColumna);
			case 'T': return new Trofeo();
			case 'E': return new Paleta();
			case 'U': return new Pulpito();
			case 'P': return new PingPong();
			default: throw new Error("El identificador '" + id +
				"' no es válido en una escena de Chuy.");
		}
	}

	obtenerAutomata(): Chuy {
		return new Chuy();
	}

	obtenerObstaculo(fila: number, columna: number): Obstaculo {
		let archivosObstaculos = ["obstaculo.chuy1.png", "obstaculo.chuy2.png", "obstaculo.chuy3.png", "obstaculo.chuy4.png"];
		return new Obstaculo(archivosObstaculos, (fila + 1) + (fila + 1) * (columna + 1));
	}

	noHay(actor): boolean {
		return this.contarActoresConEtiqueta(actor) == 0
	}


	estaEnPosicionFinalSiLaTiene(): boolean {
		return !this.xFinal || this.automata.casillaActual().sos(this.yFinal, this.xFinal) || this.automata.alFinalDelCamino();
	}

	noHayPelotas(): boolean {
		return this.noHay("Pulpito") && this.noHay("PingPong")
	}

	estaResueltoElProblema(): boolean {
		return this.estaEnPosicionFinalSiLaTiene() && this.noHayPelotas()
	}

	archivoFondo() {
		return "fondo.chuy.png";
	}
	cuadriculaX() {
		return 0;
	}
	cuadriculaY() {
		return -20;
	}
	opsCuadricula() {
		return { ancho: 400, alto: 380 };
	}
	opsCasilla() {
		return {
			grilla: 'casillas.chuy.png',
			cantFilas: 1,
			cantColumnas: 16,
			bordesDecorados: true,
			relAspecto: 1,
		};
	}
}