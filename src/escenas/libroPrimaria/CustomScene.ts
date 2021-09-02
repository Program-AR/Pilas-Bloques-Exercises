/// <reference path = "EscenaDesdeMapa.ts" />
/// <reference path = "../../actores/libroPrimaria/Duba.ts" />
/// <reference path = "../../actores/libroPrimaria/Lita.ts" />
/// <reference path = "../../actores/libroPrimaria/Coty.ts" />
/// <reference path = "../../actores/libroPrimaria/Toto.ts" />

type CustomSceneOptions = {
  grid: GridSpec,
  backgroundImage?: string,
}
/**
 * Esta escena permite crear escenas personalizadas en el creador de escenarios de Pilas Bloques.
 * Actualmente se puede crear una escena con cualquier automata del primer ciclo, aunque se puede extender a los de segundo ciclo.
**/
class CustomScene extends EscenaDesdeMapa {
  automata: ActorAnimado
  background: string

  constructor(options: CustomSceneOptions) {
    super();
    this.background = options.backgroundImage
    this.initDesdeUnaOVariasDescripciones(options.grid.spec, options.grid.specOptions);
  }

  obtenerAutomata(): ActorAnimado {
    return this.automata
  }

  mapearIdentificadorAActor(id: string, _nroFila: number, _nroColumna: number): ActorAnimado {
    const actorType = id[0]
    const actorId = id.substring(1)
    switch (actorType) {
      case 'a': { this.setAutomataFromId(actorId); return this.automata } //Es necesario settear el automata aca porque antes de leer la grilla no se sabe cual automata tiene esta escena. Por lo que recien al llegar aca se puede settear el automata.
    }
  }

  archivoFondo(): string {
    return this.background || "fondo.blanco.png";
  }

  setAutomataFromId(automataId: string): void {
    this.automata = this.mapIdToAutomata(automataId)
  }

  mapIdToAutomata(id: string): ActorAnimado {
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

