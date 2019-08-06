// import { Cuadricula } from '../dist/pilas-bloques-exercises'
import { expect } from 'chai'
import 'mocha'
import '../node_modules/pilasweb/dist/pilasweb.js'
import '../dist/pilas-bloques-exercises.js'

describe('Hello function', () => {

    it('hight should return 50', () => {
        const cuadricula = new Cuadricula(0, 0, 3, 5,
            { alto: 300, ancho: 200 },
            { grilla: 'invisible.png', cantColumnas: 1 }
        )
        const casilla = cuadricula.casilla(1, 2)
        cuadricula.setAlto(150)
        expect(casilla.getAlto()).to.equal(50)
    })

})