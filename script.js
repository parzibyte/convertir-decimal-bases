/**
 * Calculadora decimal a cualquier base explicando los pasos para llegar al resultado
 * Hecho con Vue.JS 2 + Bulma CSS
 * @author parzibyte
 */

const BINARIO = 2, OCTAL = 8, HEXADECIMAL = 16;
Vue.use(Toasted);
const app = new Vue({
    el: '#app',
    data: () => ({
        bases: [BINARIO, OCTAL, HEXADECIMAL],
        baseSeleccionada: BINARIO,
        numeroDecimal: null,
        operaciones: [],
        resultado: null,
    }),
    mounted() {
        this.enfocarInput();
    },
    methods: {
        enfocarInput() {
            this.$refs.inputPrincipal.focus();
        },
        obtenerEquivalencia(digitoDecimal) {
            if (this.baseSeleccionada === BINARIO || this.baseSeleccionada === OCTAL) {
                return digitoDecimal;
            }
            if (this.baseSeleccionada === HEXADECIMAL) {
                return {
                    0: "0",
                    1: "1",
                    2: "2",
                    3: "3",
                    4: "4",
                    5: "5",
                    6: "6",
                    7: "7",
                    8: "8",
                    9: "9",
                    10: "A",
                    11: "B",
                    12: "C",
                    13: "D",
                    14: "E",
                    15: "F",
                }[digitoDecimal];
            };
        },
        resetear() {
            this.operaciones = [];
        },

        calcular() {
            this.resetear();
            if (!this.numeroDecimal) {
                return;
            }
            let decimal = this.numeroDecimal;
            let resultado = "";
            while (decimal > 0) {
                let residuo = decimal % this.baseSeleccionada;
                let anteriorDecimal = decimal;
                decimal = Math.floor(decimal / this.baseSeleccionada);
                let equivalencia = this.obtenerEquivalencia(residuo);
                const operacion = {
                    residuo, decimal, anteriorDecimal,
                };
                if (this.baseSeleccionada === HEXADECIMAL && equivalencia != residuo) {
                    operacion.equivalencia = equivalencia;
                }
                this.operaciones.push(operacion);
                resultado = equivalencia + resultado;
            }
            this.resultado = resultado;
        }
    },
    watch: {
        numeroDecimal() {
            this.calcular();
        },
        baseSeleccionada() {
            this.enfocarInput();
        }
    },
});