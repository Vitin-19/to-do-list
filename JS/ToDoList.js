const Tdmeses = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];
const dias = ['Domingo','Segunda','Terça','Quarta','Quinta','Sexta','Sábado'];

function hoje(){
    let dataHoje = new Date();
    let DiaSemHj = dataHoje.getDay();
    console.log(DiaSemHj)
    let diaHoje = dataHoje.getDate();
    let mesHoje = dataHoje.getMonth(); 

    let txtHj = `${dias[DiaSemHj]}, ${diaHoje} de ${Tdmeses[mesHoje]}`
    console.log(txtHj)
    return txtHj;
}

function ColocarDiaHoje(){
    let data = hoje();
    document.getElementById('DiaAtualPrincipal').innerText = data
    return
}

class Tarefa{
    constructor(nome,inicio,fim,descricao,status){
        this.nome = nome;
        this.inicio = inicio;
        this.fim = fim
        this.descricao = descricao;
        this.status = status;
    }
}

class MetaDiaria{
    constructor(nome,descricao){
        this.nome = nome;
        this.descricao = descricao;
    }
}

function ColocarListaTarefa(){
    let Hoje = new Date();
    let dia, diaSemana, mes, proxdia, Lista, Info;
    let aux = 0;
        for(let i = 1; i <= 7; i++){
            Lista = document.querySelector(`.Atv${i}`);
            Info = Lista.querySelector(`.task`);
            proxdia =  new Date(Hoje);
            proxdia.setDate(Hoje.getDate() + aux);
            diaSemana = dias[proxdia.getDay()];
            dia = proxdia.getDate();
            mes = Tdmeses[proxdia.getMonth()]
             
            Info.querySelector('#nome').innerText = `${diaSemana}, ${dia} de ${mes}`;
            aux++;
        }
    return;
}

function TerminarTarefa(div){
    div = document.querySelector(div);
    let Tarefas = JSON.parse(localStorage.getItem('Tarefas'));
    let ListaSelecionada = JSON.parse(localStorage.getItem('ListaSelecionada'));
    let TarefaChecada = div.querySelector('.nome').textContent;
    let check = div.querySelector(`input[class='checkbox']:checked`)
    let hr = div.querySelector(`hr`);
    let Calendario = JSON.parse(localStorage.getItem('Calendario'));
    if(check){
            div.style.borderColor = '#6CBF84';
            hr.style.backgroundColor = '#6CBF84'
            for(let i = 0; i < Tarefas.length; i++){
                if(Tarefas[i][0] === ListaSelecionada){
                    for(let j = 1; j < Tarefas[i].length; j++){
                        if(TarefaChecada === Tarefas[i][j].nome){
                            Calendario[i][j].status = true; 
                            Tarefas[i].splice(j,1);
                            localStorage.setItem('Tarefas',JSON.stringify(Tarefas))
                            localStorage.setItem('Calendario',JSON.stringify(Calendario));
                            break;
                        }
                    }
                    break;
                }
            }
    }else{
            div.style.borderColor = '#e2e2e2';
            hr.style.backgroundColor = 'black'
    }
    return;
}

//let Tarefas = new Array(7);
//let TarefasPassadas = new Array(6);
//let MetasDiarias = new Array();


function IniciarListas(){
    let dia, diaSemana, mes, proxdia,Hoje;
    let aux = 0;
    let TesteHj = hoje();
    let Tarefas = new Array(7);
    let TarefasPassadas = new Array(6);
    let MetasDiarias = new Array();
    let Calendario = new Array(7);

    let TarefasAnterior = JSON.parse(localStorage.getItem('Tarefas'));
    let TarefasPassadasAnterior = JSON.parse(localStorage.getItem('TarefasPassadas'));
    let MetasDiariasAnterior = JSON.parse(localStorage.getItem('MetasDiarias'))
    Calendario = JSON.parse(localStorage.getItem('Calendario')); 
    if(TarefasAnterior && TarefasPassadasAnterior && MetasDiariasAnterior){
        if(TarefasAnterior[0][0] === TesteHj){
             Tarefas = TarefasAnterior;
             TarefasPassadas = TarefasPassadasAnterior;
             MetasDiarias = MetasDiariasAnterior;
             //Calendario = Tarefas
        }else{
            [TarefasPassadas[0],TarefasPassadas[1],TarefasPassadas[2],TarefasPassadas[3],TarefasPassadas[4],TarefasPassadas[5]] = [TarefasAnterior[0],TarefasPassadasAnterior[1],TarefasPassadasAnterior[2],TarefasPassadasAnterior[3],TarefasPassadasAnterior[4]];
            [Tarefas[0],Tarefas[1],Tarefas[2],Tarefas[3],Tarefas[4],Tarefas[5]] = [TarefasAnterior[1],TarefasAnterior[2],TarefasAnterior[3],TarefasAnterior[4],TarefasAnterior[5],TarefasAnterior[6]];
            Hoje = new Date();
            proxdia =  new Date(Hoje);
            proxdia.setDate(Hoje.getDate() + 7);
            diaSemana = dias[proxdia.getDay()];
            dia = proxdia.getDate();
            mes = Tdmeses[proxdia.getMonth()]
            Tarefas[6][0] = `${diaSemana}, ${dia} de ${mes}`;
            MetasDiarias = MetasDiariasAnterior;
        }
        localStorage.setItem('Tarefas',JSON.stringify(Tarefas));
        localStorage.setItem('TarefasPassadas',JSON.stringify(TarefasPassadas));
        localStorage.setItem('MetasDiarias',JSON.stringify(MetasDiarias));
        localStorage.setItem('Calendario',JSON.stringify(Calendario));
    }else{
        for(let i = 0; i < 7; i++){
            Hoje = new Date()
            proxdia =  new Date(Hoje);
            proxdia.setDate(Hoje.getDate() + aux);
            diaSemana = dias[proxdia.getDay()];
            dia = proxdia.getDate();
            mes = Tdmeses[proxdia.getMonth()]
            Tarefas[i] = new Array();
            Tarefas[i][0] = `${diaSemana}, ${dia} de ${mes}`
            aux++;
        }
        aux = -1;
        for(let i = 0; i < 7;i++){
            Hoje = new Date()
            proxdia =  new Date(Hoje);
            proxdia.setDate(Hoje.getDate() + aux);
            diaSemana = dias[proxdia.getDay()];
            dia = proxdia.getDate();
            mes = Tdmeses[proxdia.getMonth()];
            TarefasPassadas[i] = new Array();
            TarefasPassadas[i][0] = `${diaSemana}, ${dia} de ${mes}`;
            aux --;
        }
        Calendario = Tarefas
        localStorage.setItem('Tarefas',JSON.stringify(Tarefas));
        localStorage.setItem('TarefasPassadas',JSON.stringify(TarefasPassadas));
        localStorage.setItem('MetasDiarias',JSON.stringify(MetasDiarias));
        localStorage.setItem('Calendario',JSON.stringify(Calendario));
    }
    return;
}
function CriarMeta(){
    document.getElementById('CriacaodeMeta').addEventListener('submit',function(event) {
        event.preventDefault();
        let NomeMeta = document.getElementById('nomecriartarefa').value;
        let descricao = document.getElementById('description').value;

        let Meta = new MetaDiaria(NomeMeta,descricao);
        let MetasDiarias = JSON.parse(localStorage.getItem('MetasDiarias'))

        MetasDiarias.push(Meta);
        alert('Meta criada com sucesso, atualize a página para visualizá-la')
        localStorage.setItem('MetasDiarias',JSON.stringify(MetasDiarias));
    })
}

function ColocarMetas(){
    let MetasDiarias = JSON.parse(localStorage.getItem('MetasDiarias'));
    let section = document.querySelector('.Listas1');
    for(let i = 0; i < MetasDiarias.length; i++){
        let Atv = document.createElement('div');
        Atv.classList.add(`Atv${i}`);

            let task = document.createElement('div');
            task.classList.add('task');

                let span = document.createElement('span');
                span.id = 'nome';
                span.textContent = MetasDiarias[i].nome;

            let textoicon = document.createElement('div');
            textoicon.classList.add('textoicon');

                let lixeira = document.createElement('div');
                lixeira.classList.add('Lixeira')

                    let LixoI = document.createElement('i');
                    LixoI.classList.add('fa-solid','fa-pen-to-square');
                    LixoI.onclick = function() {
                        document.getElementById('id01').style.display = 'block';
                        localStorage.setItem('MetaAEditar', JSON.stringify(`${MetasDiarias[i].nome}`));
                    };
                
                let Editar = document.createElement('div');
                Editar.classList.add('Editar');
                
                    let EditarI = document.createElement('i');
                    EditarI.classList.add('fa-solid','fa-trash');
                    EditarI.onclick = function() {
                        document.getElementById('id02').style.display = 'block';
                        localStorage.setItem('MetaAExcluir',JSON.stringify(`.Atv${i}`));
                    };
                    
        Editar.appendChild(EditarI);
        lixeira.appendChild(LixoI);
        textoicon.appendChild(lixeira);
        textoicon.appendChild(Editar);
        task.appendChild(span)
        Atv.appendChild(task);
        Atv.appendChild(textoicon)
        section.appendChild(Atv);
    }
}

function CarregarPopUpEdicaoMeta(){
    let Atv = document.querySelector(JSON.parse(localStorage.getItem('MetaAEditar')));
    //let metaNome = Atv.querySelector('#nome').textContent;
    let MetasDiarias = JSON.parse(localStorage.getItem('MetasDiarias'))
    let descricao;

    for(let i = 0; i < MetasDiarias.length; i++){
        if(metaNome === MetasDiarias[i].nome){
            descricao = MetasDiarias[i].descricao
            document.querySelector('.NomeMeta').value = metaNome
            document.querySelector(`textarea[id="description"]`).value = descricao
            break;
        }
    }
}
function CarregarPopUpEdicaoTarefa(){
    let Tarefas = JSON.parse(localStorage.getItem('Tarefas'));
    let Calendario = JSON.parse(localStorage.getItem('Calendario'));
    let ListaSelecionada = JSON.parse(localStorage.getItem('ListaSelecionada'));
    let TarefaAEditar = JSON.parse(localStorage.getItem('TarefaAEditar'));
    let Popup = document.getElementById('id02');

    Popup.querySelector('.NomeTarefa').value = TarefaAEditar;

    for(let i = 0; i < Tarefas.length; i++){
        if(Tarefas[i][0] === ListaSelecionada){
            for(let j = 1; j < Tarefas[i].length; j++){
                if(Tarefas[i][j].nome === TarefaAEditar){
                    Popup.querySelector('#Horario1').value = Tarefas[i][j].inicio
                    Popup.querySelector('#Horario2').value = Tarefas[i][j].fim
                    Popup.querySelector('.description').innerHTML = Tarefas[i][j].descricao
                    return;
                }
            }
        }
    }
}

function EditarTarefa(){
    //document.getElementById('formEdicaoTarefa').addEventListener('submit',function(event) {
        event.preventDefault();
        let Tarefas = JSON.parse(localStorage.getItem('Tarefas'));
        let Calendario = JSON.parse(localStorage.getItem('Calendario'));
        let ListaSelecionada = JSON.parse(localStorage.getItem('ListaSelecionada'));
        let TarefaAEditar = JSON.parse(localStorage.getItem('TarefaAEditar'));
        let Popup = document.getElementById('id02');
        for(let i = 0; i < Tarefas.length; i++){
            if(Tarefas[i][0] === ListaSelecionada){
                for(let j = 1; j < Tarefas[i].length; j++){
                    if(Tarefas[i][j].nome === TarefaAEditar){
                        Tarefas[i][j].nome = Popup.querySelector('.NomeTarefa').value;
                        Tarefas[i][j].inicio = Popup.querySelector('#Horario1').value  
                        Tarefas[i][j].fim = Popup.querySelector('#Horario2').value 
                        Tarefas[i][j].descricao = Popup.querySelector('.description').innerHTML

                        Calendario = Tarefas
                        localStorage.setItem('Tarefas', JSON.stringify(Tarefas))
                        localStorage.setItem('Calendario', JSON.stringify(Calendario));
                        alert('Tarefa editada com sucesso. Atualize a página para visualizá-la');
                        return;
                    }
                }
            }
        }
    //})
}

function ExcluirTarefa(){
        let Tarefas = JSON.parse(localStorage.getItem('Tarefas'));
        let Calendario = JSON.parse(localStorage.getItem('Calendario'));
        let ListaSelecionada = JSON.parse(localStorage.getItem('ListaSelecionada'));
        let TarefaAEditar = JSON.parse(localStorage.getItem('TarefaAEditar'));
        let Popup = document.getElementById('id02');
        for(let i = 0; i < Tarefas.length; i++){
            if(Tarefas[i][0] === ListaSelecionada){
                for(let j = 1; j < Tarefas[i].length; j++){
                    if(Tarefas[i][j].nome === TarefaAEditar){
                        confirm('Deseja realmente excluir essa tarefa ?');
                        Tarefas[i].splice(j,1);
                        localStorage.setItem('Tarefas', JSON.stringify(Tarefas))
                        localStorage.setItem('Calendario', JSON.stringify(Calendario));
                        alert('Tarefa excluída com sucesso. Atualize a página para verificar');
                        document.getElementById('id02').style.display = 'none';
                        return;
                    }
                }
            }
        }
}

function EditarMeta(){
    document.getElementById('formEdicaoMeta').addEventListener('submit', function(event) {
        event.preventDefault();

        let newName = document.querySelector('.NomeMeta').value;
        let newDescription = document.getElementById('description').value;

        let MetaEditar = JSON.parse(localStorage.getItem('MetaAEditar'));
        let MetasDiarias = JSON.parse(localStorage.getItem('MetasDiarias'))

        for(let i = 0; i < MetasDiarias.length; i++){
            if(MetasDiarias[i].nome === MetaEditar){
                [MetasDiarias[i].nome,MetasDiarias[i].descricao] = [newName,newDescription];
                localStorage.setItem('MetasDiarias',JSON.stringify(MetasDiarias));
                alert('Meta editada com sucesso, atualize a página para visualizá-la');
                break;
            }
        }
    })
}


function CriarTarefa(){
    document.getElementById('CriarTarefa').addEventListener('submit', function(event) {
        event.preventDefault();
        let Popup = document.getElementById('id01')
        let nome = Popup.querySelector('#nomecriartarefa').value;
        let inicio = Popup.querySelector('#Horario1').value
        let fim = Popup.querySelector('#Horario2').value
        let descricao = Popup.querySelector('.description').textContent;
        let status = false;
        let ListaSelecionada = JSON.parse(localStorage.getItem('ListaSelecionada'));
        let Tarefas = JSON.parse(localStorage.getItem('Tarefas'))
        let Calendario = JSON.parse(localStorage.getItem('Calendario'));

        let NewTarefa = new Tarefa(nome,inicio,fim,descricao,status);

        for(let i = 0; i < Tarefas.length; i++){
            if(Tarefas[i][0] === ListaSelecionada){
                Tarefas[i].push(NewTarefa);
                Calendario[i].push(NewTarefa);
                alert('Tarefa criada com sucesso, atualize a página para visualizá-la');
                localStorage.setItem('Tarefas',JSON.stringify(Tarefas));
                localStorage.setItem('Calendario',JSON.stringify(Calendario));
                break;
            }
        }
    })
}

function PesquisarTarefa(){
    document.getElementById('search-text').addEventListener('keydown',function(event){
        if(event.key === "Enter"){
            let DataLista = JSON.parse(localStorage.getItem('ListaSelecionada'));
            let ListaCorreta = new Array();
            let Pesquisa = document.getElementById('search-text').value;
            let aux = 0;
            let Tarefas = JSON.parse(localStorage.getItem('Tarefas'))

            for(let i = 0; i < Tarefas.length; i++){
                if(DataLista === Tarefas[i][0]){
                    ListaCorreta = Tarefas[i]
                    break;
                }
            }
                for(let i = 1; i < ListaCorreta.length; i++){
                    if(ListaCorreta[i].nome === Pesquisa){
                        for(let j = 2; j < ListaCorreta.length; j++){
                            document.querySelector(`.Atv${j}`).remove();
                        }
                        let Atv = document.querySelector('.Atv1');
                        let hr = Atv.querySelector('hr');
                        Atv.style.borderColor = 'black';
                        hr.style.backgroundColor = 'black'
                        Atv.querySelector('#nome').textContent = ListaCorreta[i].nome
                        Atv.querySelector('#time').textContent = `${ListaCorreta[i].inicio} - ${ListaCorreta[i].fim}`
                        return;
                    }
                }
        }
    })
    
}


function CarregarTarefas(){
    let ListaSelecionada = JSON.parse(localStorage.getItem('ListaSelecionada'));
    let spanNome = document.getElementById('MinhasListas')
    spanNome.querySelector('b').innerText = ListaSelecionada
    let Tarefas = JSON.parse(localStorage.getItem('Tarefas'));
    let Table = document.getElementById('TabelaTarefas');
    let aux = 0;
    let trs = 0;
    let troca = true
    for(let i = 0; i < Tarefas.length; i++){
        if(Tarefas[i][0] === ListaSelecionada){
            ListaSelecionada = Tarefas[i];
            break;
        }
    }
    do{
        troca  = false;
        for(let i = 1; i < ListaSelecionada.length - 1; i++){
            let [fimHrs,fimmins] = ListaSelecionada[i].fim.split(':').map(Number);
            let [fimHrs2,fimmins2] = ListaSelecionada[i+1].fim.split(':').map(Number);
            let Hr1 = new Date();
            Hr1.setHours(fimHrs,fimmins,0,0);
            let Hr2 = new Date();
            Hr2.setHours(fimHrs2,fimmins2,0,0);
            if(Hr1 > Hr2){
                [ListaSelecionada[i],ListaSelecionada[i+1]] = [ListaSelecionada[i+1],ListaSelecionada[i]];
                troca = true;
            }
        }
    }while(troca);

    for(let i = 1; i < ListaSelecionada.length; i++){
        let Atv = document.createElement('div');
            Atv.classList.add(`Atv${i}`);

                let TaskColumn = document.createElement('div');
                TaskColumn.classList.add('TaskColumn');

                    let NomeSpan = document.createElement('span');
                    NomeSpan.id = 'nome'
                    NomeSpan.classList.add('nome')
                    NomeSpan.textContent = ListaSelecionada[i].nome;

                    let hr = document.createElement('hr');

                    let TimeSpan = document.createElement('span');
                    TimeSpan.id = 'time'
                    TimeSpan.classList.add('time');
                    TimeSpan.textContent  = `${ListaSelecionada[i].inicio} - ${ListaSelecionada[i].fim}`

                    let iconDescricao = document.createElement('div')
                    iconDescricao.classList.add('iconDescricao')
                
                let CheckColumn = document.createElement('div');
                CheckColumn.classList.add('CheckColumn')
                    
                    let label = document.createElement('label');
                    label.classList.add('checkbox-container')

                        let input = document.createElement('input');
                        input.type = 'checkbox'
                        input.classList.add('checkbox')
                        input.id = 'checkboxTarefa'
                        input.onclick = function() {
                            TerminarTarefa(`.Atv${i}`);
                        };

                        let checkmarkSpan = document.createElement('span');
                        checkmarkSpan.classList.add('checkmark');
            Atv.onclick = function() {
                document.getElementById('id02').style.display = 'block';
                localStorage.setItem('TarefaAEditar',JSON.stringify(ListaSelecionada[i].nome));
                CarregarPopUpEdicaoTarefa()
            }            

            label.appendChild(input);
            label.appendChild(checkmarkSpan);
            CheckColumn.appendChild(label);

            TaskColumn.appendChild(NomeSpan);
            TaskColumn.appendChild(hr);
            TaskColumn.appendChild(TimeSpan)
            TaskColumn.appendChild(iconDescricao)

            Atv.appendChild(TaskColumn)
            Atv.appendChild(CheckColumn)

            let td = document.createElement('td');
            td.appendChild(Atv);
            let NomeLista = JSON.parse(localStorage.getItem('ListaSelecionada'));
            if(NomeLista === hoje()){
                let agora = new Date();
                let hrs = agora.getHours();
                let mins = agora.getMinutes();
                agora = `${hrs}:${mins}`;
                let hr = Atv.querySelector('hr');

                let [fimHrs,fimmins] = ListaSelecionada[i].fim.split(':').map(Number);
                let [fimHrs2,fimmins2] = agora.split(':').map(Number);
                let Hr1 = new Date();
                Hr1.setHours(fimHrs,fimmins,0,0);
                let Hr2 = new Date();
                Hr2.setHours(fimHrs2,fimmins2,0,0);
                if(Hr1 < Hr2){
                    Atv.style.borderColor = 'red';
                    hr.style.backgroundColor = 'red';
                }
            }
            if(aux % 4 === 0){
                trs++;
                let tr = document.createElement('tr');
                tr.ariaLabel = trs;
                tr.appendChild(td);
                Table.appendChild(tr);
                aux ++;
            }else{
                tr = Table.querySelector(`tr[aria-label='${trs}']`);
                tr.appendChild(td);
                aux++
            }
    }
    return;
}


function CarregarMetasDiariasInicio(){
    let aux = 0;
    let BlocoMetas = document.querySelector('.ConteudoMetasDiarias .MetasDiarias');
    let MetasDiarias = JSON.parse(localStorage.getItem('MetasDiarias'));
    let TamanhoVetor = MetasDiarias.length;

    for (let i = 0; i < TamanhoVetor; i++) {
        let Meta = document.createElement('div');
        Meta.classList.add(`Meta${i}`);
        Meta.style.display = 'inline-flex'
        Meta.style.height ='50px'
        Meta.style.alignItems ='center'

        let CheckColumn = document.createElement('div');
        CheckColumn.classList.add('CheckColumn');

        let label = document.createElement('label');
        label.classList.add('checkbox-container');

        let input = document.createElement('input');
        input.classList.add('checkbox');
        input.id = 'checkboxTarefa';
        input.type = 'checkbox';

        let span = document.createElement('span');
        span.classList.add('checkmark');

        let MetaNome = document.createElement('div');
        MetaNome.classList.add('MetaNome');

        let nome = document.createElement('span');
        nome.id = 'nome';
        nome.textContent = MetasDiarias[i].nome;

        MetaNome.appendChild(nome);
        label.appendChild(input);
        label.appendChild(span);
        CheckColumn.appendChild(label);
        Meta.appendChild(CheckColumn);
        Meta.appendChild(MetaNome);
        BlocoMetas.appendChild(Meta);

        if (aux < TamanhoVetor - 1) {
            let hr = document.createElement('hr');
            hr.classList.add('MetaHr');
            BlocoMetas.appendChild(hr);
        }
        aux++;
    }
    metasHeight();
}

function CarregarTarefasInicio(){
    let section = document.querySelector('.Tarefas')
    let Maindiv = section.querySelector('.TarefasDiarias')
    let table = Maindiv.querySelector('table');
    let row = table.querySelector('tr')
    let Tarefas = JSON.parse(localStorage.getItem('Tarefas'));
    let ListaCorreta = new Array();

    for(let i = 0; i < Tarefas.length; i++){
        if(Tarefas[i][0] === hoje()){
            ListaCorreta = Tarefas[i];
            break;
        }
    }
    let troca = true;
    do{
        troca = false;
        for(let i = 1; i < ListaCorreta.length - 1 ; i++){
            console.log(ListaCorreta[i])
            console.log(ListaCorreta[i+1])
            let [fimHrs,fimmins] = ListaCorreta[i].fim.split(':').map(Number);
            let [fimHrs2,fimmins2] = ListaCorreta[i+1].fim.split(':').map(Number);
            let Hr1 = new Date();
            Hr1.setHours(fimHrs,fimmins,0,0);
            let Hr2 = new Date();
            Hr2.setHours(fimHrs2,fimmins2,0,0);
            if(Hr1 > Hr2){
                [ListaCorreta[i],ListaCorreta[i+1]] = [ListaCorreta[i+1],ListaCorreta[i]];
                troca = true;
            }
        }
    }while(troca);

    for(let i = 1; i <= 4; i++){
        let td = row.querySelector(`td[aria-label="${i}"]`)
        let Atv = td.querySelector(`.Atv${i}`);
        Atv.querySelector('.nome').textContent = ListaCorreta[i].nome;
        Atv.querySelector('.time').textContent = `${ListaCorreta[i].inicio} - ${ListaCorreta[i].fim}`
        let hr = Atv.querySelector('hr');

        let agora = new Date();
        let hrs = agora.getHours();
        let mins = agora.getMinutes();
        agora = `${hrs}:${mins}`;
        let [fimHrs,fimmins] = ListaCorreta[i].fim.split(':').map(Number);
        let [fimHrs2,fimmins2] = agora.split(':').map(Number);
        let Hr1 = new Date();
        Hr1.setHours(fimHrs,fimmins,0,0);
        let Hr2 = new Date();
        Hr2.setHours(fimHrs2,fimmins2,0,0);
        if(Hr1 < Hr2){
            Atv.style.borderColor = 'red';
            hr.style.backgroundColor = 'red';
        }
        
    }
    localStorage.setItem('ListaSelecionada',JSON.stringify(hoje()));
}

function CarregarCalendario(){
    let Calendario = JSON.parse(localStorage.getItem('Calendario'));
    let section = document.querySelector('.CalendarArea')
    let Calendar = document.querySelector('.Calendar');
    let Week = Calendar.querySelector('.Week');
    for(let i = 1; i <= 7; i++){
        let weekday = Week.querySelector(`.weekday${i}`);
        let dia = Calendario[i-1][0].split(',');
        weekday.querySelector('.CalendarDayTitle').textContent = dia[0];
        let Task = weekday.querySelector('.Task');

        for(let j = 1; j < Calendario[i-1].length; j++){
            let Taski = document.createElement('div');
            Taski.classList.add(`Task${j}`);
                
                let input = document.createElement('input');
                    input.type = 'checkbox';
                    input.classList.add('checkbox');
                    input.id = 'checkboxTarefa'
                    if(Calendario[i-1][0] === hoje()){
                        if(Calendario[i-1][j].status === false){
                            let agora = new Date();
                            let hrs = agora.getHours();
                            let mins = agora.getMinutes();
                            agora = `${hrs}:${mins}`;
                            let [fimHrs,fimmins] = Calendario[i-1][j].fim.split(':').map(Number);
                            let [fimHrs2,fimmins2] = agora.split(':').map(Number);
                            let Hr1 = new Date();
                            Hr1.setHours(fimHrs,fimmins,0,0);
                            let Hr2 = new Date();
                            Hr2.setHours(fimHrs2,fimmins2,0,0);
                            if(Hr1 < Hr2){
                                input.style.backgroundColor = 'red';
                            }else{
                                input.style.backgroundColor = 'black';
                            }
                        }else{
                            input.style.backgroundColor = 'green';
                        }
                    }else{
                        if(Calendario[i-1][j].status === true){
                            input.style.backgroundColor = 'green';
                        }else{
                            input.style.backgroundColor = 'black';
                        }
                    }
                let span = document.createElement('span');
                span.textContent = Calendario[i-1][j].nome

            Taski.appendChild(input);
            Taski.appendChild(span);
            Task.appendChild(Taski);
        }
    }
    return;
}

function metasHeight() {
    let MetasDiarias = JSON.parse(localStorage.getItem('MetasDiarias')) || [];
    let TamanhoVetor = MetasDiarias.length;
    console.log("Tamanho do vetor:", TamanhoVetor);
    
    let metaHeight = document.querySelector('.MetasDiarias'); // Selecionando o bloco correto
    let alturaPorMeta = 60; // Altura de cada meta
    let paddingBottom = 50; // Padding final para o bloco de metas

    // Ajustando a altura do bloco para o número de metas
    metaHeight.style.height = (TamanhoVetor * alturaPorMeta + paddingBottom) + "px";

    console.log("Altura definida:", metaHeight.style.height);
}
//popup

const texto = document.getElementById("description");

function changeFont(selectedElement) {

    var selectedFont = selectedElement.value;

    document.getElementById("description").style.fontFamily = selectedFont;
}

function changeSize(selectedElement) {
    // Get the selected value (font size)
    var selectedSize = selectedElement.value;

    // Apply the font size to the textarea
    document.getElementById("description").style.fontSize = selectedSize;
}


function boldTransform() {
    event.preventDefault();
    if (texto.style.fontWeight=="bold") {
        texto.style.fontWeight = "normal";
    } else {
        texto.style.fontWeight = "bold";
    }
}

function italicTransform() {
    event.preventDefault();
    if (texto.style.fontStyle=="italic") {
        texto.style.fontStyle = "normal";
    } else {
        texto.style.fontStyle = "italic";
    }
}

function ulTransform() {
    event.preventDefault();

    texto.innerHTML += '<ul>'
    var myul = `<li> Insira aqui </li> <br>`;
    texto.innerHTML += myul; 
}

function checkboxTransform() {
    event.preventDefault(); 
    var checkboxHTML = `<input type="checkbox"> Tarefa`;
    texto.innerHTML += checkboxHTML;
}

function insertUrl() {
    event.preventDefault(); 
    var url = prompt("Enter the URL:");
    if (url) {
        if (url) {
            var selectedText = window.getSelection().toString();
            if (selectedText) {
                var anchor = `<a href="${url}" target="_blank">${selectedText}</a>`;
                document.execCommand('insertHTML', false, anchor);  
            } else {
                var anchor = `<a href="${url}" target="_blank">${url}</a>`;
                document.execCommand('insertHTML', false, anchor);
            }
        }
    }
}

function fileTrigger() {
    event.preventDefault(); 
    document.getElementById("imageAdd").click();
}

function uploadImage() {
    
    event.preventDefault(); 
    var fileInput = document.getElementById("imageAdd");
    var file = fileInput.files[0]; 

    if (file && file.type.startsWith('image')) {
        var reader = new FileReader();
        reader.onload = function(x) {

            var imgElement = document.createElement("img");
            imgElement.src = x.target.result;

            imgElement.style.maxWidth = "100px";
            imgElement.style.maxHeight = "100px";


            document.getElementById("description").innerHTML += imgElement.outerHTML;
        };

        reader.readAsDataURL(file); 
    } else {
        alert("Please select a valid image or gif.");
    }
}

function handleSubmit(event) {
    event.preventDefault(); 
    document.getElementById('id01').style.display = 'none';

}
function handleSubmit(event) {
    event.preventDefault(); 
    document.getElementById('id02').style.display = 'none';

}
function handleSubmit(event) {
    event.preventDefault(); 
    document.getElementById('id03').style.display = 'none';

}
