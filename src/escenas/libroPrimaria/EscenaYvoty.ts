/// <reference path = "../libroPrimaria/EscenaDesdeMapa.ts" />


class EscenaYvoty extends EscenaDesdeMapa {
	automata: Yvoty;

	static clasesDeActoresInvolucrados(): typeof ActorAnimado[] {
		return [Yvoty, Celular, Luciernaga];
	};

	static pathFondo(): string {
		return 'fondo.yvoty.png';
	}

	static imagenesAdicionales(): string[] {
		return Casilla.imagenesPara('yvoty').concat(Obstaculo.imagenesPara('yvoty'));
	}

	constructor(especificacion: Spec, opciones?: opcionesMapaAleatorio, posFinal?: [number, number]) {
		super();
		this.initDesdeUnaOVariasDescripciones(especificacion, opciones);
	}

	ajustarGraficos() {
		this.automata.escala *= this.escalaSegunCuadricula(1.8);
		this.automata.setY(this.automata.getY() + this.automata.getAlto() / 8);

		this.obtenerActoresConEtiquetas(["Celular", "Luciernaga"]).forEach(actor => {
			actor.aprender(Flotar, { Desvio: 5 });
			actor.escala *= this.escalaSegunCuadricula(1.2) * 0.85;
		});

		this.obtenerActoresConEtiqueta("Obstaculo").forEach(obstaculo => {
			obstaculo.escala *= this.escalaSegunCuadricula(1.1);
		});
	}

	mapearIdentificadorAActor(id, nroFila, nroColumna): ActorAnimado {
		switch (id) {
			case 'A': return this.automata;
			case 'O': return this.obtenerObstaculo(nroFila, nroColumna);
			case 'E': return new Celular();
			case 'L': return new Luciernaga();
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


	luciernagasPrendidas(): boolean {
		return this.obtenerActoresConEtiqueta("Luciernaga").every(o => o.nombreAnimacionActual() == 'prendida');
	}

	estaResueltoElProblema(): boolean {
		return this.luciernagasPrendidas()
	}

	archivoFondo(){
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