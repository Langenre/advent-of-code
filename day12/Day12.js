let input = ``
let state = ``
state = { ...state.split('') }

const modifications = {}
input.split('\n').forEach(text => {
    const mod = /([.|#]*) => ([.|#])/.exec(text)
    modifications[mod[1]] = mod[2]
})

let generation = 0
let min = 0
let max = state.length - 1

while(generation++ < 30) {
    state[--min] = '.'
    state[++max] = '.'
    
    const newState = {}
    Object.values(state).forEach((pot, index, arr) =>       
        newState[index] = modifications[
            optional(arr[index-2]) +
            optional(arr[index-1]) +
            pot +
            optional(arr[index+1]) +
            optional(arr[index+2])
        ]
    )
    state = newState
}

const result = Object.entries(state).reduce((acc, val) => {
    if (val[1] === '#') return acc + parseInt(val[0])
    return acc
}, 0)

function optional(string) {
    if (string === undefined) return '.'
    else return string
}
