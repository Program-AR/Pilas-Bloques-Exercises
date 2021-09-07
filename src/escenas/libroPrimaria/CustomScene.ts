/// <reference path = "EscenaDesdeMapa.ts" />
/// <reference path = "../../actores/libroPrimaria/Duba.ts" />
/// <reference path = "../../actores/libroPrimaria/Lita.ts" />
/// <reference path = "../../actores/libroPrimaria/Coty.ts" />
/// <reference path = "../../actores/libroPrimaria/Toto.ts" />

type ImageURL = string

type CustomImage = {
  id: string,
  url: ImageURL
}

type CustomSceneOptions = {
  grid: GridSpec,
  images: CustomImage[]
}

const imageWithId = (id: string) => (images: CustomImage[]): ImageURL => images.filter(image => image.id === id)[0].url
const background = imageWithId('background')

/**
 * Esta escena permite crear escenas personalizadas en el creador de escenarios de Pilas Bloques.
 * Actualmente se puede crear una escena con cualquier automata del primer ciclo, aunque se puede extender a los de segundo ciclo.
**/
class CustomScene extends EscenaDesdeMapa {
  automata: ActorAnimado
  background: ImageURL
  images: CustomImage[]

  constructor(options: CustomSceneOptions) {
    super();
    this.images = options.images
    this.background = background(options.images)
    this.initDesdeUnaOVariasDescripciones(options.grid.spec, options.grid.specOptions);
  }

  obtenerAutomata(): ActorAnimado {
    return this.automata
  }

  mapearIdentificadorAActor(id: string, nroFila: number, nroColumna: number): ActorAnimado {
    const actorType = id[0]
    const actorId = id.substring(1)
    switch (actorType) {
      case 'a': { this.setAutomataFromId(actorId); return this.automata } //Es necesario settear el automata aca porque antes de leer la grilla no se sabe cual automata tiene esta escena. Por lo que recien al llegar aca se puede settear el automata.
      case 'o': return this.getObject(actorId, nroColumna, nroFila, 'obstaculo')
      case 'p': return this.getObject(actorId, nroColumna, nroFila, 'prize')
    }
  }

  private getImageWithId(id: string): ImageURL {
    return imageWithId(id)(this.images) //Me gustaria que el imageWithId sea metodo de la clase, pero seria polemico con el background() en el constructor
  }

  private getObject(id: string, x: number, y: number, objectType: string) {
    const objectImage = this.getImageWithId(`${objectType}/${id}`)
    const prize = new ActorAnimado(x, y, { grilla: objectImage })
    const capitalizedType = objectType.charAt(0).toUpperCase() + objectType.slice(1).toLowerCase() //La normalizacion deberia estar en agregarEtiqueta, no aca.
    prize.agregarEtiqueta(capitalizedType)
    return prize
  }

  archivoFondo(): string {
    return this.background || "fondo.blanco.png";
  }

  private setAutomataFromId(automataId: string): void {
    this.automata = this.mapIdToAutomata(automataId)
  }

  private mapIdToAutomata(id: string): ActorAnimado {
    switch (id) {
      case 'D': return new Duba()
      case 'L': return new Lita()
      case 'T': return new Toto()
      case 'C': return new Coty()
      default: throw new Error(`El identificador "a${id}" no es un automata valido.`)
    }
  }

  opsCuadricula() {
    return { separacionEntreCasillas: 2 }
  }

  opsCasilla() {
    return { grilla: 'casilla.grisoscuro.png', bordesDecorados: true, relAspecto: 1 };
  }
}

