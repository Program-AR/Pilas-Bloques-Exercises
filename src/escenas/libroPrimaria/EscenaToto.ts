/// <reference path = "./EscenaDesdeMapa.ts" />

/**
 * En esta escena, el zorro Toto se mueve por una cuadrícula de letras y las va leyendo.
 * A medida que el zorro lee las letras, estas van apareciendo en otra cuadrícula.
 */
abstract class EscenaToto extends EscenaDesdeMapa {
    textoObjetivo: string;
    topeDeLetras: number;
    cuadriculaSecundaria: Cuadricula; // En esta cuadrícula van apareciendo las letras a medida que Toto lee.

    public static pathFondo(): string {
        return 'fondo.toto.png';
    }

    public static clasesDeActoresInvolucrados(): typeof ActorAnimado[] {
        const actores: typeof ActorAnimado[] = [Toto, LetraTablero]
        return actores.concat(this.clasesDeActoresExtrasToto());
    };

    public static clasesDeActoresExtrasToto(): typeof ActorAnimado[] {
        return []
    }

    public static imagenesAdicionales(): string[] {
        return Casilla.imagenesPara('toto').concat(this.imagenesAdicionalesToto())
    }

    public static imagenesAdicionalesToto(): string[] {
        return []
    }

    /**
     * @param mapaEscena Matriz bidimensional de strings a partir de la cual se crea la escena.
     * Toto se representa con una 'A' mayúscula. Las letras a leer van en minúscula
     * ('a', 'b', etc.). Los strings ' ' y '' representan casillas vacías.
     * @param textoObjetivo El texto que Toto debe leer. 
     * @param topeDeLetras Cantidad máxima de letras que Toto puede leer. Es opcional; por defecto
     * se toma la longitud de `textoObjetivo`.
     */
    constructor(
        mapaEscena: MapaEscena,
        textoObjetivo: string,
        topeDeLetras: number = 0
    ) {
        super(new GeneradorDeMapasSimple(mapaEscena));
        this.textoObjetivo = textoObjetivo;
        this.topeDeLetras = topeDeLetras > 0 ? topeDeLetras : this.textoObjetivo.length;
    }

    iniciar() {
        super.iniciar();

        this.cuadriculaSecundaria = this.construirCuadriculaSecundaria();
        // Toto debe conocer la cuadrícula secundaria (ver comportamiento 'MovimientoConLectura').
        const toto: Toto = this.getAutomata() as Toto
        toto.cuadriculaSecundaria = this.cuadriculaSecundaria;
    }

    ajustarGraficos() {
        this.getAutomata().enviarAlFrente();
        this.getAutomata().setY(this.getAutomata().getY() + this.getAutomata().alto * 0.15);
        this.getAutomata().escala *= this.escalaSegunCuadricula(1.55);
    }

    mapearIdentificadorAActor(id, nroFila, nroColumna): ActorAnimado {
        switch (id) {
            case 'A': return this.getAutomata();
            default: return new LetraTablero(id);
        }
    }

    public abstract obtenerAutomata(): Toto;

    public archivoFondo(): string {
        return "fondo.toto.png";
    }

    public cuadriculaX(): number {
        return 0;
    }

    public cuadriculaY(): number {
        return 80;
    }

    public opsCuadricula() {
        return { ancho: 360, alto: 280 };
    }

    public opsCasilla() {
        return { grilla: "casillas.toto.png", cantColumnas: 16, bordesDecorados: true, relAspecto: 1 };
    }

    public abstract construirCuadriculaSecundaria(): Cuadricula;

    /**
     * Devuelve en forma de string el contenido actual de la cuadrícula secundaria.
     */
    public textoEnCuadriculaSecundaria(): string {
        let texto = "";
        this.cuadriculaSecundaria
            .filterCasillas(casilla => casilla.tieneActorConEtiqueta("Letra"))
            .forEach(casilla =>
                texto += casilla.actoresConEtiqueta("Letra")[0].caracter()
            );
        return texto;
    }

    public estaResueltoElProblema(): boolean {
        return this.textoEnCuadriculaSecundaria() == this.textoObjetivo.toUpperCase();
    }
}
