let input = ``

const result = input.split('\n').reduce((matches, text) => {
    const chars = text.split('')
    let counts = {}

    for (let char of chars) {
		counts[char] = (counts[char] || 0) + 1
    }
    
    if (Object.values(counts).includes(2)) matches['doubles']++
    if (Object.values(counts).includes(3)) matches['triples']++
    
    return matches
    
}, { doubles: 0, triples: 0 })

const checksum = result['doubles'] * result['triples']
