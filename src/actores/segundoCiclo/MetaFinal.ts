/// <reference path="../ActorAnimado.ts"/>

class MetaFinal extends ActorAnimado {

    static imagenesPara(actor) : string[] {
        return [`marcador-${actor}.png`];
    }

    constructor(actor: string) {
        super(0, 0, { grilla: `marcador-${actor}.png`, cantColumnas: 1, cantFilas: 1 });
    }
} 