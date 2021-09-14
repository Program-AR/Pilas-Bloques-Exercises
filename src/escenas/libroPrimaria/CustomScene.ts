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

interface ObjectType {
  idPath: string;
  tag: string;
}

const objectTypes = {
  obstacle: { idPath: 'obstacles', tag: 'Obstaculo' },
  prize: { idPath: 'prizes', tag: 'Prize' },
};

const imageWithId = (id: string) => (images: CustomImage[]): ImageURL => images.filter(image => image.id === id)[0].url
const background = imageWithId('background')
const ground = imageWithId('ground')

/**
 * Esta escena permite crear escenas personalizadas en el creador de escenarios de Pilas Bloques.
 * Actualmente se puede crear una escena con cualquier automata del primer ciclo, aunque se puede extender a los de segundo ciclo.
**/
class CustomScene extends EscenaDesdeMapa {
  automata: ActorAnimado
  background: ImageURL
  ground: ImageURL
  images: CustomImage[]

  constructor(options: CustomSceneOptions) {
    super();
    this.images = options.images
    this.background = background(options.images)
    this.ground = ground(options.images)
    this.initDesdeUnaOVariasDescripciones(options.grid.spec, options.grid.specOptions);
  }

  obtenerAutomata(): ActorAnimado {
    return this.automata
  }

  ajustarGraficos() {
    this.automata.escalarAAlto(65)
  }

  mapearIdentificadorAActor(id: string, nroFila: number, nroColumna: number): ActorAnimado {
    const actorType = id[0]
    const actorId = id.substring(1)
    switch (actorType) {
      case 'a': { this.setAutomataFromId(actorId); return this.automata } //Es necesario settear el automata aca porque antes de leer la grilla no se sabe cual automata tiene esta escena. Por lo que recien al llegar aca se puede settear el automata.
      case 'o': return this.getObject(actorId, nroColumna, nroFila, objectTypes.obstacle)
      case 'p': return this.getObject(actorId, nroColumna, nroFila, objectTypes.prize)
    }
  }

  private getImageWithId(id: string): ImageURL {
    try { //No puedo hacer [0]?.url arriba :(
      return imageWithId(id)(this.images) //Me gustaria que el imageWithId sea metodo de la clase, pero seria polemico con el background() en el constructor
    }
    catch (_e) {
      return 'imagenNoEncontrada.png'
    }
  }

  private getObject(id: string, x: number, y: number, objectType: ObjectType) {
    const objectImage = this.getImageWithId(`${objectType.idPath}/${id}`)
    const object = new ActorAnimado(x, y, { grilla: objectImage })
    object.agregarEtiqueta(objectType.tag)
    return object
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

  estaResueltoElProblema(): boolean {
    return this.contarActoresConEtiqueta(objectTypes.prize.tag) === 0 //Si hay mas de un tipo de premio esto ya no funca.
  }

  archivoFondo(): string {
    return this.background || "fondo.blanco.png";
  }

  opsCuadricula() {
    return { separacionEntreCasillas: 1 }
  }

  opsCasilla() {
    return { grilla: this.ground || 'casilla.grisoscuro.png', bordesDecorados: true, relAspecto: 1 };
  }
}

