/// <reference path = "./EscenaActividad.ts" />

class MariaLaComeSandias extends EscenaActividad {
    private cantidadFilas: number = 5
    private cantidadColumnas: number = 6

    iniciar() {
        this.setFondo(new Fondo('fondo.mariaSandia.png', 0, 0))
        this.setCuadricula(new Cuadricula(0, 0, this.cantidadFilas, this.cantidadColumnas,
            { alto: 300, ancho: 300, separacionEntreCasillas: 5 },
            { grilla: 'casilla.mariaSandia.png', cantColumnas: 5 }))
        this.completarConSandias()
        this.setAutomata(new MariaAnimada(0, 0))
        this.getCuadricula().agregarActor(this.getAutomata(), this.cantidadFilas - 1, 0)
        this.getAutomata().setEscala(this.getAutomata().getEscala() * 2)
        this.getAutomata().setAbajo(this.getCuadricula().casilla(this.cantidadFilas - 1, 0).getAbajo())
    }

    private completarConSandias(): void {
        this.completarFila(0)
        this.completarFila(2)
        this.completarFila(4)
        this.getCuadricula().agregarActor(new SandiaAnimada(0, 0), 1, 0)
        this.getCuadricula().agregarActor(new SandiaAnimada(0, 0), 3, 0)
    }

    private completarFila(numeroFila): void {
        for (var x = 0; x < this.cantidadColumnas; x++) {
            this.getCuadricula().agregarActor(new SandiaAnimada(0, 0), numeroFila, x)
        }
    }

    public estaResueltoElProblema(): boolean {
        return this.contarActoresConEtiqueta('SandiaAnimada') == 0
    }
}
