/// <reference path = "EscenaDuba.ts" />
/// <reference path = "EscenaCoty.ts" />
/// <reference path = "EscenaLita.ts" />
/// <reference path = "EscenaTotoLector.ts" />
/// <reference path = "EscenaTotoEscritor.ts" />

class EscenaDubaFondoBlanco extends EscenaDuba {

	public archivoFondo(): string {
		return "fondo.blanco.png";
	}

}

class EscenaCotyFondoBlanco extends EscenaCoty {

	public static pathFondo(): string {
		return "fondo.blanco.png";
	}

}

class EscenaLitaFondoBlanco extends EscenaLita {

	public archivoFondo(): string {
		return "fondo.blanco.png";
	}

}

class EscenaTotoLectorFondoBlanco extends EscenaTotoLector {

	public archivoFondo(): string {
		return "fondo.blanco.png";
	}

}

class EscenaTotoEscritorFondoBlanco extends EscenaTotoEscritor {

	public archivoFondo(): string {
		return "fondo.blanco.png";
	}

}
