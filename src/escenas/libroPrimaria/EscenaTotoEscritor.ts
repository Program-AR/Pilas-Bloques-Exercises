/// <reference path = "./EscenaToto.ts" />

class EscenaTotoEscritor extends EscenaToto {
    manoQueEscribe: Actor

    public static clasesDeActoresExtrasToto(): typeof ActorAnimado[] {
        return [LetraManuscrita]
    }

    public static imagenesAdicionalesToto(): string[] {
        return ['manoToto.png', 'libretaToto.png']
    }

    constructor(estilo: EstiloTotoEscritor) {
        super(estilo.mapa(), estilo.textoEsperado(), estilo.topeDeLetras())
    }

    public iniciar(): void {
        super.iniciar()
        this.manoQueEscribe = new ActorAnimado(0, 0, { grilla: "manoToto.png" })
        this.cuadriculaSecundaria.agregarActor(this.manoQueEscribe, 0, 0, false)
        this.manoQueEscribe.escalarAAncho(190)
        this.manoQueEscribe.setY(this.manoQueEscribe.getY() - 25)
        this.manoQueEscribe.setX(this.manoQueEscribe.getX() + 85)
    }

    public obtenerAutomata(): TotoEscritor {
        return new TotoEscritor()
    }

    public opsCuadricula() {
        return { ancho: 400, alto: 280 }
    }

    public construirCuadriculaSecundaria(): Cuadricula {
        new ActorAnimado(-30, -170, { grilla: "libretaToto.png" })
        return new Cuadricula(
            30, -140, 1, this.topeDeLetras,
            { alto: 160, ancho: 300, imagen: 'invisible.png', separacionEntreCasillas: -20 }, { grilla: 'invisible.png', relAspecto: 1 }
        )
    }

    public estaResueltoElProblema(): boolean {
        return super.estaResueltoElProblema() && this.getAutomata().tocandoFin()
    }
}

abstract class EscribirTextoEnOtraCuadricula extends EscribirTexto {
    public iniciar(receptor): void {
        this.argumentos.texto = this.obtenerTexto()
        this.argumentos.receptor = pilas.escena_actual().manoQueEscribe
        super.iniciar(this.argumentos.receptor)
    }

    public abstract obtenerTexto(): string

}

class EscribirLetraActualEnOtraCuadricula extends EscribirTextoEnOtraCuadricula {
    public obtenerTexto(): string { return pilas.escena_actual().automata.caracterActual() }
}

class EscribirTextoDadoEnOtraCuadricula extends EscribirTextoEnOtraCuadricula {
    public obtenerTexto(): string { return this.argumentos.texto }
}

abstract class EstiloTotoEscritor {
    palabraElegida: string

    constructor() {
        this.palabraElegida = this.palabras()[Math.floor(Math.random() * this.palabras().length)]
    }

    /** Elige una palabra de una lista, y arma el mapa para la escena a partir de esa palabra */
    public mapa(): MapaEscena {
        return [["A"].concat(this.palabraElegida.split(""))]
    }

    public topeDeLetras(): number {
        return this.textoEsperado().length + 1
    }

    public palabras(): string[] {
        return ["después", "trabajo", "partido", "público", "todavía", "espacio", "difícil", "pública", "popular", "gracias", "palabra", "jóvenes", "escuela", "corazón", "actitud", "octubre", "ciencia", "razones", "perdido", "destino", "tercera", "viernes", "febrero", "pueblos", "treinta", "pintura", "plantas", "abierto", "colegio", "estatal", "cerebro", "actores", "dientes", "piedras", "fiestas", "círculo", "clásico", "canción", "alfredo", "córdoba", "ochenta", "botella", "rodrigo", "sonidos", "jugando", "incluir", "dibujos", "oxígeno", "lenguas", "pájaros", "vegetal", "teórico", "rurales", "pilotos", "rodilla", "enseñar", "balanza", "ingenio", "vinagre", "celeste", "abuelos", "espejos", "orillas", "sendero", "fósiles", "nativos", "oficios", "vocales", "diseñar", "cautela", "aceites", "saludar", "engañar", "abuelas", "nativas", "teórica", "clásica", "perdida", "abierta", "tercero", "primera", "sistema", "mujeres", "familia", "minutos", "estamos", "mundial", "tenemos", "domingo", "américa", "mayores", "humanos", "llamado", "hermano", "semanas", "maestro", "médicos", "mensaje", "volumen", "musical", "caminos", "montaña", "moderno", "remedio", "cámaras", "premios", "emoción", "caminar", "mendoza", "humedad", "músicos", "comedor", "manteca", "miradas", "formato", "armando", "inmenso", "monedas", "maestra", "emisora", "amantes", "miranda", "famosos", "manzana", "minoría", "motores", "mezclar", "semilla", "cemento", "mineral", "mañanas", "tomates", "mediano", "perfume", "milenio", "almacén", "melodía", "molesto", "mineros", "amorosa", "manzano", "anónimo", "dormida", "vómitos", "inmensa", "famosas", "humanas", "llamada", "hermana", "moderna", "maestra", "médicas", "músicas", "mediana", "molesta", "mineras", "amoroso", "anónima", "dormido", "primero", "momento", "memoria", "mínimos", "mínimas", "máximos", "máximas", "tomamos", "murmuro"]
    }

    public textoEsperado(): string {
        return this.palabraElegida.split("").map(letra => this.transformacionEsperadaPorLetra(letra)).join("")
    }

    public abstract transformacionEsperadaPorLetra(letra: string): string
}

class ObjetivoCopiar extends EstiloTotoEscritor {
    public transformacionEsperadaPorLetra(letra: string): string {
        return letra
    }
}

class ObjetivoX extends EstiloTotoEscritor {
    public transformacionEsperadaPorLetra(letra: string): string {
        return "x"
    }
}

class ObjetivoJeringozo extends EstiloTotoEscritor {
    public palabras(): string[] {
        return super.palabras().filter(palabra => this.todasLetrasSimples(palabra) && this.pocasVocales(palabra))
    }

    public transformacionEsperadaPorLetra(letra: string): string {
        return letra + (this.esVocal(letra) ? "p" + letra : "")
    }

    public esVocal(letra: string): boolean {
        return letra === "a" || letra === "e" || letra === "i" || letra === "o" || letra === "u"
    }

    public todasLetrasSimples(palabra: string): boolean {
        return palabra.split("").every(letra => "abcdefghijklmnñopqrstuvwxyz".indexOf(letra) >= 0)
    }

    public pocasVocales(palabra: string): boolean {
        return palabra.split("").filter(letra => this.esVocal(letra)).length <= 3
    }
}

class ObjetivoMicha extends EstiloTotoEscritor {
    public palabras(): string[] { // duplico las mismas palabras para aumentar probabilidad de palabras con muchas emes.
        return ["momento", "memoria", "mínimos", "mínimas", "máximos", "máximas", "tomamos", "murmuro",
            "momento", "memoria", "mínimos", "mínimas", "máximos", "máximas", "tomamos", "murmuro",
            "vómitos", "médicas", "amoroso", "manzano", "cemento", "mineral", "mañanas", "humanas", "llamada"]
    }

    public transformacionEsperadaPorLetra(letra: string): string {
        return letra + (letra === "m" ? "ich" : "")
    }
}