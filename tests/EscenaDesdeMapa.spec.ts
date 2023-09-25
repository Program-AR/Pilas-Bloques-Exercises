/// <reference path = '../src/escenas/libroPrimaria/CustomScene.ts' />
/// <reference path = "../node_modules/pilasweb/dist/pilasweb.d.ts" />
// @ts-ignore
const { EscenaDuba, objectTypes, pilas, Lita } = global.win

describe("EscenaDesdeMapa", () => {

    let escena: EscenaDesdeMapa

    beforeAll(() => {
        pilas.onready = () => { }
        pilas.iniciar({
          imagenesExtra: ['actor.duba.png', 'casillas.duba.png', 'actor.churrasco.png', 'fondo.duba.png'],
          opciones: { canvas_id: 'canvas' },
          cargar_imagenes_estandar: false
        })
        
        escena = new EscenaDuba(["[[A,P,_],[-,_,-],[_,-,-]]"])
        pilas.mundo.gestor_escenas.cambiar_escena(escena)
        escena.iniciar()
      })

    test("No se crea casilla en posicion de casilla nula", () =>{
        expect(escena.cuadricula.casilla(0,2)).toBeFalsy()
    })

    test("Al tener una casilla nula en un borde no se eliminan las casillas en la misma fila y columna", () =>{
        expect(escena.cuadricula.casilla(0,1)).toBeTruthy()
        expect(escena.cuadricula.casilla(1,2)).toBeTruthy()
    })
})
