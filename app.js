// All javascript coded written in event listener
document.addEventListener('DOMContentLoaded', () => {
    const gridDisplay = document.querySelector('.grid')
    const scoreDisplay = document.getElementById('score')
    const resultDisplay = document.getElementById('result')
    const width = 4 // 4x4 grid
    let allSquares = []
    let score = 0

    // creating a board
    function makeBoard() {
        for(let i = 0; i < width * width; i++) {
            square = document.createElement('div')
            square.innerHTML = 0
            gridDisplay.appendChild(square)
            allSquares.push(square) // pushing all squares in one array
        }
        doRandom()
        doRandom()
    }
    makeBoard()

    // randomly want to start with a number at a random position:
    function doRandom() {
        let randomNumber = Math.floor(Math.random() * allSquares.length)
      // floor ensures random num doesn't exceed length

    // check if can place 2 at random square aka if square's value = 0:
        if(allSquares[randomNumber].innerHTML == 0) {
            allSquares[randomNumber].innerHTML = 2

            // add pop animation
            allSquares[randomNumber].classList.add('pop')
            setTimeout(() => {
                allSquares[randomNumber].classList.remove('pop')
            }, 200)

            loser()
        } else doRandom()

    }

    // user swipes right
    function swipeRight() {
        for (let i = 0; i < 16; i++) {
            if (i % 4 === 0) {
                let totalOne = allSquares[i].innerHTML
                let totalTwo = allSquares[i + 1].innerHTML
                let totalThree = allSquares[i + 2].innerHTML
                let totalFour = allSquares[i + 3].innerHTML
                
                // changing from string to ints:
                let row = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]

                let filteredRow = row.filter(num => num)

                let empty = 4 - filteredRow.length
                // creating an array of zeros based on num of elements missing
                let zeros = Array(empty).fill(0)

                // making sure they go towards the right side
                let newRow = zeros.concat(filteredRow)

                allSquares[i].innerHTML = newRow[0]
                allSquares[i + 1].innerHTML = newRow[1]
                allSquares[i + 2].innerHTML = newRow[2]
                allSquares[i + 3].innerHTML = newRow[3]

            }
        }
    }
    // when user swipes left
    function swipeLeft() {
        for (let i = 0; i < 16; i++) {
            if (i % 4 === 0) {
                let totalOne = allSquares[i].innerHTML
                let totalTwo = allSquares[i + 1].innerHTML
                let totalThree = allSquares[i + 2].innerHTML
                let totalFour = allSquares[i + 3].innerHTML
                // // changing from string to ints:
                // parseInt(totalOne)
                // parseInt(totalTwo)
                // parseInt(totalThree)
                // parseInt(totalFour)
                // store in an array to show row
                let row = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]

                let filteredRow = row.filter(num => num)

                let empty = 4 - filteredRow.length
                // creating an array of zeros based on num of elements missing
                let zeros = Array(empty).fill(0)

                // making sure they go towards the right side
                let newRow = filteredRow.concat(zeros)

                allSquares[i].innerHTML = newRow[0]
                allSquares[i + 1].innerHTML = newRow[1]
                allSquares[i + 2].innerHTML = newRow[2]
                allSquares[i + 3].innerHTML = newRow[3]

            }
        }
    }

    // when want to move down:
    function swipeDown() {
        for (let i = 0; i <4; i++){     // iterating through columns, not rows
            let totalOne = allSquares[i].innerHTML
            let totalTwo = allSquares[i + width].innerHTML
            let totalThree = allSquares[i + (width * 2)].innerHTML
            let totalFour = allSquares[i + (width * 3)].innerHTML

            let column = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]
            let filteredColumn = column.filter(num => num)
            let missing = 4 - filteredColumn.length
            let zeros = Array(missing).fill(0)
            let newCol = zeros.concat(filteredColumn)

            allSquares[i].innerHTML = newCol[0]
            allSquares[i + width].innerHTML = newCol[1]
            allSquares[i + (width * 2)].innerHTML = newCol[2]
            allSquares[i + (width * 3)].innerHTML = newCol[3]
        }
    }

        // when want to move up:
        function swipeUp() {
            for (let i = 0; i <4; i++){     // iterating through columns, not rows
                let totalOne = allSquares[i].innerHTML
                let totalTwo = allSquares[i + width].innerHTML
                let totalThree = allSquares[i + (width * 2)].innerHTML
                let totalFour = allSquares[i + (width * 3)].innerHTML
    
                let column = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]
                let filteredColumn = column.filter(num => num)
                let missing = 4 - filteredColumn.length
                let zeros = Array(missing).fill(0)
                let newCol = filteredColumn.concat(zeros)   //concat opposite way of swipe doen
    
                allSquares[i].innerHTML = newCol[0]
                allSquares[i + width].innerHTML = newCol[1]
                allSquares[i + (width * 2)].innerHTML = newCol[2]
                allSquares[i + (width * 3)].innerHTML = newCol[3]
            }
        }

    function combineRow() {
        for(let i = 0; i < 15; i++) {
            // if 2 nums next to each other are the same
            if(allSquares[i].innerHTML === allSquares[i + 1].innerHTML) {
                // adding:
                let newValue = parseInt(allSquares[i].innerHTML) + parseInt(allSquares[i + 1].innerHTML)
                allSquares[i].innerHTML = newValue

                // add pop animation
                allSquares[i].classList.add('pop')
                setTimeout(() => {
                    allSquares[i].classList.remove('pop')
                }, 200)

                allSquares[i + 1].innerHTML = 0
                score += newValue
                scoreDisplay.innerHTML = score
            }
        }
        winner()
    }

    function combineColumn() {
        for(let i = 0; i < 12; i++) {   // 12 bc checking square directly below square being looped over
            // if 2 nums next to each other are the same
            if(allSquares[i].innerHTML === allSquares[i + width].innerHTML) {
                // adding:
                let newValue = parseInt(allSquares[i].innerHTML) + parseInt(allSquares[i + width].innerHTML)
                allSquares[i].innerHTML = newValue
                
                // add pop animation
                allSquares[i].classList.add('pop')
                setTimeout(() => {
                    allSquares[i].classList.remove('pop')
                }, 200)
                
                allSquares[i + width].innerHTML = 0
                score += newValue
                scoreDisplay.innerHTML = score
            }
        }
        winner()
    }

    // assign controls to functions:
    function control(e) {
        if(e.keyCode === 39) {
            keyRight()
        }
        if(e.keyCode === 37) {
            keyLeft()
        }
        if(e.keyCode === 40) {
            keyDown()
        }
        if(e.keyCode === 38) {
            keyUp()
        }
    }

    document.addEventListener('keyup', control)

    function keyRight() {
        swipeRight()
        combineRow()
        swipeRight()
        doRandom()
    }

    function keyLeft() {
        swipeLeft()
        combineRow()
        swipeLeft()
        doRandom()
    }

    function keyDown() {
        swipeDown()
        combineColumn()
        swipeDown()
        doRandom()
    }

    function keyUp() {
        swipeUp()
        combineColumn()
        swipeUp()
        doRandom()
    }

    // check if win (reached 2048)
    function winner() {
        for (let i = 0; i < allSquares.length; i++) {
            if(allSquares[i].innerHTML == 2048) {
                resultDisplay.innerHTML = 'You have won!'
                document.removeEventListener('keyup', control)
            }
        }
    }

    // check if lost (no zeros on board)
    function loser() {
        let zeros = 0
        for(i = 0; i < allSquares.length; i++) {
            if (allSquares[i].innerHTML == 0) {
                zeros++
            }
        }
        if (zeros === 0) {
            resultDisplay.innerHTML = 'You have lost :('
            document.removeEventListener('keyup', control)
        }
    }
})
