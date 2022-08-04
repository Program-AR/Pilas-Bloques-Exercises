/// <reference path = "ElRecolectorDeEstrellas.ts" />
/// <reference path = "../actores/RecolectorEstrellas.ts" />
/// <reference path = "../habilidades/Flotar.ts" />

class RecolectorDeGalaxias extends ElRecolectorDeEstrellas {
    dimensionesCuadricula(){
        return {
            filas: 7,
            columnas: 5
        }
    }

    filasACompletar() { return [0,1,2,4,5,6] }
}
