/// <reference path = "EscenaActividad.ts" />
/// <reference path = "../actores/RecolectorEstrellas.ts" />
/// <reference path = "../habilidades/Flotar.ts" />

class ElRecolectorDeEstrellas extends EscenaActividad {
    fondo;
    automata;
    cuadricula;
    objetos;
    estado;
    iniciar() {
        this.estado = new Estado(() => this.cantidadObjetosConEtiqueta('EstrellaAnimada') == 0);
        this.fondo = new Fondo('fondo.recolector.png', 0, 0);
        //this.recolector.izquierda = pilas.izquierda();

        this.cuadricula = new Cuadricula(0, -20, this.dimensionesCuadricula().filas, this.dimensionesCuadricula().columnas,
            { alto: 400 },
            {
                grilla: 'invisible.png',
                cantColumnas: 1
            })

        this.automata = new RecolectorEstrellas(0, 0);
        this.cuadricula.agregarActorEnPerspectiva(this.automata, this.dimensionesCuadricula().filas - 1, 0);
        this.automata.aprender(Flotar, {Desvio:5});
        // La posición inicial pretende respectar el ejemplo

        this.agregarEstrellas(this.filasACompletar())

    }

    dimensionesCuadricula(){
        return {
            filas: 4,
            columnas: 5
        }
    }

    filasACompletar() { return [0,1,2,3] }

    agregarEstrellas(filas){
        filas.forEach(fila => this.completarFilaConEstrellas(fila))
    }

    completarFilaConEstrellas(fila){
        [1,2,3,4].forEach(columna => this.agregarEstrella(fila, columna))
    }

    agregarEstrella(fila, columna){
        const estrella = new EstrellaAnimada(0,0)
        this.cuadricula.agregarActor(estrella,fila,columna);
        estrella.escala *= 0.7;
    }
}
