/// <reference path = '../src/escenas/libroPrimaria/CustomScene.ts' />
/// <reference path = "../node_modules/pilasweb/dist/pilasweb.d.ts" />

describe("CustomScene", () => {
  let escena

  beforeAll(() => {
    escena = new CustomScene({ grid: { spec: "[aL,p1,o1,-,-,-,-,-,-]" }, images: [{ id: `${objectTypes.obstacle.idPath}/1`, url: 'obstacle.png' }, { id: `${objectTypes.prize.idPath}/1`, url: 'prize.png' }] })
  })

  test("Should map automata id to intended automata", () => {
    const automata = escena.mapearIdentificadorAActor('aL', 0, 0)
    expect(typeof automata).toBe(Lita) //ponele
  })

  test("Obstacles should be generated", () => {
    expect(pilas.obtener_actores_con_etiqueta(objectTypes.obstacle.tag)).toBe(1)
  })

  test("Prizes should be generated", () => {
    expect(pilas.obtener_actores_con_etiqueta(objectTypes.prize.tag)).toBe(1)
  })
})