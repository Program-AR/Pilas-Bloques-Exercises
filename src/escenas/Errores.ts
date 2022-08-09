// Esto es una clara chanchada. No sé cómo usar el Error original desde Typescript

class ActividadError implements Error {
	//Modificar el message, etc.
	public name: string;
	public message: string;
	public nombreAnimacion: string; // La animación que ejecutará el autómata mientras se dice el error

	constructor(message: string = "", nombreAnimacion: string = "error") {
		this.name = "ActividadError"
		this.message = message;
		this.nombreAnimacion = nombreAnimacion;
	};
}

class ProductionErrorHandler {
	escena: EscenaActividad;

	constructor(escena) {
		this.escena = escena;
	}

	handle(e: Error){
		if(e instanceof ActividadError){
			this.escena.automata.eliminar_comportamientos();
			this.escena.automata.informarError(e);
			this.informParent(e);
		} else {
			this.informParent(e);
			throw e;
		}
	}

	informParent(e: Error) {
		parent?.postMessage(
			{tipo: "error", error: e}, 
			window.location.origin
		);
	}
}
