const tictactoeboard = (function() {

    let rows = 3;
    let columns = 3;

    let board = [];

    for (let i = 0; i < rows; i++) {
        board[i] = [];

        for (let j = 0; j < columns; j++) {
            board[i].push('');
        }
    }

    const getBoard = () => board;

    const printBoard = () => {
        console.table(board);
    }

    const plotPoint = (row, column, token) => {
        if (board[row][column] !== '') {


            return 1;
        }
        else {
            board[row][column] = token;
            return 0;
        }
    }

    return {
        printBoard,
        getBoard,
        plotPoint
    }
})();

function Player(playerName, playerToken) {
    

    return {
        name: playerName,
        token: playerToken
    }

}





const game = ( function() {
    let playerOne = null;
    let playerTwo = null;
    let activePlayer = null;
    let winner = 0;
    let tie = 0;
    let board = tictactoeboard;

    const setPlayers = (oneName, twoName) => {
        playerOne = Player(oneName, "X");
        playerTwo = Player(twoName, "O");
        activePlayer = playerOne;
        console.log(printMessage()); // Print the initial message
    }

    const switchActivePlayer = () => {
        activePlayer = activePlayer === playerOne ? playerTwo : playerOne;
    }

    const getActivePlayer = () => activePlayer;

    const printMessage = () => {
        return `${getActivePlayer().name}'s turn`
    }

    function checkWinner (gameboard){
        const array_of_results = gameboard.flat();
        let winner = 0;
        const winning_lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];
    
        for (const line of winning_lines) {
            const [a, b, c] = line;
            if (array_of_results[a] !== '' && array_of_results[a] === array_of_results[b] && array_of_results[a] === array_of_results[c]) {
                return 1; // There's a winner
            }
        }
    
        return 0;
    
    
    }
    
    function checkTie (gameboard){
        for (let row=0; row < gameboard.length; row++){ 
         for (let column=0; column < gameboard[row].length; column++) {
            if (gameboard[row][column] === '') {
                return 0;
            }
         }
        }
        return 1;
       
     }

    const playRound = (row, column) => {

      
            if (winner === 1 || tie === 1) {
                console.log("This Game is Over! Please Start a New Game!")
                return;
            }


            let invalid_move = board.plotPoint(row, column, getActivePlayer().token);

            if (invalid_move === 1) {
                console.log(`${row} ${column} is an invalid move! Try again ${getActivePlayer().name}!`)
                return;
            }
            board.printBoard();
            
            let gameboard = board.getBoard();
             winner = checkWinner(gameboard);
             tie = checkTie(gameboard);
            
            if (winner === 1) {
                console.log(`There is a winner. The winner is ${getActivePlayer().name}`);
                return;
            }

            if (tie === 1) {
                console.log (`This game is a tie!`)
                return;
            }
           
            switchActivePlayer();
            console.log(printMessage());

       
        


    }

    


    return {
        getActivePlayer,
        playRound, 
        setPlayers
    }
})();

game.setPlayers('Tyler', 'Stella');

game.playRound(0, 2);
game.playRound(0, 0);
game.playRound(1, 1);
game.playRound(2, 1);
game.playRound(2, 1);
game.playRound(2, 2);
game.playRound(2, 0);
game.playRound(1, 0);
game.playRound(1, 2);
game.playRound(0, 1);
