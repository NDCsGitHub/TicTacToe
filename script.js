
const gameBoard = (function (){
   


    const winningCondition = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0 ,4, 8],
        [2, 4, 6]
    ];
    


    //create 3x3 gameboard
    function createBoard (){
        for (i=0; i<9; i++){
        const gameBoardContainer = document.querySelector('.gameBoardContainer')
        let cell = document.createElement('div');
        cell.textContent="";
        cell.classList.add('cell');
        gameBoardContainer.appendChild(cell);
        }
    }
    createBoard()



    //functions for player one & two input
    const cells = document.querySelectorAll('.cell');
    const gameBoardContainer = document.querySelector('.gameBoardContainer');
    const playerX = "x";
    const playerO = "o";
    let xTurn = true;
 
    function applyMarker(){
        cells.forEach(eachcell=>eachcell.addEventListener('click', addMarker, {once:true}));
    }
    function addMarker(e){
        const cell = e.target;
        const currentTurn = xTurn? playerX:playerO;  
        cell.classList.add(currentTurn);
        alternatingTurn()
        hoverEffect()
        checkWinner(currentTurn)
    }
 


    //function for switching between turns
    function alternatingTurn(){
        xTurn = !xTurn;
    }




    //functions for adding hover effect 
    function hoverEffect(){
        gameBoardContainer.classList.remove('x')
        gameBoardContainer.classList.remove('o')
        if (xTurn === true){
            gameBoardContainer.classList.add('x')
        } else {
            gameBoardContainer.classList.add('o')
        }

    }

    //function to check for winner.
    function checkWinner(currentTurn){
        const winnerIs = document.querySelector('.winner')
        const winner = winningCondition.some(condition => {
             return condition.every(conditionIndex => {
                return cells[conditionIndex].classList.contains(currentTurn)
            })
        })

        cellsArr = Array.from(cells)
    
        const tie = cellsArr.every(cell=>{
           return cell.classList.contains("x") || cell.classList.contains("o")
        })

        
        


        if (winner === true){
            winnerIs.textContent = `Player ${currentTurn.toUpperCase()} is the winner`;
            disableInput()
        } else if (tie === true){
            winnerIs.textContent="Tie"
        }
    }
    

  



    //function to disable player's input
    function disableInput(){
        gameBoardContainer.classList.remove('x')
        gameBoardContainer.classList.remove('o')
        cells.forEach(eachcell =>eachcell.removeEventListener('click', addMarker))
        cells.forEach(eachcell =>eachcell.style.cursor="default")
    }



    //function for restart button
    function restart(){
        const restartButton = document.querySelector('.restartButton')
        restartButton.addEventListener('click', ()=>{
            window.location.reload();
        })
    }

    

    return{
        playerSelect:applyMarker(),
        hoverEffect:hoverEffect(),
        restart:restart(),
    }

})();


