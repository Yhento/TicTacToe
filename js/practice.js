

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

    const clearBoard = () => {
        board = board.map(row => row.map(() => ""));

    }

    return {
        printBoard,
        getBoard,
        plotPoint,
        clearBoard
    }
})();

function Player(playerName, playerToken) {
    

    return {
        name: playerName,
        token: playerToken
    }

}


const ui = ( function() {

    const createElement = (tag, class_name = '') => {
        element = document.createElement(tag);
        
        if (class_name) {
            element.classList.add(class_name);
        }

        return element;
    }

    let message = createElement('span', 'game-message');

    document.querySelector('.players-message').append(message);

    const getMessage = () => message;

    const renderGameBoard = () => {
        for(i=0; i < 3; i++){

            for(j=0; j < 3; j++) {

                game_square = createElement('div', 'game-square')
                game_square.dataset.row = i;
                game_square.dataset.column =j;


                

                document.querySelector('.game-wrapper').append(game_square);
            }

        }
    }

    const updateGameBoard = () => {
        let gameboard = tictactoeboard.getBoard();
        let game_squares = document.querySelectorAll(".game-square");
        
        game_squares.forEach( square => {

            square.textContent = gameboard[square.dataset.row][square.dataset.column];

            if (square.textContent !== '') {
                square.textContent === 'X' ? square.style.color = 'blue' : square.style.color = 'red';
            }

        });

   
            
        
    }
    const createResetButton = () => {

        let reset_button = createElement('button', 'reset');
        console.log(reset_button);
        reset_button.textContent = "Restart Game"
        reset_button.onclick = game.resetGame;
        document.querySelector(".players-message").appendChild(reset_button);

    }




return {
    getMessage,
    renderGameBoard,
    updateGameBoard,
    createElement,
    createResetButton
}


})();


const game = ( function() {
    let playerOne = null;
    let playerTwo = null;
    let activePlayer = null;
    let winner = 0;
    let tie = 0;
    let board = tictactoeboard;
    let message = ui.getMessage();

    const startGame = () => {
        let playerOneTextBox = document.getElementById('playerone');
        let playerTwoTextBox = document.getElementById('playertwo');
        let player_message_area = document.querySelector('.players-message');
        const formfields = document.querySelector('.players-message').querySelectorAll('.form-field');
        const start_button = document.querySelector('.start_button');
        
        if (playerOneTextBox.value.trim() === '' || playerTwoTextBox.value.trim() === '') {

            message.textContent = `Player Names' Cannot Be Blank!`
            return;

        }

        player1_label = ui.createElement('div', 'player-label');
        player2_label =  ui.createElement('div', 'player-label');

        player1_label.textContent = `Player One: ${playerOneTextBox.value} is X`
        player2_label.textContent = `Player Two: ${playerTwoTextBox.value} is O`

        message.textContent = '';

        player_message_area.append(player1_label, player2_label, message);

        formfields.forEach(formfield => {

            player_message_area.removeChild(formfield);

        });

        player_message_area.removeChild(start_button);

        game.setPlayers(playerOneTextBox.value, playerTwoTextBox.value);
        ui.renderGameBoard();
        game.initializeControls();

        
    

    }

    const resetGame = () => {
        const player_message_area = document.querySelector('.players-message');
        const reset_button = document.querySelector('.reset');
        board.clearBoard();
        winner = 0;
        tie = 0;
        activePlayer = playerOne;
        message.textContent = printMessage();
        ui.updateGameBoard();

        player_message_area.removeChild(reset_button);
 
 
 
     }

    

    const initializeControls = () => {
        game_squares = document.querySelectorAll('.game-square');

        game_squares.forEach( square => {

            square.addEventListener('click', (e) => {

                playRound(square.dataset.row, square.dataset.column);
                ui.updateGameBoard();

            })
        });
    }

    const setPlayers = (oneName, twoName) => {
        playerOne = Player(oneName, "X");
        playerTwo = Player(twoName, "O");
        activePlayer = playerOne;
        message.textContent = printMessage();
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
                
                return;
            }


            let invalid_move = board.plotPoint(row, column, getActivePlayer().token);

            if (invalid_move === 1) {
                
                message.textContent = `This spot is taken! Try again ${getActivePlayer().name}!`
                return;
            }
            
            
            let gameboard = board.getBoard();
             winner = checkWinner(gameboard);
             tie = checkTie(gameboard);
            
            if (winner === 1) {
                message.textContent = `There is a winner. The winner is ${getActivePlayer().name}`
                ui.createResetButton();
                return;
            }

            if (tie === 1) {
                
                message.textContent= "This game is a tie!"
                ui.createResetButton();
                return;
            }
           
            switchActivePlayer();
            message.textContent = printMessage();

       
        


    }

    


    return {
        getActivePlayer,
        playRound, 
        setPlayers,
        initializeControls,
        startGame,
        resetGame
    }
})();









