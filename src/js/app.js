new Vue({

    el: "#app",
    data: {
        etapa: 0,
        chute: '',
        segredo: '',
        lacunas: [],
        spriteAtual: 1,
        chutesErrados: [],
        mensagem: '',
        ganhou: false
    },

    computed: {

        aguardandoInicio() {
            return this.etapa == 0;
        },

        escolhendoSegredo() {
            return this.etapa == 1;
        },

        adivinhandoSegredo() {
            return this.etapa == 2;
        },

        fim() {
            return this.etapa == 3;
        },

        sprite() {
            return 'hangman-sprite-' + this.spriteAtual;
        },

    },
    methods: {


        proximaEtapa() {
            this.etapa++;
        },

        proximoSprite() {
            if(this.spriteAtual < 9) this.spriteAtual++;
        },

        ehChuteRepetido() {
            return this.chutesErrados
                .concat(this.lacunas)
                .indexOf(this.chute) != -1;
        },

        acertouChute(chute) {

            let acertou,
                resultado, 
                exp = new RegExp(this.chute, 'gi');

            while(resultado = exp.exec(this.segredo)) {
                acertou = this.lacunas[resultado.index] = this.chute;
            }

            return acertou;
        },

        ehFimDeJogo() {
            if(this.lacunas.filter(lacuna => !lacuna).length) {
                this.ganhou = true;
            }
        }
        ,
        chuta(event) {

            this.mensagem = '';
            
            if(this.ehChuteRepetido()) {

                this.mensagem = `Você já chutou a letra ${this.chute}.`;

            } else if(!this.acertouChute()) {
                    this.chutesErrados.push(this.chute);
                    this.proximoSprite();
            }

            this.chute = '';        

            if(ehFimDeJogo()) {

            }
        
        },

        guardaSegredo(segredo) {
            this.segredo = segredo;
            this.lacunas = new Array(segredo.length);
            this.proximaEtapa();
        }
    }
    
});