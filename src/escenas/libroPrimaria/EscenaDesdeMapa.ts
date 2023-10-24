/// <reference path = "../../../node_modules/pilasweb/dist/pilasweb.d.ts" />
/// <reference path = "../../../dependencias/helpers.d.ts" />
//// <reference types = "nearley" /> // Requiere TypeScript ^2.0.0. Solución por ahora:
/// <reference path = "../../../dependencias/nearley.d.ts" />
/// <reference path = "../EscenaActividad.ts" />
/// <reference path = "../../actores/Cuadricula.ts" />

type MapaEscena = Array<Array<string>>;
declare var grammar: nearley.CompiledRules; // Header para la gramática, que se toma desde ../../../parserAleatorio/gramticaAleatoria.js

type GridSpec = {
    spec: Spec,
    specOptions?: opcionesMapaAleatorio
}

type Spec = string | string[]

/**
 * Esta escena consta de una cuadrícula que se llena de actores automáticamente
 * a partir de un mapa, es decir, una matriz que la describe.  
 * Se pensó originalmente para realizar un camino al estilo de las actividades
 * iniciales de code.org, con varios obstáculos.
 * 
 * Los mapas son matrices de dos dimensiones. Cada elemento puede ser un string,
 * que es el identificador del actor que irá en cada casilla.  
 * Por ejemplo, se puede usar una letra 'A' para identificar al autómata.  
 * Los strings vacíos y el caracter espacio ' ' significa "casilla libre".
 * TODO: Cambiar por '-'.
 */

abstract class EscenaDesdeMapa extends EscenaActividad {
    mapaEscena: MapaEscena;
    generadorDeMapas: GeneradorDeMapas;

    /**
     * @param generadorDeMapas El generador que se utilizará para obtener mapas para la actividad.
     */
    constructor(generadorDeMapas?: GeneradorDeMapas) {
        super();
        this.generadorDeMapas = generadorDeMapas;
    }

    static imagenesAdicionales(): string[] {
        return [Casilla, Obstaculo, MetaFinal].map(clase => clase.imagenesPara(this.nombreAutomata())).reduce((acc, list) => list.concat(acc), []);
    }

    /**
     * Devuelve el nombre del automata, usado para la precarga de metas finales, obstaculos y casillas
     * Pensado para redefinirse por escena.
     */
    static nombreAutomata() {
        return ''
    }

    initDesdeMapa(mapa: MapaEscena) {
        this.generadorDeMapas = new GeneradorDeMapasSimple(mapa);
    }

    initDesdeArrayDeMapas(mapas: Array<MapaEscena>) {
        var generadores: Array<GeneradorDeMapasSimple>
            = mapas.map(m => new GeneradorDeMapasSimple(m));
        this.generadorDeMapas = new GeneradorDeMapasArray(generadores);
    }

    initDesdeDescripcion(descripcion: string, opciones?: opcionesMapaAleatorio) {
        this.generadorDeMapas = new GeneradorDeMapasAleatorios(descripcion, opciones);
    }

    initDesdeArrayDeDescripciones(descripciones: Array<string>, opciones?: opcionesMapaAleatorio) {
        var generadores: Array<GeneradorDeMapasAleatorios>
            = descripciones.map(d => new GeneradorDeMapasAleatorios(d, opciones));
        this.generadorDeMapas = new GeneradorDeMapasArray(generadores);
    }

    initDesdeUnaOVariasDescripciones(especificacion: Spec, opciones?: opcionesMapaAleatorio, posFinal?: [number, number]) { //Podria recibir un GridSpec directamente
        this.guardarPosicionFinal(posFinal)
        if (Array.isArray(especificacion))
            this.initDesdeArrayDeDescripciones(especificacion, opciones);
        else
            this.initDesdeDescripcion(especificacion, opciones);
    }

    guardarPosicionFinal(posFinal?: [number, number]){
        if (posFinal && this.posicionValida(posFinal)) {
			this.xFinal = posFinal[0];
			this.yFinal = posFinal[1];
		}
    }

    posicionValida(posFinal: [number, number]){
        return posFinal[0] >= 0 && posFinal[1] >= 0
    }

    iniciar(): void {
        this.fondo = new Fondo(this.archivoFondo(), 0, 0);

        this.automata = this.obtenerAutomata();

        if (this.generadorDeMapas) {
            this.mapaEscena = this.generadorDeMapas.obtenerMapa();
        }
        else
            throw Error("Esta escena no fue correctamente inicializada con un generador de mapas");

        this.cuadricula = this.construirCuadricula(this.mapaEscena);

        this.agregarCasillaFinalSiLaTiene();
        this.automata.enviarAlFrente();
        this.ajustarGraficos();
    }

    protected construirCuadricula(mapa: MapaEscena): Cuadricula {
        const matrizBooleana = mapa.map(fila => fila.map(casilla => casilla === '_' ? 'F' : 'T'))
        const cuadricula: CuadriculaEsparsa = new CuadriculaEsparsa(this.cuadriculaX(), this.cuadriculaY(), this.opsCuadricula(), this.opsCasilla(), matrizBooleana);
        cuadricula.forEachCasilla(casilla => this.llenarCasilla(cuadricula, casilla, mapa));
        return cuadricula;
    }

    casillaFinal(): Casilla {
        return this.cuadricula.casilla(this.yFinal, this.xFinal)
    }

    agregarCasillaFinalSiLaTiene(): void {
        if (this.tienePosicionFinal()) {
            const actor = new MetaFinal((this.constructor as typeof EscenaDesdeMapa).nombreAutomata())
            this.cuadricula.agregarActorEnCasilla(actor, this.casillaFinal(), true)
            this.ajustarMeta(actor)
        }
    }

    ajustarMeta(meta){
        meta.escala *= this.escalaSegunCuadricula(0.7);
        meta.ajustarSegunCuadricula(this.cuadricula.getOpcionesCasilla().alto)
        if(this.casillaFinal().tieneMasDeUnActor()) meta.enviarAtras() //en el caso de que haya un premio, debe ir atrás de este
    }

    llenarCasilla(cuadricula: Cuadricula, casilla: Casilla, mapa: MapaEscena): void {
        let nroFila: number = casilla.nroFila;
        let nroColumna: number = casilla.nroColumna;
        let ids: string[] = mapa[nroFila][nroColumna].split("&");
        ids.forEach(id => {
            if (id != '' && id != ' ' && id != '-' && id != '_') { // si no es casilla libre
                let actor = this.mapearIdentificadorAActor(id, nroFila, nroColumna);
                cuadricula.agregarActorEnCasilla(actor, casilla, true);
            }
        })
    }

    estaResueltoElProblema(): Boolean {
        return this.estaEnPosicionFinalSiLaTiene()
    }

    /**
     * Indica si el mapa es distinto cada vez que se ejecuta la escena.
     */
    tieneAleatoriedad(): boolean {
        return this.generadorDeMapas.tieneAleatoriedad();
    }

    /**
     * Crea y devuelve el autómata de la actividad.
     */
    abstract obtenerAutomata(): ActorAnimado;

    /**
     * Recibe un identificador y crea y devuelve el actor que le corresponde.
     * Importante: el actor debe crearse AL LLAMAR A ESA FUNCION, y no antes.
     * La función recibe además el número de fila y el número de columna
     * de la casilla donde se colocará el actor.
     */
    abstract mapearIdentificadorAActor(
        id: string,
        nroFila: number,
        nroColumna: number
    ): ActorAnimado;

    /**
     * Se puede sobreescribir esta función para definir acciones que se realizarán
     * justo después de iniciar la escena para mejorar su aspecto visual. Por ejemplo,
     * ajustar la escala o la posición de los actores. Por defecto, no hace nada.
     */
    ajustarGraficos(): void { };

    /** Devuelve el path del archivo que se usará como fondo de la escena. */
    abstract archivoFondo(): string;

    /** Devuelve la posición en el eje X de la cuadrícula. Se puede sobreescribir. */
    cuadriculaX(): number { return 0; }

    /** Devuelve la posición en el eje X de la cuadrícula. Se puede sobreescribir. */
    cuadriculaY(): number { return 0; }

    /** Devuelve las opciones que se usarán para crear la cuadrícula. Se puede sobreescribir. */
    opsCuadricula(): any { return {}; }

    /** Devuelve las opciones que se usarán para crear la casilla. Se puede sobreescribir. */
    opsCasilla(): any { return { grilla: 'invisible.png' }; }
}

/**
 * Genera los mapas que utiliza una EscenaDesdeMapa.
 */
interface GeneradorDeMapas {
    /** Genera un mapa de escena. */
    obtenerMapa(): MapaEscena;
    /** Indica si los mapas generados varían con cada ejecución. */
    tieneAleatoriedad(): boolean;
}

/**
 * Este generador se inicializa con un mapa y devuelve siempre dicho mapa.
 */
class GeneradorDeMapasSimple implements GeneradorDeMapas {
    constructor(private mapa: MapaEscena) { }
    obtenerMapa() { return this.mapa; }
    tieneAleatoriedad() { return false; }
}

/**
 * Este generador se inicializa desde un array de mapas.
 * Cada vez que se le pide un mapa, elige uno de ellos al azar.
 */
class GeneradorDeMapasArray implements GeneradorDeMapas {
    constructor(private generadores: Array<GeneradorDeMapas>) { }
    obtenerMapa() { return Math.randomFrom(this.generadores).obtenerMapa(); }
    tieneAleatoriedad() { return this.generadores.length > 1 || this.generadores[0].tieneAleatoriedad(); }
}

/**
 * Generador complejo que permite crear mapas con aleatoriedad a partir de
 * strings descriptivos.
 * El string debe consistir en una matriz de strings (pueden omitirse las comillas)
 * representando cada una de las casillas del mapa. El contenido de cada casilla
 * puede ser de los siguientes tipos:
 * - Un identificador de la forma `[a-zA-Z0-9]+`, que será interpretado según lo
 *   indique cada escena.
 * - El caracter especial `$`, que indica "tomar al azar un elemento de la bolsa".
 *   La bolsa es un array de identificadores que se provee al crear el generador.
 *   Opcionalmente, el caracter puede ir seguido de un identificador; esto permite
 *   indicar varias bolsas distintas.
 * - El caracter especial `*`, que indica "considerar esta casilla al repartir
 *   los elementos de la colección". La colección es un array de identificadores que
 *   se provee al crear el generador. Cuando se crea un mapa, estos elementos son
 *   distribuidos al azar (respetando las apariciones de cada uno) entre las casillas
 *   marcadas de esta manera. Al igual que `$`, puede ir seguido de un identificador.
 * - El caracter especial `-`, que indica una casilla vacía.
 * - Puede usarse el modificador `?` para indicar que un elemento puede ser omitido
 *   de manera aleatoria. Opcionalmente puede usarse `?(p)`, donde p es la probabilidad
 *   de que aparezca el elemento. De lo contrario, se usa el valor por defecto
 *   configurado en el generador.
 * - Pueden proveerse múltiples opciones para una casilla, de la forma
 *   `opcion1|opcion2|...|opcionN`.
 * - Puede indicarse que una casilla se intente llenar con determinado contenido y,
 *   de quedar vacía, se pruebe con un contenido distinto, de la forma
 *   `opcion1>opcion2>...>opcionN`.
 * - Pueden usarse macros, de la forma `#identificador`, que serán expandidas a la
 *   string indicada en la opción `macros`.
 */
class GeneradorDeMapasAleatorios implements GeneradorDeMapas {
    generadoresDeSemillas: Array<Array<GeneradorDeCasilla>>;
    _probaPorDefecto: number;
    bolsa: Array<string>;
    bolsas: { [id: string]: Array<string> };
    coleccion: Array<string>;
    colecciones: { [id: string]: Array<string> };
    macros: { [id: string]: string };

    // Se usan durante la generación de un mapa
    _anotadosParaColeccion: Array<SemillaDeCasilla>;
    _anotadosParaColecciones: { [id: string]: Array<SemillaDeCasilla> };
    _semillasEncoladas: Array<{ pos: [number, number], semilla: SemillaDeCasilla }> = [];
    _posActual: [number, number] = [0, 0];

    /**
     * @param descripcionDeMapa String descriptivo de los mapas que generará el generador.
     * @param opciones Parámetros adicionales. Se pueden definir:
     *  - `probaPorDefecto`: La probabilidad considerada para el modificador `?`.
     *  - `bolsa`: La bolsa de elementos para las casillas señaladas con `$`.
     *  - `bolsas`: Diccionario de bolsas para utilizar `$` con identificadores.
     *  - `coleccion`: La colección de elementos para las casillas señaladas con `*`.
     *  - `colecciones`: Diccionario de colecciones para utilizar `$` con identificadores.
     */
    constructor(descripcionDeMapa: string, opciones: opcionesMapaAleatorio = {}) {
        this.configurar(opciones);
        this.generadoresDeSemillas = <GeneradorDeCasilla[][]>GeneradorDeMapasAleatorios.parsear(descripcionDeMapa);
    }

    private configurar(opciones: opcionesMapaAleatorio) {
        this._probaPorDefecto = opciones.probaPorDefecto || 0.5;
        this.bolsa = opciones.bolsa || [];
        this.bolsas = opciones.bolsas || {};
        this.coleccion = opciones.coleccion || [];
        this.colecciones = opciones.colecciones || {};
        this.macros = opciones.macros || {};
        this._anotadosParaColeccion = [];
        this._anotadosParaColecciones = {};
        for (const id in this.colecciones) {
            this._anotadosParaColecciones[id] = [];
        }
    }

    obtenerMapa() {
        // Primera pasada
        var semillas: Array<Array<SemillaDeCasilla>> =
            this.generadoresDeSemillas.map(fila => fila.map(
                semilla => semilla.generarSemillaDeCasilla(this)
            ));
        this.repartirElementosDeColecciones();
        // Segunda pasada
        var mapa: MapaEscena = semillas.map((fila, i) => fila.map(
            (semilla, j) => semilla.germinar(this, [i, j])
        ));
        // Pasadas adicionales
        while (this._semillasEncoladas.length > 0) {
            this.repartirElementosDeColecciones();
            var semillasEncoladas = this._semillasEncoladas;
            this._semillasEncoladas = [];
            semillasEncoladas.forEach(e => {
                const contenidoOriginal = mapa[e.pos[0]][e.pos[1]]
                const nuevoContenido = e.semilla.germinar(this, e.pos)
                mapa[e.pos[0]][e.pos[1]] = `${contenidoOriginal}&${nuevoContenido}`;
            }, this);
        }
        this.vaciarAnotadosParaColecciones();
        return mapa;
    }

    /** Se utiliza durante la obtención del mapa, para realizar pasadas extra */
    encolarSemilla(pos: [number, number], semilla: SemillaDeCasilla) {
        this._semillasEncoladas.push({ pos: pos, semilla: semilla });
    }

    tieneAleatoriedad(): boolean {
        return this.generadoresDeSemillas.some(fila => fila.some(
            semilla => semilla.esAleatorioPara(this)
        ));
    }

    probaPorDefecto(): number {
        return this._probaPorDefecto;
    }

    dameUnoDeLaBolsa(idBolsa?: string): string {
        var bolsa: Array<string> = idBolsa ? this.bolsas[idBolsa] : this.bolsa;
        return Math.randomFrom(bolsa);
    }

    anotarParaLaColeccion(semilla: SemillaDeCasilla, idColeccion?: string): void {
        var dondeAnotar: Array<SemillaDeCasilla> = idColeccion ?
            this._anotadosParaColecciones[idColeccion] : this._anotadosParaColeccion;
        dondeAnotar.push(semilla);
    }

    private repartirElementosDeColecciones(): void {
        this.repartirElementos(this.coleccion, this._anotadosParaColeccion);
        for (const id in this.colecciones) {
            this.repartirElementos(this.colecciones[id], this._anotadosParaColecciones[id]);
        }
    }

    private repartirElementos(coleccion: Array<string>, semillas: Array<SemillaDeCasilla>) {
        coleccion.forEach(elemento => {
            if (semillas.length > 0)
                Math.takeRandomFrom(semillas).definir(elemento);
        });
    }

    private vaciarAnotadosParaColecciones() {
        this._anotadosParaColeccion.splice(0);
        for (const id in this._anotadosParaColecciones) {
            this._anotadosParaColecciones[id].splice(0);
        }
    }

    obtenerGeneradorParaMacro(idMacro: string) {
        return <GeneradorDeCasilla>GeneradorDeMapasAleatorios.parsear(this.macros[idMacro]);
    }

    static parsear(string): Array<Array<GeneradorDeCasilla>> | GeneradorDeCasilla {
        var parser: nearley.Parser
            = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));
        parser.feed(string);
        return parser.results[0];
    }
}

type opcionesMapaAleatorio = {
    probaPorDefecto?: number,
    bolsa?: Array<string>,
    bolsas?: { [id: string]: Array<string> },
    coleccion?: Array<string>,
    colecciones?: { [id: string]: Array<string> },
    macros?: { [id: string]: string },
}

/**
 * Los generadores de casillas son creados por el parser a partir de las descripciones
 * de mapas aleatorios. Un GeneradorDeMapasAleatorios cuenta con una matriz de estos
 * generadores. Cada uno de ellos es capaz de producir el contenido casilla de manera aleatoria.
 */
interface GeneradorDeCasilla {
    /**
     * Produce una semilla desde la que puede obtenerse el contenido de una casilla.
     * Las semillas son necesarias como paso intermedio porque a veces el contenido definitivo
     * de una casilla no puede determinarse hasta que se haya construido todo el mapa.
     */
    generarSemillaDeCasilla(generador: GeneradorDeMapasAleatorios): SemillaDeCasilla;
    /**
     * Indica si este generador produce resultados aleatorios al ser utilizado
     * con un generador de mapas en particular. 
     */
    esAleatorioPara(generador: GeneradorDeMapasAleatorios): boolean;
}

/**
 * Contenedor temporal para la string que representará el contenido de una casilla 
 * de un mapa. Se utiliza durante el proceso de generación de un mapa aleatorio.
 */
class SemillaDeCasilla {
    contenido: string;
    generadoresExtra: Array<GeneradorDeCasilla> = [];
    constructor(contenido?: string) { this.definir(contenido); }
    definir(contenido?: string) { this.contenido = contenido || "-"; }
    encolarGeneradoresExtra(generadores: Array<GeneradorDeCasilla>) {
        this.generadoresExtra = this.generadoresExtra.concat(generadores);
        return this;
    }
    seraVacia(): boolean { return this.contenido == "-"; }
    germinar(generador: GeneradorDeMapasAleatorios, pos: [number, number]): string {
        if (this.seraVacia() && this.generadoresExtra.length > 0) {
            var semillaSiguiente: SemillaDeCasilla
                = (this.generadoresExtra.splice(0, 1)[0].generarSemillaDeCasilla(generador));
            semillaSiguiente.encolarGeneradoresExtra(this.generadoresExtra);
            generador.encolarSemilla(pos, semillaSiguiente);
        }
        return this.contenido;
    };
}

class SemillaCompuesta extends SemillaDeCasilla {
    semillas: SemillaDeCasilla[]

    constructor(semillas: SemillaDeCasilla[]) {
        super();
        this.semillas = semillas;
    }

    public seraVacia(): boolean {
        return this.semillas.every(semilla => semilla.seraVacia())
    }

    public germinar(generador: GeneradorDeMapasAleatorios, pos: [number, number]): string {
        return this.semillas.map(semilla => semilla.germinar(generador, pos)).join("&")
    }
}

/** Corresponde a identificadores de la forma `[a-zA-Z0-9]+`. */
class GeneradorDeCasillaSimple implements GeneradorDeCasilla {
    constructor(private id: string) { }
    generarSemillaDeCasilla(generador: GeneradorDeMapasAleatorios): SemillaDeCasilla { return new SemillaDeCasilla(this.id); }
    esAleatorioPara(generador: GeneradorDeMapasAleatorios): boolean { return false; }
}

/** Corresponde a las casillas indicadas con `$` y `$(id)`. */
class GeneradorDeCasillaBolsa implements GeneradorDeCasilla {
    constructor(private idBolsa?: string) { }
    generarSemillaDeCasilla(generador: GeneradorDeMapasAleatorios): SemillaDeCasilla {
        return new SemillaDeCasilla(generador.dameUnoDeLaBolsa(this.idBolsa));
    }
    // Por simplicidad se devuelve siempre true, aunque en rigor puede no ser correcto.
    // Se asume que si se está usando esta funcionalidad, el mapa es lo suficientemente
    // complejo como para tener aleatoriedad.
    esAleatorioPara(generador: GeneradorDeMapasAleatorios) { return true; }
}

/** Corresponde a las casillas indicadas con `*` y `*(id)`. */
class GeneradorDeCasillaColeccion implements GeneradorDeCasilla {
    constructor(private idColeccion?: string) { }
    generarSemillaDeCasilla(generador: GeneradorDeMapasAleatorios): SemillaDeCasilla {
        var semilla: SemillaDeCasilla = new SemillaDeCasilla();
        generador.anotarParaLaColeccion(semilla, this.idColeccion);
        return semilla;
    }
    // Por simplicidad. Ver GeneradorDeCasillaBolsa.esAleatorioPara.
    esAleatorioPara(generador: GeneradorDeMapasAleatorios) { return true; }
}

/** Corresponde a las casillas indicadas con `-`. */
class GeneradorDeCasillaVacia implements GeneradorDeCasilla {
    generarSemillaDeCasilla(generador: GeneradorDeMapasAleatorios): SemillaDeCasilla { return new SemillaDeCasilla('-'); }
    esAleatorioPara(generador: GeneradorDeMapasAleatorios): boolean { return false; }
}

/** Corresponde a las casillas indicadas con `_`. */
class GeneradorDeCasillaNula implements GeneradorDeCasilla {
    generarSemillaDeCasilla(generador: GeneradorDeMapasAleatorios): SemillaDeCasilla { return new SemillaDeCasilla('_'); }
    esAleatorioPara(generador: GeneradorDeMapasAleatorios): boolean { return false; }
}

/** Corresponde al modificador `?` (recursivo). */
class GeneradorDeCasillaMaybe implements GeneradorDeCasilla {
    constructor(private generadorInterno: GeneradorDeCasilla, private proba?: number) { }
    generarSemillaDeCasilla(generador: GeneradorDeMapasAleatorios): SemillaDeCasilla {
        var proba: number = this.proba || generador.probaPorDefecto();
        if (Math.random() < proba)
            return this.generadorInterno.generarSemillaDeCasilla(generador);
        else
            return new SemillaDeCasilla('-');
    }
    esAleatorioPara(generador): boolean {
        var proba: number = this.proba || generador.probaPorDefecto();
        return 0 < proba && proba < 1;
    }
}
class GeneradorDeCasillaAnd implements GeneradorDeCasilla {
    constructor(private generador1: GeneradorDeCasilla, private generador2: GeneradorDeCasilla) { }

    generarSemillaDeCasilla(generador: GeneradorDeMapasAleatorios): SemillaDeCasilla {
        const semilla1: SemillaDeCasilla = this.generador1.generarSemillaDeCasilla(generador)
        const semilla2: SemillaDeCasilla = this.generador2.generarSemillaDeCasilla(generador)
        return new SemillaCompuesta([semilla1, semilla2])
    }

    esAleatorioPara(generador): boolean {
        return this.generador1.esAleatorioPara(generador) || this.generador2.esAleatorioPara(generador)
    }
}

/** Corresponde al modificador `|` (recursivo). */
class GeneradorDeCasillaOpcion implements GeneradorDeCasilla {
    constructor(private opciones: Array<GeneradorDeCasilla>) { }
    generarSemillaDeCasilla(generador: GeneradorDeMapasAleatorios): SemillaDeCasilla {
        return Math.randomFrom(this.opciones)
            .generarSemillaDeCasilla(generador);
    }
    esAleatorioPara(generador: GeneradorDeMapasAleatorios) {
        return this.opciones.length > 1;
    }
}

/** Corresponde al modificador `>` (recursivo). */
class GeneradorDeCasillaSucesion implements GeneradorDeCasilla {
    constructor(private opciones: Array<GeneradorDeCasilla>) { }
    generarSemillaDeCasilla(generador: GeneradorDeMapasAleatorios): SemillaDeCasilla {
        return this.opciones[0].generarSemillaDeCasilla(generador)
            .encolarGeneradoresExtra(this.opciones.splice(1));
    }
    esAleatorioPara(generador: GeneradorDeMapasAleatorios) {
        return this.opciones[0].esAleatorioPara(generador);
    }
}

class GeneradorDeCasillaMacro implements GeneradorDeCasilla {
    constructor(private id: string) { }
    generarSemillaDeCasilla(generador: GeneradorDeMapasAleatorios): SemillaDeCasilla {
        return generador.obtenerGeneradorParaMacro(this.id).generarSemillaDeCasilla(generador);
    }
    esAleatorioPara(generador: GeneradorDeMapasAleatorios) {
        return generador.obtenerGeneradorParaMacro(this.id).esAleatorioPara(generador);
    }
}
