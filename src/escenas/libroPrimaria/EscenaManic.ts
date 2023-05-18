/// <reference path = "../libroPrimaria/EscenaDesdeMapa.ts" />


class EscenaManic extends EscenaDesdeMapa {
	automata: Manic;

	static clasesDeActoresInvolucrados(): typeof ActorAnimado[] {
		return [Manic, Telescopio, Estrella, Planeta];
	};

	static pathFondo(): string {
		return 'fondo.manic.png';
	}

	static imagenesAdicionales(): string[] {
		return Casilla.imagenesPara('manic').concat(Obstaculo.imagenesPara('manic'));
	}

	constructor(especificacion: Spec, opciones?: opcionesMapaAleatorio) {
		super();
		this.initDesdeUnaOVariasDescripciones(especificacion, opciones);
	}

	ajustarGraficos() {
		this.automata.escala *= this.escalaSegunCuadricula(1.8);
		this.automata.setY(this.automata.getY() + this.automata.getAlto() / 4);

		this.obtenerActoresConEtiquetas(["Telescopio", "Estrella", "Planeta"]).forEach(actor => {
			actor.aprender(Flotar, { Desvio: 4 });
			actor.escala *= this.escalaSegunCuadricula(0.6);
		});

		this.obtenerActoresConEtiqueta("Obstaculo").forEach(obstaculo => {
			obstaculo.escala *= this.escalaSegunCuadricula(1.1);
		});
	}

	mapearIdentificadorAActor(id, nroFila, nroColumna): ActorAnimado {
		switch (id) {
			case 'A': return this.automata;
			case 'O': return this.obtenerObstaculo(nroFila, nroColumna);
			case 'T': return new Telescopio();
			case 'R': return new Telescopio(true); //telescopio Arreglado
			case 'E': return new Estrella();
			case 'P': return new Planeta();
			default: throw new Error("El identificador '" + id +
				"' no es válido en una escena de Manic.");
		}
	}

	obtenerAutomata(): Manic {
		return new Manic();
	}

	obtenerObstaculo(fila: number, columna: number): Obstaculo {
		let archivosObstaculos = ["obstaculo.manic1.png", "obstaculo.manic2.png", "obstaculo.manic3.png", "obstaculo.manic4.png"];
		return new Obstaculo(archivosObstaculos, (fila + 1) + (fila + 1) * (columna + 1));
	}

	todosLosActoresCumplen(actor, estado) {
		return this.obtenerActoresConEtiqueta(actor).every(o => o.nombreAnimacionActual() == estado);
	}

	telescopiosArreglados(): boolean {
		return this.todosLosActoresCumplen("Telescopio", "arreglado")
	}

	telescopioResuelto(): boolean {
		return this.telescopiosArreglados() || this.noHay("Telescopio")
	}

	noHay(actor): boolean {
		return this.contarActoresConEtiqueta(actor) == 0
	}

	estaResueltoElProblema(): boolean {
		return this.telescopioResuelto() && this.noHay("Estrella") && this.noHay("Planeta")
	}

	archivoFondo() {
		return "fondo.manic.png";
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
			grilla: 'casillas.manic.png',
			cantFilas: 1,
			cantColumnas: 16,
			bordesDecorados: true,
			relAspecto: 1,
		};
	}
}