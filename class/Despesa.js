

class Despesa{
    constructor(ano, mes, dia, tipo, descricao, valor){
        this.ano = ano;
        this.mes = mes;
        this.dia = dia;
        this.tipo = tipo;
        this.descricao = descricao;
        this.valor = valor;
    }

    validarDados(){

        for(let i in this){
            if(this[i] === undefined || this[i] === '' || this[i] === null){
                return false;
            }
        }
        return true;
    }


    

}

export default Despesa;