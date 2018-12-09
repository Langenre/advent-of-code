function startGame(players, marbles) {
    
    class Current {
        constructor(value, prev, next) {
            this.value = value
            this.prev = prev || this
            this.next = next || this
        }
    }

    const scores = Array(players + 1).fill(0)
    let currentPlayer = 0
    
    let current = new Current(0)

    for (let marble = 1; marble <= marbles * 100; marble++) {
        
        if (marble % 23 === 0) {
        
            scores[currentPlayer] += marble
            current = current.prev.prev.prev.prev.prev.prev.prev
            scores[currentPlayer] += current.value
            current.prev.next = current.next
            current.next.prev = current.prev
            current = current.next
        
        } else {

            const nextMarble = new Current(marble, current.next, current.next.next)
            current.next.next.prev = nextMarble
            current.next.next = nextMarble
            current = nextMarble
            
        }
        currentPlayer = currentPlayer % players + 1
    }
    return scores.reduce((acc, val) => val > acc ? val : acc, 0)
}
const result = startGame(476, 71431)
