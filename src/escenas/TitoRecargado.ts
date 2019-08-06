/// <reference path = "./SuperTito2.ts" />

/**
 * @class TitoRecargado
 *
 */
class TitoRecargado extends SuperTito2 {

    public iniciar(): void {
        super.iniciar()
        this.cantidadFilas = 7;
    }

    public static pathFondo(): string {
        return 'fondos.estrellas.png';
    }

    public avanzar(): void {
        this.getAutomata().hacer_luego(MoverACasillaDerecha);
    }

    public prenderLuz(): void {
        this.getAutomata().hacer_luego(Encender, { etiqueta: 'Luz' });
    }

}
