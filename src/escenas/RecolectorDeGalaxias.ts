/// <reference path = "ElRecolectorDeEstrellas.ts" />
/// <reference path = "../actores/RecolectorEstrellas.ts" />
/// <reference path = "../habilidades/Flotar.ts" />

class RecolectorDeGalaxias extends ElRecolectorDeEstrellas {
    dimensionesCuadricula(){
        return {
            alto: 420,
            filas: 7,
            columnas: 5,
            separacionEntreCasillas: 10
        }
    }

    filasACompletar() { return [0,1,2,4,5,6] }

    ajustarAutomata() {
        this.automata.escala *= 0.7;
        this.automata.y -= 25;
    }
}
