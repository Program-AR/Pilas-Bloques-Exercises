/// <reference path = "ElMonoQueSabeContar.ts" />

class ElMonoCuentaDeNuevo extends ElMonoQueSabeContar {
	private automataObservado: any
	private tablero: Tablero

	public iniciar(): void { // TODO: DEMASIADO SELF MODIFICATION E INTROSPECTION
		super.iniciar()
		this.tablero = new Tablero(0, 210, { texto: "Largo Columna Actual", atributoObservado: 'largoColumnaActual2' })
		this.automataObservado = this.getAutomata()
		Trait.toObject(Observado, this.automataObservado)
		this.automataObservado.largoColumnaActual2 = function () { return this.largoColumnaActual() - 1 }
		this.automataObservado.registrarObservador(this.tablero)
		this.automataObservado.setCasillaActualViejo = this.getAutomata().setCasillaActual
		this.automataObservado.setCasillaActual = function (c, m) {
			this.setCasillaActualViejo(c, m)
			this.changed()
		}
		this.automataObservado.changed()
	}

	public cambiarImagenesFin(): void {
		//No hace nada
	}

}
