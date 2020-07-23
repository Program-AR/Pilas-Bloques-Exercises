/// <reference path = "../../node_modules/pilasweb/dist/pilasweb.d.ts"/>
/// <reference path="../actores/ObservadoAnimado.ts"/>
/// <reference path = "../actores/ActorAnimado.ts" />
/// <reference path = "ComportamientoAnimado.ts" />
/// <reference path = "../escenas/EstadosDeEscena.ts" />

/**
 * Es un comportamiento genérico con la idea de ser extendido Sus características son:
 * - Si se está tocando con un objeto de etiqueta A: Realizar acciones dependientes de ese objeto.
 * - Caso Contrario: El personaje principal ejecuta un mensaje de error.
 * La escena que lo utiliza debe tener definido automata.
 * Respecto de los argumentos:
 *  - etiqueta: Es obligatorio, es la etiqueta del actor con el que busca interactuar.
 *  - mensajeError: Es el mensaje que aparece cuando no hay un actor con esa etiqueta.
 *  - animacionInteractuadoMientras: Es la animación que se gatilla en el actor interactuado mientras se realiza la interacción.
 *  - animacionInteractuadoAlFinal: Es la animación que se gatilla en el actor interactuado justo luego de terminar la interacción.
 *  - comportamientoAdicional y argumentosComportamiento: Es el comportamiento que se gatilla en el objeto colisionado justo luego de terminar
 * la interacción.
 * Este comportamiento finaliza, y el comportamiento adicional en el actor interactuado continúa.
*/
class Interactuar extends ComportamientoAnimado {

    sanitizarArgumentos(): void {
        super.sanitizarArgumentos()

        if (!this.etiqueta()) {
            throw new ArgumentError("Debe proveerse una etiqueta para verificar interacción")
        }
    }

    configurarVerificaciones(): void {
        const mensajeError: string = this.mensajeDeError() || "¡Acá no hay " + this.hacerLegible(this.etiqueta()) + "!"
        this.verificacionesPre.push(new Verificacion(() => this.hayConQuienInteractuar(), mensajeError))
    }

    preAnimacion(): void {
        super.preAnimacion()
        if (this.animacionInteractuadoMientras()) {
            this.interactuado().cargarAnimacion(this.animacionInteractuadoMientras())
        }
    }

    postAnimacion(): void {
        super.postAnimacion()
        if (this.animacionInteractuadoAlFinal()) {
            this.interactuado().cargarAnimacion(this.animacionInteractuadoAlFinal())
        }
        this.interactuar()
    }

	/**
	 * La etiqueta del actor a interactuar.
	 */
    etiqueta(): string {
        return this.argumentos['etiqueta']
    }

    /**
	 * El nombre de la animación del interactuado mientras interactua.
	 */
    animacionInteractuadoMientras(): string {
        return this.argumentos['animacionInteractuadoMientras']
    }

    /**
	 * El nombre de la animación del interactuado al final de la interacción.
	 */
    animacionInteractuadoAlFinal(): string {
        return this.argumentos['animacionInteractuadoAlFinal']
    }

    /**
	 * Comportamiento adicional post interaccion.
	 */
    comportamientoAdicional(): string {
        return this.argumentos['comportamientoAdicional']
    }

    /**
	 * Argumentos del comportamiento adicional post interaccion.
	 */
    argumentosDelComportamientoAdicional() {
        return this.argumentos['argumentosComportamiento']
    }

	/**
	 * Indica si existe una posible interacción entre dos actores.
	 */
    hayConQuienInteractuar(): boolean {
        return this.interactor().tocando(this.etiqueta())
    }

    /**
	 * Retorna al actor quien realiza la interacción.
	 */
    interactor(): ActorAnimado {
        return this.receptor
    }

	/**
	 * Retorna al actor con el cual se realiza la interacción.
	 */
    interactuado(): ActorAnimado {
        return this.interactor().objetoTocado(this.etiqueta())
    }

	/**
	 * Se llama al realizarse la interacción.
	 */
    protected alInteractuar(): void {

    }

	/**
	 * Realiza la interacción.
	 */
    private interactuar(): void {
        if (this.comportamientoAdicional()) {
            let claseComportamiento: any = window[this.comportamientoAdicional()]
            this.interactuado().hacer_luego(claseComportamiento, this.argumentosDelComportamientoAdicional())
        }
        this.alInteractuar()
    }

    /**
	 * El mensaje de error que se mostrara en caso de error.
	 */
    mensajeDeError(): string {
        return this.argumentos['mensajeError']
    }

    protected hacerLegible(etiqueta: string): string {
        return etiqueta.toLowerCase().split("animada")[0].split("animado")[0]
    }

}