/// <reference path="../ActorAnimado.ts"/>

class MetaFinal extends ActorAnimado {

    constructor(automata: string) {
        super(0, 0, { grilla: `marcador-${automata}.png`, cantColumnas: 1, cantFilas: 1 });
    }
} 