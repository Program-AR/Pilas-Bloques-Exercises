/// <reference path = "../libroPrimaria/EscenaDesdeMapa.ts" />


class EscenaCapy extends EscenaDesdeMapa {
	automata: Capy;
	
	static clasesDeActoresInvolucrados(): typeof ActorCompuesto[] {
		return [Capy, Tacho, Lata, Papel];
	};

	static pathFondo(): string {
		return 'fondo.capy.png';
	}

	static imagenesAdicionales(): string[] {
		return Casilla.imagenesPara('capy').concat(Obstaculo.imagenesPara('capy'));
	}

	constructor(especificacion: Spec, opciones?: opcionesMapaAleatorio) {
		super();
		this.initDesdeUnaOVariasDescripciones(especificacion, opciones);
	}

	ajustarGraficos() {
		this.automata.escala *= this.escalaSegunCuadricula(1.8);
		this.automata.setY(this.automata.getY() + this.automata.getAlto() / 4);

		this.obtenerActoresConEtiquetas(["Tacho", "Lata", "Papel"]).forEach(actor => {
			actor.aprender(Flotar, { Desvio: 4 });
			actor.escala *= this.escalaSegunCuadricula(0.6);
		});

		this.obtenerActoresConEtiqueta("Obstaculo").forEach(obstaculo => {
			obstaculo.escala *= this.escalaSegunCuadricula(0.6);
		});
	}

	mapearIdentificadorAActor(id, nroFila, nroColumna): ActorAnimado {
		switch (id) {
			case 'A': return this.automata;
			case 'O': return this.obtenerObstaculo(nroFila, nroColumna);
			case 'T': return new Tacho();
			case 'Y': return new Tacho(true); //tacho lleno
			case 'L': return new Lata();
			case 'P': return new Papel();
			default: throw new Error("El identificador '" + id +
				"' no es válido en una escena de Capy.");
		}
	}

	obtenerAutomata(): Capy {
		return new Capy();
	}

	obtenerObstaculo(fila: number, columna: number): Obstaculo {
		let archivosObstaculos = ["obstaculo.capy1.png", "obstaculo.capy2.png", "obstaculo.capy3.png", "obstaculo.capy4.png"];
		return new Obstaculo(archivosObstaculos, (fila + 1) + (fila + 1) * (columna + 1));
	}

	todosLosActoresCumplen(actor, estado) {
		return this.obtenerActoresConEtiqueta(actor).every(o => o.nombreAnimacionActual() == estado);
	}

	tachosLlenos(): boolean {
		return this.todosLosActoresCumplen("Tacho", "lleno")
	}

	tachoResuelto(): boolean {
		return this.tachosLlenos() || this.noHay("Tacho")
	}

	recogidos(actor): boolean {
		return this.todosLosActoresCumplen(actor, "recoger")
	}

	recoleccionResuelta(actor): boolean {
		return this.recogidos(actor) || this.noHay(actor)
	}


	noHay(actor): boolean {
		return this.contarActoresConEtiqueta(actor) == 0
	}

	estaResueltoElProblema(): boolean {
		return this.tachoResuelto() && this.recoleccionResuelta("Lata") && this.recoleccionResuelta("Papel")
	}

	archivoFondo() {
		return "fondo.capy.png";
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
			grilla: 'casillas.capy.png',
			cantFilas: 1,
			cantColumnas: 16,
			bordesDecorados: true,
			relAspecto: 1,
		};
	}
}