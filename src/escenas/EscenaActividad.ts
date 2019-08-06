/// <reference path = "../../node_modules/pilasweb/dist/pilasweb.d.ts"/>
/// <reference path = "Errores.ts"/>
/// <reference path = "../actores/ActorAnimado.ts"/>
/// <reference path = "EstadosDeEscena.ts"/>

// Esta escena sirve para todas las escenas de Ejercicios Pilas.
// Toda escena que represente una actividad debe heredar de aquí.

class EscenaActividad extends Base {
	public static faltanImagenes: boolean = false
	private fondo: Fondo
	private cuadricula: Cuadricula
	private automata: ActorAnimado
	private estado: Estado = new Estado()
	private errorHandler: ProductionErrorHandler = new ProductionErrorHandler(this)

	/**
	 * Devuelve todos los nombres de archivo de imagen necesarios para
	 * poder correr la escena. De esta forma sólo se precargarán esas imágenes
	 * y no todas las existentes de todas las escenas. 
	 * Es estático porque es necesario antes de la creación de la escena ó sus objetos.
	 */
	static imagenesPreCarga(): string[] {
		var imgsPrecargar = this.pathFondo() ? [this.pathFondo()] : []
		this.clasesDeActoresInvolucrados().forEach(c => imgsPrecargar = imgsPrecargar.concat(c.imagenesPreCarga()))
		var imgs = imgsPrecargar.concat(this.imagenesAdicionales())
		return this.faltanImagenes ? [] : imgs
	}

	/**
	 * Devuelve las clases de los actores que hay en escena. Se le preguntará la imagen a precargar
	 * a cada una de esas clases.
	 * Pensado para redefinirse por escena.
	 */
	static clasesDeActoresInvolucrados(): typeof ActorAnimado[] {
		this.faltanImagenes = true
		return []
	}

	static pathFondo(): string {
		this.faltanImagenes = true
		return ''
	}

	/**
	 * Además de definir las clases de actores involucradas, las escenas pueden agregar 
	 * nombres de archivo de imagen adicionales con este método.
	 * Pensado para redefinirse por escena.
	 */
	static imagenesAdicionales(): string[] {
		return []
	}

	protected setFondo(fondo: Fondo): void {
		this.fondo = fondo
	}

	public getFondo(): Fondo {
		return this.fondo
	}

	protected setCuadricula(cuadricula: Cuadricula): void {
		this.cuadricula = cuadricula
	}

	public getCuadricula(): Cuadricula {
		return this.cuadricula
	}

	protected setAutomata(actor: ActorAnimado): void {
		this.automata = actor
	}

	public getAutomata(): ActorAnimado {
		return this.automata
	}

	protected setEstado(estado: Estado): void {
		this.estado = estado
	}

	public getEstado(): Estado {
		return this.estado
	}

	actualizar(): void {
		try {
			super.actualizar()
		} catch (e) {
			this.errorHandler.handle(e)
		}
	}

	estaResueltoElProblema(): Boolean {
		return this.estado.soyAceptacion()
	}

	// TODO: Deprecar, reemplazar por contarActoresConEtiqueta.
	cantidadObjetosConEtiqueta(etiqueta: String): Number {
		return pilas.obtener_actores_con_etiqueta(etiqueta).length
	}
	personajePrincipal(): ActorAnimado {
		return this.automata
	}

	maxZ(): Number {
		return this.stage.children[0].z
	}

	minZ(): Number {
		return this.stage.children[this.stage.children.length - 1].z
	}

	obtenerActoresConEtiqueta(etiqueta: string): Array<ActorAnimado> {
		return this.obtenerActoresConEtiquetas([etiqueta])
	}

	obtenerActoresConEtiquetas(etiquetas: Array<string>): Array<ActorAnimado> {
		return this.actores.filter(actor => etiquetas.some(etiqueta => actor.tiene_etiqueta(etiqueta)))
	}

	contarActoresConEtiqueta(etiqueta: string): number {
		return this.obtenerActoresConEtiqueta(etiqueta).length
	}

	/**
	 * Computa un multiplicador que crece según la cantidad de filas y columnas de la cuadrícula.
	 * El multiplicador es 1 si la cuadrícula es de 1x1, y crece acotado por maxRatio.
	 * Es útil para aplicar un factor de escala a los elementos cuando las casillas son muy pequeñas.
	 */
	escalaSegunCuadricula(maxRatio: number): number {
		return maxRatio - ((maxRatio - 1) / Math.max(this.cuadricula.cantFilas, this.cuadricula.cantColumnas))
	}
}
