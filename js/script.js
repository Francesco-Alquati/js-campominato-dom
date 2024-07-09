// DICHIARO BOMBS
let bombs;

// DICHIARO IL PUNTEGGIO
let score = 0;

// DICHIARO LE VARIABILI PER LA CREAZIONE DELLE CELLE PER LIVELLO
let totalCells;
let sideCells;

let gameOver = false;

// FUNZIONE PER DETERMINARE UN MASSIMO DI CELLE PER LIVELLO
function getDifficultyMax(difficulty) {

    switch (difficulty) {
      case 1:
        return 100; // Difficoltà Facile: Range 1-100
      case 2:
        return 81; // Difficoltà Media: Range 1-81
      case 3:
        return 49; // Difficoltà Difficile: Range 1-49
      default:
        alert(`Difficoltà non valida: ${difficulty}`);
    }
}

// FUNZIONE CHE GENERA LE BOMBE
function generateBombs(difficulty) {
    let bombs = [];
    let randomCell;
    const numbombs = 16;

while(bombs.length < numbombs){
        // Genera cella casuale nel range di difficoltà
        randomCell = Math.floor(Math.random() * getDifficultyMax(difficulty)) + 1;
        if(!bombs.includes(randomCell)){
            //PUSHO NELL'ARRAY IN NUMERO CASUALE GENERATO SE NON è UN DUPLICATO
            bombs.push(randomCell);
        }
}

    
    // // GENERA 16 BOMBE CASUALI SENZA DUPLICATI
    // for (let i = 0; i < numbombs; i++) {
        
    //     do {
    //         // Genera cella casuale nel range di difficoltà
    //         randomCell = Math.floor(Math.random() * getDifficultyMax(difficulty)) + 1;
    //         // Controllo duplicati
    //     } while (bombs.indexOf(randomCell) !== -1); 
  
    //     //PUSHO NELL'ARRAY IN NUMERO CASUALE GENERATO SE NON è UN DUPLICATO
    //     bombs.push(randomCell);
    // }

    bombs.sort((a, b) => a - b);
    
    // STAMPO L'ARRAY IN CONSOLE
    console.log(`${bombs}`);

    return bombs;

}

// FUNZIONE CHE CREA Il SINGOLO QUADRATO DELLA GRIGLIA
function createSquare(num, sideNumber){

    // CREO IL SINGOLO QUADRATO 
    const square = document.createElement('div');

    // AGGIUNGO LA CLASSE SQUARE
    square.classList.add('square');

    // DETERMINO LA W E LA H DEL QUADRATO
    let sideLength = `calc(100% / ${sideNumber})`;
    square.style.width = sideLength;
    square.style.height = sideLength;

    // NUMERO PROGRESSIVO
    square.innerText = num + 1;

    // AGGIUNGO EVENTO CLICK ALLA CELLA
    square.addEventListener('click', function() {

        const clickedNumber = parseInt(this.innerText);
        let dom_score = document.getElementById('score')

        if (gameOver === false && this.classList.contains('clicked') === false){

            if (bombs.includes(clickedNumber)) {
                // AGGIUNGO LA CLASSE AL CLICK SE TROVO LA BOMBA
                this.classList.add('red');
                gameOver = true;
                dom_score.classList.remove('d-none');
                dom_score.innerHTML = `hai perso, il tuo punteggio è: <span class="text-red">${score}</span>`;
                
            } else{
                // AGGIUNGO LA CLASSE AL CLICK SE NON TROVO LA BOMBA
                this.classList.add('clicked');
                score++;
    
                if (score === (totalCells - 16)) {
                    gameOver = true;
                    dom_score.classList.remove('d-none');
                    dom_score.innerHTML = `hai vinto, il tuo punteggio è: <span class="text-red">${score}</span>`;
                   
                }
            }
          
           
            // STAMPO LA CELLA CLICCATA
            console.log(`cella cliccata ${this.innerText}`);
        }


    });

    // RESTITUISCO IL QUADRATO
    return square;
}

// DEFINIZIONE FUNZIONE CHE MI GENERA LA GRIGLIA
function generateGrid(cellsNumber, sideNumber) {

    // RECUPERO L'ELEMENTO CHE CONTERRà LA GRID
    const grid = document.getElementById('grid');

    // ESEGUO UN CICLO PER CREARE LA GRID
    for(let i = 0; i < cellsNumber; i++){
        
        // RICHIAMO LA FUNZIONE
        let item = createSquare(i, sideNumber);


        // APPENDO IL QUADRATO NELLA GRID
        grid.append(item);
    }
}

function createNewGame() {

    // RECUPERO IL LIVELLO DI DIFFICOLTA
    let difficulty = parseInt(document.getElementById('difficulty').value);
    
    if (difficulty != 0) {

        // SVUOTO LA GRIGLIA DA TUTTI I SUOI ELEMENTI
        grid.innerHTML = '';

        // SWITCH PER DETERMINARE LA GRIGLIA IN BASE ALLA DIFFICOLTà
        switch (difficulty) {
            case 1:
                totalCells = 100;
                sideCells = 10;
                break;
            case 2:
                totalCells = 81;
                sideCells = 9;
                break;
            case 3:
                totalCells = 49;
                sideCells = 7;
                break;
            default:
                console.log('difficoltà non selezionata')
        }

        // DOBBIAMO GENERARE LE CASELLE
        generateGrid(totalCells, sideCells);

        // RICHIAMO LA FUNZIONE CHE GENERQA LE BOMBE
        bombs = generateBombs(difficulty);
        
    }
    else{
        alert("difficoltà non selezionata");
    }
   
}

// RECUPERO IL BUTTON
const btn = document.getElementById('start');

// FUNZIONE ANONIMA PER IL BUTTON
btn.addEventListener('click', function(){

    // CHIAMO LA FUNZIONE CHE MI FA COMINCIARE LA PARTITA
    createNewGame();
})