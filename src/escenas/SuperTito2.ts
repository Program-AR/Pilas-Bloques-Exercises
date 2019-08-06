/// <reference path = "./SuperTito1.ts" />
/**
 * @class SuperTito2
 *
 */
class SuperTito2 extends SuperTito1 {

    public iniciar(): void {
        super.iniciar()
    }

    public static pathFondo(): string {
        return 'fondo.superTito2.png'
    }

    private hayLuz(): boolean {
        return this.lamparines.length > 0
    }

    protected agregarLamparinEnFila(fila: number): void {
        if (Math.random() < 0.5 || (fila == this.cantidadFilas - 2 && !this.hayLuz())) {
            super.agregarLamparinEnFila(fila)
        }
    }
}
