/// <reference path = "EscenaDesdeMapa.ts" />
/// <reference path = "../../habilidades/Flotar.ts" />
/// <reference path = "../../actores/libroPrimaria/Duba.ts" />
/// <reference path = "../../actores/libroPrimaria/Obstaculo.ts" />
/// <reference path = "../../actores/libroPrimaria/Churrasco.ts" />

class EscenaDuba extends EscenaDesdeMapa {
	automata: Duba;
	xFinal: number;
	yFinal: number;

	static clasesDeActoresInvolucrados() :typeof ActorAnimado[] {
		return [Duba, Churrasco, FlechaEscenarioAleatorio];
	};

	static pathFondo() : string {
		return 'fondo.duba.png';
	}

	static imagenesAdicionales() : string[]{
		return Casilla.imagenesPara('duba').concat(Obstaculo.imagenesPara('duba'));
	}			//TODO: Usar flatMap (lodash)

	constructor(especificacion: string | Array<string>, opciones?: opcionesMapaAleatorio, posFinal? : [number, number]) {
		super();
		this.initDesdeUnaOVariasDescripciones(especificacion, opciones);

		if (posFinal) {
			this.xFinal = posFinal[0];
			this.yFinal = posFinal[1];
		}
	}

	ajustarGraficos() {
		this.automata.escala *= this.escalaSegunCuadricula(1.6);
		this.automata.setY(this.automata.getY() + this.automata.getAlto() / 8);

		this.obtenerActoresConEtiqueta("Churrasco").forEach(churrasco => {
			churrasco.aprender(Flotar, { Desvio: 5 });
			churrasco.escala *= this.escalaSegunCuadricula(1.2) * 0.85;
		});

		this.obtenerActoresConEtiqueta("Obstaculo").forEach(obstaculo => {
			obstaculo.escala *= this.escalaSegunCuadricula(1.1);
		});
	}

	mapearIdentificadorAActor(id, nroFila, nroColumna) : ActorAnimado {
		switch(id) {
			case 'A': return this.automata;
			case 'O': return this.obtenerObstaculo(nroFila, nroColumna);
			case 'P': return new Churrasco();
			default: throw new Error("El identificador '" + id +
				"' no es válido en una escena de Duba.");
		}
	}

	obtenerAutomata(): Duba {
		return new Duba();
	}

	obtenerObstaculo(fila: number, columna: number): Obstaculo {
		let archivosObstaculos = ["obstaculo.duba1.png", "obstaculo.duba2.png", "obstaculo.duba3.png", "obstaculo.duba4.png"];
		return new Obstaculo(archivosObstaculos, (fila + 1) + (fila + 1) * (columna + 1));
	}

	estaResueltoElProblema(): boolean {
		return (this.contarActoresConEtiqueta("Churrasco")) === 0 &&
			(this.xFinal === undefined || this.automata.casillaActual().sos(this.xFinal, this.yFinal));
	}

	archivoFondo() {
		return "fondo.duba.png";
	}
	cuadriculaX() {
		return 0;
	}
	cuadriculaY() {
		return -20;
	}
	opsCuadricula() {
		return { ancho: 340, alto: 380 };
	}
	opsCasilla() {
		return {
			grilla: 'casillas.duba.png',
			cantFilas: 1,
			cantColumnas: 16,
			bordesDecorados: true,
			relAspecto: 1,
		};
	}
}

class EscenaDuba1 extends EscenaDuba {

	constructor() {
		super(`[[O,O,O,O,O,O],\
			   	[O,-,-,-,O,-],\
			   	[-,A,-,-,P,-],\
			   	[-,-,-,O,-,-],\
			   	[O,O,O,O,-,O]]`)
	}

}

class EscenaDuba2 extends EscenaDuba {

	constructor() {
		super(`[[O,O,O,O,O,O],\
         		[O,O,O,O,O,O],\
         		[O,-,O,-,P,O],\
         		[O,-,A,-,O,O],\
         		[O,O,-,O,O,O],\
         		[O,O,O,O,O,O]]`)
	}

}

class EscenaDuba3 extends EscenaDuba {

	constructor() {
		super(`[[O,O,O,O,O,O],\
				[O,O,O,O,O,O],\
				[O,A,O,-,-,O],\
				[O,-,-,-,P,O],\
				[O,-,O,-,-,O],\
				[O,O,O,O,O,O]]`)
	}

}

class EscenaDuba4 extends EscenaDuba {

	constructor() {
		super(`[[O,O,O,O,O,O],\
				[O,-,A,O,O,O],\
				[O,O,-,O,O,O],\
				[O,O,-,-,-,O],\
				[O,O,O,P,-,O],\
				[O,O,O,O,O,O]]`)
	}

}

class EscenaDuba5 extends EscenaDuba {

	constructor() {
		super(`[[O,O,O,O,O,O],\
				[O,O,-,O,-,O],\
				[O,-,A,-,-,O],\
				[O,-,-,O,-,O],\
				[O,O,-,-,P,O],\
				[O,O,O,O,O,O]]`)
	}

}

class EscenaDuba6 extends EscenaDuba {

	constructor() {
		super(`[[O,O,O,O,O,O],\
				[O,-,-,-,-,O],\
				[O,-,O,P,-,O],\
				[O,A,O,-,O,O],\
				[O,O,O,O,O,O],\
				[O,O,O,O,O,O]]`)
	}

}

class EscenaDuba7 extends EscenaDuba {

	constructor() {
		super(`[[O,O,O,O,O,O],\
				[O,P,O,-,-,O],\
				[O,-,O,-,-,-],\
				[O,-,-,-,O,A],\
				[O,O,O,O,O,O],\
				[O,O,O,O,O,O]]`)
	}

}

class EscenaDuba8 extends EscenaDuba {

	constructor() {
		super(`[[O,O,O,O,O,O],\
        		[O,-,-,O,O,O],\
        		[O,-,P,O,O,O],\
        		[O,-,-,O,O,O],\
        		[O,-,-,-,A,O],\
        		[O,O,O,O,O,O]]`)
	}

}

class EscenaDuba9 extends EscenaDuba {

	constructor() {
		super(`[[O,O,O,O,O,O],\
        		[O,P,O,A,O,O],\
        		[O,-,O,-,O,O],\
        		[O,-,-,-,O,O],\
        		[O,-,-,O,O,O],\
        		[O,O,O,O,O,O]]`)
	}

}

class EscenaDuba10 extends EscenaDuba {

	constructor() {
		super(`[[O,O,O,O,O,O],\
        		[O,O,-,-,-,O],\
        		[O,-,P,-,-,O],\
        		[O,-,O,O,O,O],\
        		[O,-,-,A,-,O],\
        		[O,O,O,O,O,O]]`)
	}

}