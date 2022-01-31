let yourVoteFor = document.querySelector(".left1 span");
let positionName = document.querySelector(".left2 span");
let description = document.querySelector(".informations");
let instructions = document.querySelector(".div2");
let rightContent = document.querySelector(".div1-right");
let numberBox = document.querySelector(".numberBox");
let res = document.querySelector(".result");

let currentStage = 0;
let squareNumber = "";
let white = false;
let allVotes = [];

function startStage() {
    white = false;
    let stages = stage[currentStage];
    let numberHtml = "";
    squareNumber = "";

    for (let i = 0; i < stages.numbers; i++) {        //Adicionar o numero de quadrados necessario para votar.
        if (i === 0) {
            numberHtml += '<div class="square focus"></div>'
        } else {


            numberHtml += '<div class="square"></div>';
        }
    }

    yourVoteFor.style.display = "none";
    positionName.innerHTML = stages.position;   //informações necessarias para começar os processos.
    description.innerHTML = "";
    instructions.style.display = "none";
    rightContent.innerHTML = "";
    numberBox.innerHTML = numberHtml;

}

function updateDisplay() {
    let stages = stage[currentStage];

    let candidate = stages.candidates.filter((item) => {
        if (item.number === squareNumber) {
            return true;
        } else {
            return false;
        }
    });

    if (candidate.length > 0) {
        candidate = candidate[0];

        yourVoteFor.style.display = 'block';
        instructions.style.display = 'block';
        description.innerHTML = `Nome: ${candidate.name}</br> Partido: ${candidate.partido}`;

        let picturesHtml = '';
        for (let i in candidate.picture) {
            if (candidate.picture[i].small) {
                picturesHtml += `<div class="right1 small"> <img src="${candidate.picture[i].url}" alt=""/>${candidate.picture[i].legenda}</div>`

            } else {
                picturesHtml += `<div class="right1"> <img src="${candidate.picture[i].url}" alt=""/>${candidate.picture[i].legenda}</div>`
            }

        }
        rightContent.innerHTML = picturesHtml;
    } else {
        yourVoteFor.style.display = 'block';
        instructions.style.display = 'block';
        description.innerHTML = "<div class= 'warning focus'>VOTO NULO</div>";


    }

}


function clicou(n) {
    let numberEl = document.querySelector('.square.focus');
    if (numberEl !== null) {
        numberEl.innerHTML = n;
        squareNumber = `${squareNumber}${n}`;

        numberEl.classList.remove('focus');   //tira o foco do numero depois de digitado
        if (numberEl.nextElementSibling !== null) {        //verifica se tem um proximo campo
            numberEl.nextElementSibling.classList.add('focus')  //adiciona o foco ao proximo elemento
        } else {              //Se nao tiver próximo elemento, chama minha função para atualziar dislay.
            updateDisplay();
        }


    }
}


function branco() {
    if (squareNumber === '') {
        white = true;
        yourVoteFor.style.display = 'block';
        instructions.style.display = 'block';
        numberBox.innerHTML = '';
        description.innerHTML = "<div class= 'warning focus'>VOTO EM BRANCO</div>";

    }
}

function corrige() {
    startStage();
}

function confirma() {
    let stages = stage[currentStage];

    let confirmVotes = false;
    if (white === true) {
        confirmVotes = true;
        allVotes.push({
            etapa: stage[currentStage].position,
            voto: 'Voto em branco',
            candidatos: 'Voto em branco'

        })
    } else if (squareNumber.length === stages.numbers) {
        confirmVotes = true; // voto valido
        let positionCandidate; // candidato inteiro

        // retorna obj candidato do numero
        stage[currentStage].candidates.forEach(candidate => {
            if (candidate.number === squareNumber) {
                positionCandidate = candidate // {}
            }
        })

        console.log(positionCandidate)

        if (positionCandidate === undefined) {
            positionCandidate = {name: "Voto nulo"};
        }

        allVotes.push({
            etapa: stage[currentStage].position,
            candidatos: positionCandidate.name,
            voto: squareNumber
        })

    }

    if (confirmVotes) {
        currentStage++;
        if (stage[currentStage] !== undefined) {
            startStage();
        } else {
            res.innerHTML += 'Seus votos computados: <br/> '
            document.querySelector(".screen").innerHTML = "<div class= 'final-warning focus'>FIM!</div>";
            console.table(allVotes)
            allVotes.forEach(vote => {
                    res.innerHTML += '<br/>'
                    res.innerHTML += '<br/> <hr/>Cargo: ' + vote.etapa
                    res.innerHTML += '<br/> <hr/>Número: ' + vote.voto
                    res.innerHTML += '<br/> <hr/>Nome: ' + vote.candidatos
                }
            )
        }
    }
}


startStage()

