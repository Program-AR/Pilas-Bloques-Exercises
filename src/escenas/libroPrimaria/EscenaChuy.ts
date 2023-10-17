/// <reference path = "EscenaDesdeMapa.ts" />

class EscenaChuy extends EscenaDesdeMapa {
	automata: Chuy;
	xFinal: number;
	yFinal: number;

	static clasesDeActoresInvolucrados(): typeof ActorAnimado[] {
		return [Chuy, Trofeo, Paleta, PelotaAnimada, Pulpito, PingPong];
	};

	static pathFondo(): string {
		return 'fondo.chuy.png';
	}

	static nombreAutomata(): string {
		return 'chuy'
	}

	constructor(especificacion: Spec, opciones?: opcionesMapaAleatorio, posFinal?: [number, number]) {
		super();
		this.initDesdeUnaOVariasDescripciones(especificacion, opciones, posFinal);
	}

	ajustarGraficos() {
		this.automata.escala *= this.escalaSegunCuadricula(2);
		this.automata.setY(this.automata.getY() + this.automata.getAlto() / 4);
		this.automata.setX(this.automata.getX() + 12)

		this.obtenerActoresConEtiquetas(["Trofeo", "Paleta"]).forEach(actor => {
			actor.aprender(Flotar, { Desvio: 4 });
			actor.escala *= this.escalaSegunCuadricula(0.5);
		});

		this.obtenerActoresConEtiqueta("Pulpito").forEach(actor => {
			actor.aprender(Flotar, { Desvio: 4 });
			actor.escala *= this.escalaSegunCuadricula(0.2);
		});

		this.obtenerActoresConEtiqueta("PelotaAnimada").forEach(actor => {
			actor.aprender(Flotar, { Desvio: 4 });
			actor.escala *= this.escalaSegunCuadricula(0.1);
		});

		this.obtenerActoresConEtiqueta("PingPong").forEach(actor => {
			actor.aprender(Flotar, { Desvio: 4 });
			actor.escala *= this.escalaSegunCuadricula(1) * 0.15;
		});


		this.obtenerActoresConEtiqueta("Obstaculo").forEach(actor => {
			actor.escala *= this.escalaSegunCuadricula(0.9);
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
			case 'G': return new PelotaAnimada(0,0);
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

	estaEnPosicionFinalSiLaTiene(): boolean {
		return super.estaEnPosicionFinalSiLaTiene() || this.automata.alFinalDelCamino();
	}

	noHayPelotas(): boolean {
		return this.noHay("Pulpito") && this.noHay("PingPong") && this.todosLosActoresCumplen("PelotaAnimada", "patear")
	}

	estaResueltoElProblema(): boolean {
		return this.estaEnPosicionFinalSiLaTiene() && this.noHayPelotas() && this.noHay("Trofeo")
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