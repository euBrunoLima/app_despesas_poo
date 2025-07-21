import Despesa from '/class/Despesa.js';
import DataBase from './class/DataBase.js'


function cadastrarDespesa(){

    let ano = document.getElementById('ano')
    let mes = document.getElementById('mes')
    let dia = document.getElementById('dia')
    let tipo = document.getElementById('tipo')
    let descricao = document.getElementById('descricao')
    let valor = document.getElementById('valor')

    let despesa  = new Despesa(ano.value, mes.value, dia.value, tipo.value, descricao.value, valor.value)

    function limparCampos(){
        ano.value = '';
        mes.value = '';
        dia.value = '';
        tipo.value = '';
        descricao.value = '';
        valor.value = '';  
    }

    function exibirMensagem(tipoCor, modalTitelTxt, modalBodyTxt){

        let modal = document.getElementById('modalRegistroDespesa');

        modal.querySelector('.modal-title').innerHTML = modalTitelTxt;
        modal.querySelector('.modal-body').innerHTML = modalBodyTxt;
        modal.querySelector('.modal-header').classList.add(`text-${tipoCor}`);
        modal.querySelector('.modal-footer > .btn').classList.add(`btn-${tipoCor}`);
        $('#modalRegistroDespesa').modal('show');

        // Remove as classes de cor apenas quando o modal for fechado
        $('#modalRegistroDespesa').on('hidden.bs.modal', function () {
            modal.querySelector('.modal-header').classList.remove(`text-${tipoCor}`);
            modal.querySelector('.modal-footer > .btn').classList.remove(`btn-${tipoCor}`);
            // Remove o event listener para evitar múltiplas execuções
            $('#modalRegistroDespesa').off('hidden.bs.modal');
        });
        
    }

    if(despesa.validarDados()){
        console.log("dados errados vindo")
        DataBase.salvarDespesa(despesa);
        exibirMensagem('success', 'Registro de Despesa', 'Despesa registrada com sucesso!');
        limparCampos();
    }else{
        exibirMensagem('danger', 'Erro ao registrar Despesa', 'Existem campos obrigatórios que não foram preenchidos!');
    }
     
}

function limparTabela() {
  let tbody = document.getElementById('listaDespesas');
  tbody.innerHTML = '';
}

function atualizarTable(dados){
    limparTabela();
    let listaDespesas = document.getElementById('listaDespesas')

    dados.forEach((despesa) =>{
        let linha = listaDespesas.insertRow();
        linha.insertCell().textContent = `${despesa.dia}/${despesa.mes}/${despesa.ano}`;
        switch(despesa.tipo){
            case '1': despesa.tipo = "Alimentação"
                break
            case '2': despesa.tipo = "Educação"
                break
            case '3': despesa.tipo = "Lazer"
                break
            case '4': despesa.tipo = "Saúde"
                break
            case '5': despesa.tipo = 'Transporte'

        }
        linha.insertCell().textContent = despesa.tipo;
        linha.insertCell().textContent = despesa.descricao;
        linha.insertCell().textContent = despesa.valor;
    
        let btn = document.createElement('button')
        btn.className = 'btn btn-danger'
        btn.innerHTML = '<i class="fas fa-times"></i>'
        linha.insertCell().append(btn);
        btn.addEventListener('click', () => {
            DataBase.apagarDespesa(despesa.id);
            carregarListaDespesas();
        });

    })
}

function carregarListaDespesas(){
    const dados = DataBase.recuperarTodosRegistros();
    console.log(dados);
    atualizarTable(dados);
}




if(window.location.pathname.endsWith('index.html')){
    document.getElementById('btn_id').addEventListener('click', () => cadastrarDespesa());
}
if(window.location.pathname.endsWith('consulta.html')){

    function pesquisarDespesas(){
        let ano = document.getElementById('ano').value
        let mes = document.getElementById('mes').value
        let dia = document.getElementById('dia').value
        let tipo = document.getElementById('tipo').value
        let descricao = document.getElementById('descricao').value
        let valor = document.getElementById('valor').value

        const despesa = new Despesa(ano,mes,dia,tipo,descricao,valor)
        const filtro = DataBase.pesquisa(despesa)
        atualizarTable(filtro)
        

    }
    
    document.addEventListener('DOMContentLoaded', () => carregarListaDespesas());
    document.getElementById('btn-pesquisar').addEventListener('click', () => pesquisarDespesas())


  


}
