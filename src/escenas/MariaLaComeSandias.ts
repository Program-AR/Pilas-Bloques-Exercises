/// <reference path = "EscenaActividad.ts" />
/// <reference path = "../actores/MariaAnimada.ts" />
/// <reference path = "../actores/Cuadricula.ts" />


class MariaLaComeSandias extends EscenaActividad {
    cuadricula;
    fondo;

    iniciar() {
        this.fondo = new Fondo('fondo.mariaSandia.png', 0, 0);
        this.agregarCuadricula()
        this.completarConSandias();
        this.automata = new MariaAnimada(0, 0);
        this.cuadricula.agregarActor(this.automata, this.dimensionesCuadricula().cantidadFilas - 1, 0);
        this.automata.escala *= this.escalaAutomata()
        this.automata.abajo = this.cuadricula.casilla(this.dimensionesCuadricula().cantidadFilas - 1, 0).abajo;
    }

    escalaAutomata(){ return 2}

    dimensionesCuadricula(){
        return {
            cantidadColumnas: 6,
            cantidadFilas: 5
        }
    }

    agregarCuadricula() {
        this.cuadricula = new Cuadricula(0, 0, this.dimensionesCuadricula().cantidadFilas, this.dimensionesCuadricula().cantidadColumnas,
            { alto: 300, ancho: 300, separacionEntreCasillas: 5 },
            { grilla: 'casilla.mariaSandia.png',
                cantColumnas: 5
            })
    }

    agregarSandia(x, y){
        this.cuadricula.agregarActor(new SandiaAnimada(0, 0), y, x);
    }
    
    completarConSandias() {
        this.completarFila(0);
        this.completarFila(2);
        this.completarFila(4);
        this.agregarSandia(1,0)
        this.agregarSandia(3,0)
    }

    completarFila(numeroFila) {
        for (var x = 0; x < this.dimensionesCuadricula().cantidadColumnas; x++) {
            this.agregarSandia(numeroFila, x);
        }
    }

    estaResueltoElProblema() {
        return this.contarActoresConEtiqueta('SandiaAnimada') == 0;
    }
}
