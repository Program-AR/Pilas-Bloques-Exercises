/// <reference path = '../src/escenas/libroPrimaria/CustomScene.ts' />
/// <reference path = "../node_modules/pilasweb/dist/pilasweb.d.ts" />
// @ts-ignore
const { CustomScene, objectTypes, pilas, Lita } = global.win

describe("CustomScene", () => {
  let escena: CustomScene

  beforeAll(() => {
    pilas.onready = () => { }
    pilas.iniciar({
      imagenesExtra: ['actor.lita.png', 'background.png', 'ground.png', 'prize.png', 'obstacle.png'],
      opciones: { canvas_id: 'canvas' },
      cargar_imagenes_estandar: false
    }) // Do it in init.js?
    
    escena = new CustomScene({
      grid: { spec: "[aL,p1,o1,-,-,-,-,-,-]" },
      images: [
        { id: `background`, url: 'background.png' },
        { id: `ground`, url: 'ground.png' },
        { id: `${objectTypes.obstacle.idPath}/1`, url: 'obstacle.png' },
        { id: `${objectTypes.prize.idPath}/1`, url: 'prize.png' }
      ]
    })
    pilas.mundo.gestor_escenas.cambiar_escena(escena)
  })

  test("Should map automata id to intended automata", () => {
    const automata = escena.mapearIdentificadorAActor('aL', 0, 0)
    expect(automata).toBeInstanceOf(Lita)
  })

  test("Obstacles should be generated", () => {
    expect(pilas.obtener_actores_con_etiqueta(objectTypes.obstacle.tag).length).toBe(1)
  })

  test("Prizes should be generated", () => {
    expect(pilas.obtener_actores_con_etiqueta(objectTypes.prize.tag).length).toBe(1)
  })
})