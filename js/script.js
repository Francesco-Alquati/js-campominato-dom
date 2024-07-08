// DICHIARO BOMBS
let bombs;

// FUNZIONE CHE GENERA LE BOMBE
function generateBombs(difficulty) {
    bombs = [];
    let randomCell;

    // GENERA 16 BOMBE CASUALI SENZA DUPLICATI
    for (let i = 0; i < 16; i++) {
        do {
          randomCell = Math.floor(Math.random() * (difficulty === 1 ? 100 : (difficulty === 2 ? 81 : 49)) + 1);
        } while (bombs.includes(randomCell)); 
  
        //PUSHO NELL'ARRAY IN NUMERO CASUALE GENERATO SE NON è UN DUPLICATO
        bombs.push(randomCell);
    }
  
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

        // AGGIUNGO LA CLASSE AL CLICK
        this.classList.add('clicked');
       

        // STAMPO LA CELLA CLICCATA
        console.log(`cella cliccata ${this.innerText}`);

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

function createNewGame(bombs) {

    // RECUPERO IL LIVELLO DI DIFFICOLTA
    let difficulty = parseInt(document.getElementById('difficulty').value);
    
    if (difficulty != 0) {

        // SVUOTO LA GRIGLIA DA TUTTI I SUOI ELEMENTI
        grid.innerHTML = '';

        // VALUTARE IL VALORE DI DIFFICOLTà, IN BASE AL VALORE AVRò UN NUMERO DI CASELLE PER LATO DIFFERENTE
        let totalCells; 
        let sideCells;

        // SWITCH PER DETERMINARE I VALORI DELLE DUE VARIABILI SOPRA
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
