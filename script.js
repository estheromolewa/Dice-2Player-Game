'use script'


// SELECTING ELEMENTS
const sectionPlayer1 = document.querySelector('.player1')
const sectionPlayer2 = document.querySelector('.player2')

const score1El = document.querySelector('#score-1')
const score2El = document.querySelector('#score-2')
const rollBtn = document.querySelector('.btn-roll')
const newBtn = document.querySelector('.btn-new')
const holdBtn = document.querySelector('.btn-hold')

// elements to be displayed and updates the current scores of the current player
const current1Player = document.querySelector('#current-score-1')
const current2Player = document.querySelector('#current-score-2')

// hiding the img from displaying until button roll is clicked
const diceImg = document.querySelector('.dice')
diceImg.classList.add('hide')


// creating/ declaring variables globally so that in the init function we can re assign values to it: STARTING CONDITIONS
let playing , currentScore , activePlayer, scores

// FUNCTIONs
const init = ()=>{
    //re assigning values to those variables declared globally 
    scores = [0,0,0]
    playing = true
    currentScore = 0
    activePlayer = 1

    // resets the current score and total score to 0
    score1El.textContent = 0
    score2El.textContent = 0

    current1Player.textContent = 0
    current2Player.textContent = 0
    score1El.textContent = 0
    score2El.textContent = 0

    // removes the styles when there is a winner
    sectionPlayer1.classList.remove('player-winner')
    sectionPlayer2.classList.remove('player-winner')
    sectionPlayer1.classList.add('player-active')
    sectionPlayer2.classList.remove('player-active')
}
init()

const switchPlayer = ()=>{
    // yes switch player using the activeplayer value to target it dynamically for both players 
    document.getElementById(`current-score-${activePlayer}`).textContent = 0
    activePlayer = activePlayer === 1 ? 2 : 1
    currentScore = 0
    // toggle adds a classlist if it is not on an element if it is: it removes the element
    // hence the player active class has some styles that adds to the background color
    sectionPlayer1.classList.toggle('player-active')
    sectionPlayer2.classList.toggle('player-active')  
}

function randomDice(){
    if(playing){
        let diceValue = Math.trunc(Math.random() * 6) + 1;

        // Display the dice
        diceImg.classList.remove('hide')
        diceImg.src = `images/red-dice-${diceValue}.svg`

        // Checks if it is 1,  add dice roll to current score for either player1 or player2, this work dynamically rather than static for just one player at a time
        if (diceValue !== 1){
            currentScore += diceValue
            document.getElementById(`current-score-${activePlayer}`).textContent = currentScore
            // current0Player.textContent = currentScore
        }else{
            switchPlayer()
        }
    }
}

function holdDice(){ 
    if(playing){

        // add the current score to the active player score by updating h2 that accumulates the score
        scores[activePlayer] += currentScore        
        document.getElementById(`score-${activePlayer}`).textContent = scores[activePlayer]
        diceImg.classList.add('hide')

        // if the total score is greater than 100 current player wins
        if (scores[activePlayer] >= 20){
            playing = false
            document.querySelector(`.player${activePlayer}`).classList.add('player-winner')
            document.getElementById(`player${activePlayer}`).classList.remove('player-active')
        }else{
            // if the total score is less than 100 switch player
            switchPlayer()
        }
    }
}

// ROLLING THE DICE 
rollBtn.addEventListener('click', randomDice)

// HOLDING THE DICE
holdBtn.addEventListener('click', holdDice)

//new button
newBtn.addEventListener('click', init)



 