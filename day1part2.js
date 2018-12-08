input = ``.split('\n').map(number => parseInt(number))

function getFrequency(input, frequency = [0]) {

    let result = undefined

    frequency = input.reduce((acc, curr) => { 
        if (result === undefined && acc.includes(acc[acc.length - 1] + curr)) result = acc[acc.length - 1] + curr
        acc.push(acc[acc.length - 1] + curr)
        return acc
    }, frequency)

    if (result) return result
    return getFrequency(input, frequency)
}

const result = getFrequency(input)
