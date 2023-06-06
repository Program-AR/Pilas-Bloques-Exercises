/// <reference path = "../libroPrimaria/EscenaDesdeMapa.ts" />


class EscenaYvoty extends EscenaDesdeMapa {
	automata: Yvoty;

	static clasesDeActoresInvolucrados(): typeof ActorAnimado[] {
		return [Yvoty, Celular, Luciernaga, Cargador, Mariposa, CompuAnimada];
	};

	static pathFondo(): string {
		return 'fondo.yvoty.png';
	}

	static imagenesAdicionales(): string[] {
		return Casilla.imagenesPara('yvoty').concat(Obstaculo.imagenesPara('yvoty'));
	}

	constructor(especificacion: Spec, opciones?: opcionesMapaAleatorio) {
		super();
		this.initDesdeUnaOVariasDescripciones(especificacion, opciones);
	}

	ajustarGraficos() {
		this.automata.escala *= this.escalaSegunCuadricula(1.75);
		this.automata.setY(this.automata.getY() + this.automata.getAlto() / 4);

		this.obtenerActoresConEtiqueta("Luciernaga").forEach(actor => {
			actor.aprender(Flotar, { Desvio: 4 });
			actor.escala *= this.escalaSegunCuadricula(0.8);
		});

		this.obtenerActoresConEtiquetas(["Celular", "Mariposa"]).forEach(actor => {
			actor.aprender(Flotar, { Desvio: 4 });
			actor.escala *= this.escalaSegunCuadricula(0.6);
		});

		this.obtenerActoresConEtiqueta("Cargador").forEach(actor => {
			actor.aprender(Flotar, { Desvio: 4 });
			actor.escala *= this.escalaSegunCuadricula(0.7);
		});

		this.obtenerActoresConEtiqueta("Obstaculo").forEach(obstaculo => {
			obstaculo.escala *= this.escalaSegunCuadricula(1.1);
		});
	}

	mapearIdentificadorAActor(id, nroFila, nroColumna): ActorAnimado {
		switch (id) {
			case 'A': return this.automata;
			case 'O': return this.obtenerObstaculo(nroFila, nroColumna);
			case 'C': return new Celular();
			case 'P': return new Celular(true); //celular prendido
			case 'K': return new Cargador();
			case 'L': return new Luciernaga();
			case 'M': return new Mariposa();
			case 'T': return new CompuAnimada(0, 0);
			default: throw new Error("El identificador '" + id +
				"' no es válido en una escena de Yvoty.");
		}
	}

	obtenerAutomata(): Yvoty {
		return new Yvoty();
	}

	obtenerObstaculo(fila: number, columna: number): Obstaculo {
		let archivosObstaculos = ["obstaculo.yvoty1.png", "obstaculo.yvoty2.png", "obstaculo.yvoty3.png", "obstaculo.yvoty4.png"];
		return new Obstaculo(archivosObstaculos, (fila + 1) + (fila + 1) * (columna + 1));
	}

	luciernagasDespiertas(): boolean {
		return this.todosLosActoresCumplen("Luciernaga", "despierta")
	}

	celularesCargados(): boolean {
		return this.todosLosActoresCumplen("Celular", "cargado") && this.noHay("Cargador")
	}

	celularResuelto(): boolean {
		return this.celularesCargados() || this.noHay("Celular")
	}

	computadorasPrendidas(): boolean {
		return this.todosLosActoresCumplen("CompuAnimada", "prendida")
	}

	estaResueltoElProblema(): boolean {
		return this.luciernagasDespiertas() && this.celularResuelto() && this.noHay("Mariposa") && this.computadorasPrendidas()
	}

	archivoFondo() {
		return "fondo.yvoty.png";
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
			grilla: 'casillas.yvoty.png',
			cantFilas: 1,
			cantColumnas: 16,
			bordesDecorados: true,
			relAspecto: 1,
		};
	}
}