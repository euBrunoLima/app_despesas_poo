class DataBase{
    
    constructor(){}

    static salvarDespesa(objDespesa){

        function gerarId(){

            if (localStorage.length === 0){
                return 0;
            }

            let keys = []
            let keysNum = []
            for(let i = 0; i < localStorage.length; i++){
                keys.push(localStorage.key(i));
            }

            keys.forEach((key) => {
                const num = parseInt(key);
                if(!isNaN(num) && num.toString() === key){
                    keysNum.push(parseInt(key));
                }
            })
            if(keysNum.length === 0){
                return 0;
            }
            let maiorId =  Math.max(...keysNum);
            return maiorId + 1;
        }
        
        let id = gerarId();

        localStorage.setItem(id, JSON.stringify(objDespesa));
        
    }

    static recuperarTodosRegistros() {

        const despesas = [];

        for (let i = 0; i < localStorage.length; i++) {
            const chave = localStorage.key(i);

            if (isNaN(parseInt(chave))) {
                continue;
            }
            const item = localStorage.getItem(chave);

            if (item === null || item === undefined) {
                continue;
            }

        const despesa = JSON.parse(item);
        despesa.id = chave; 
        despesas.push(despesa);
    }

        console.log(despesas);
        return despesas;
    }

    static apagarDespesa(id){
        localStorage.removeItem(id)
    }    
    static pesquisa(filtro) { // filtro é um obj de despesa
        let despesas = this.recuperarTodosRegistros(); 

        let resultado = despesas.filter(d => {

            if (filtro.ano && d.ano != filtro.ano) return false;    
            if (filtro.mes && d.mes != filtro.mes) return false;
            if (filtro.dia && d.dia != filtro.dia) return false;
            if (filtro.tipo && d.tipo != filtro.tipo) return false;
            if (filtro.descricao && d.descricao != filtro.descricao) return false;
            if (filtro.valor && d.valor != filtro.valor) return false;

            return true;
        });

        return resultado;
    }
}

export default DataBase;