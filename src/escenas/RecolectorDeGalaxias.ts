/// <reference path = "ElRecolectorDeEstrellas.ts" />
/// <reference path = "../actores/RecolectorEstrellas.ts" />
/// <reference path = "../habilidades/Flotar.ts" />

class RecolectorDeGalaxias extends ElRecolectorDeEstrellas {
    dimensionesCuadricula() {
        return {
            alto: 420,
            filas: 7,
            columnas: 5,
            separacionEntreCasillas: 10
        }
    }

    filasACompletar() { return [0, 1, 2, 4, 5, 6] }

    randomColumn(cantidad) {
        return Math.floor(Math.random() * cantidad);
    }

    completarFilaConEstrellas(fila) {
        var columnas = [1, 2, 3, 4];
        var index;
        var columna;
        [4, 3].forEach(cantidad => {
            index = this.randomColumn(cantidad);
            columna = columnas[index];
            this.agregarEstrella(fila, columna);
            columnas.splice(index, 1);
        });

        columnas.forEach(columna => {
            if (Math.random() > 0.5) {
                this.agregarEstrella(fila, columna);
            }
        })
    }

    ajustarAutomata() {
        this.automata.escala *= 0.7;
        this.automata.y -= 25;
    }
}
