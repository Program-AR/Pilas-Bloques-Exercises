/// <reference path = "../../node_modules/pilasweb/dist/pilasweb.d.ts"/>
/// <reference path = "ActorAnimado.ts"/>
/// <reference path = "Cuadricula.ts"/>

/**
 * @class Casilla
 * Este actor no puede funcionar sólo. Siempre funciona y es creado desde
 * el actor Cuadricula. Todo su comportamiento depende de ella.
 */

class Casilla extends ActorAnimado {
    cuadricula;
    nroFila;
    nroColumna;
    actores;

    static imagenesPara(actor): string[] {
        return [`casillas.${actor}.png`];
    }

    static imagenesPreCarga(): string[] {
        //Como las casillas dependen del actor, se debería usar imagenesPara(actor) para obtener las imágenes.
        throw "Casilla.imagenesPreCarga() is useless. Should use Casilla.imagenesPara(actor)"
    }

    constructor(nroF, nroC, cuadricula) {
        this.cuadricula = cuadricula;
        this.nroFila = nroF;
        this.nroColumna = nroC;
        this.actores = [];

        let opciones = cuadricula.getOpcionesCasilla();
        if (opciones.bordesDecorados) {
            opciones.cuadrosParado = [this.cuadroSegunPosicion()];
            opciones.cuadrosCorrer = opciones.cuadrosParado;
        }

        super(0, 0, opciones);

        this.reubicate();
    }

    reubicate() {
        this.actualizarAncho();
        this.actualizarAlto();
        this.reubicarEnX();
        this.reubicarEnY();
    }

    reubicarEnX() {
        this.x =
            this.cuadricula.izquierda +
            (this.ancho / 2) +
            (this.nroColumna * (this.ancho + this.cuadricula.separacion()));
    }

    reubicarEnY() {
        this.y =
            this.cuadricula.arriba -
            (this.alto / 2) -
            (this.nroFila * (this.alto + this.cuadricula.separacion()));
    }

    actualizarAncho() {
        this.ancho = this.cuadricula.anchoCasilla();
    }

    actualizarAlto() {
        this.alto = this.cuadricula.altoCasilla();
    }

    casillaASuDerecha() {
        return this.cuadricula.casilla(this.nroFila, this.nroColumna + 1);
    }
    casillaASuIzquierda() {
        return this.cuadricula.casilla(this.nroFila, this.nroColumna - 1);
    }
    casillaDeArriba() {
        return this.cuadricula.casilla(this.nroFila - 1, this.nroColumna);
    }
    casillaDeAbajo() {
        return this.cuadricula.casilla(this.nroFila + 1, this.nroColumna);
    }


    casillaTodoADerecha() {
        return this.cuadricula.casilla(this.nroFila, this.cuadricula.cantColumnas - 1);
    }
    casillaTodoAIzquierda() {
        return this.cuadricula.casilla(this.nroFila, 0);
    }
    casillaTodoArriba() {
        return this.cuadricula.casilla(0, this.nroColumna);
    }
    casillaTodoAbajo() {
        return this.cuadricula.casilla(this.cuadricula.cantFilas - 1, this.nroColumna);
    }


    hayArriba(): boolean {
        return this.cuadricula.hayArriba(this);
    }

    hayAbajo(): boolean {
        return this.cuadricula.hayAbajo(this);
    }

    hayIzquierda(): boolean {
        return this.cuadricula.hayIzquierda(this);
    }

    hayDerecha(): boolean {
        return this.cuadricula.hayDerecha(this);
    }

    sos(nroF, nroC) {
        return (nroF === null || nroF === this.nroFila) &&
            (nroC === null || nroC === this.nroColumna);
    }

    esEsquina() {
        return this.sos(0, 0) ||
            this.sos(0, this.cuadricula.cantColumnas - 1) ||
            this.sos(this.cuadricula.cantFilas - 1, 0) ||
            this.sos(this.cuadricula.cantFilas - 1, this.cuadricula.cantColumnas - 1);
    }

    public esFin(): boolean {
        return this.cuadricula.esFin(this);
    }

    public esInicio(): boolean {
        return this.cuadricula.esInicio(this);
    }

    // Este método sólo genera una referencia entre la casilla y el actor.
    // Si quiero generar la relación bidireccional no debo usar este, sino actor.setCasillaActual(c).
    agregarActor(unActor) {
        this.actores.push(unActor);
    }

    eliminarActor(unActor) {
        this.actores.splice(this.actores.indexOf(unActor), 1);
    }

    estaLibre(): boolean {
        return this.actores.length == 0;
    }

    tieneActorConEtiqueta(unaEtq) {
        return this.actores.some(actor => actor.tiene_etiqueta(unaEtq))
    }

    actoresConEtiqueta(unaEtq) {
        return this.actores.filter(actor => actor.tiene_etiqueta(unaEtq));
    }

    cuadroSegunPosicion(): number {
        return 8 * Number(!this.hayArriba())
            + 4 * Number(!this.hayIzquierda())
            + 2 * Number(!this.hayAbajo())
            + Number(!this.hayDerecha());
    }

    cambiarImagen(nombre, cantFilas = 1, cantColumnas = 1) { // TODO: FEOOOOOOO bugfix setter imagen del actor
        // PARCHEEEEE
        this.renacer(nombre, cantFilas, cantColumnas);
    }

    renacer(nombreImagen, cantFilas = 1, cantColumnas = 1) { // TODO: FEOOOOOOO bugfix setter imagen del actor
        // POR FAVOR YO FUTURO PERDONAME
        this.eliminar();

        var opsCasilla = {
            grilla: this.cuadricula.opcionesCasilla.grilla,
            cantFilas: this.cuadricula.opcionesCasilla.cantFilas,
            cantColumnas: this.cuadricula.opcionesCasilla.cantColumnas,
        };


        this.cuadricula.opcionesCasilla.grilla = nombreImagen;
        this.cuadricula.opcionesCasilla.cantFilas = cantFilas;
        this.cuadricula.opcionesCasilla.cantColumnas = cantColumnas;

        var nuevoYo = new Casilla(this.nroFila, this.nroColumna, this.cuadricula);

        this.cuadricula.opcionesCasilla.grilla = opsCasilla.grilla;
        this.cuadricula.opcionesCasilla.cantFilas = opsCasilla.cantFilas;
        this.cuadricula.opcionesCasilla.cantColumnas = opsCasilla.cantColumnas;

        this.cuadricula.reemplazarCasilla(this, nuevoYo);
    }
}
