/// <reference path = "EscenaActividad.ts" />

class ElMonoQueSabeContar extends EscenaActividad {
    private cuadriculaMultipleColumnas: CuadriculaMultipleColumnas
    private tableroConBananas: Tablero
    private tableroConManzanas: Tablero

    public iniciar(): void {
        this.setFondo(new Fondo('fondos.selva.png', 0, 0))

        this.setCuadricula(new CuadriculaMultipleColumnas(
            new DefinidorColumnasRandom(5, 6), 0, -45, { separacionEntreCasillas: 5 },
            { alto: 40, ancho: 40, grilla: 'casillamediomono.png', cantColumnas: 1 }))

        this.cuadriculaMultipleColumnas = this.getCuadricula() as CuadriculaMultipleColumnas

        this.cuadriculaMultipleColumnas.cambiarImagenInicio('casillainiciomono.png')
        this.cambiarImagenesFin()

        this.cuadriculaMultipleColumnas.completarConObjetosRandom(new ConjuntoClases([ManzanaAnimada, BananaAnimada]),
            {
                condiciones: [
                    (casilla) => casilla.hayArriba(), //no incluye en primera fila
                    (casilla) => casilla.hayAbajo() //no incluye en ultima fila
                ]
            }
        )

        this.setAutomata(new MonoAnimado(0, 0))
        this.cuadriculaMultipleColumnas.agregarActorEnPerspectiva(this.getAutomata(), 0, 0)
        this.getAutomata().setEscala(this.getAutomata().getEscala() * 1.5)

        this.tableroConBananas = new Tablero(-150, 210, { texto: "Bananas" })
        this.tableroConManzanas = new Tablero(150, 210, { texto: "Manzanas" })

    }

    public cambiarImagenesFin(): void {
        this.cuadriculaMultipleColumnas.cambiarImagenFin('casillafinalmono.png')
    }

    public estaResueltoElProblema(): boolean {
        return this.cantidadObjetosConEtiqueta('BananaAnimada') === this.tableroConBananas.dameValor() &&
            this.cantidadObjetosConEtiqueta('ManzanaAnimada') === this.tableroConManzanas.dameValor()
    }

}
