const input = ``
const graph = {}

input.split('\n').forEach(text => {
    const [ , pointA, pointB] = /Step (\w*) must be finished before step (\w*)/.exec(text)

    if (graph[pointA] === undefined) graph[pointA] = { 
        self: pointA, 
        time: pointA.charCodeAt(0) - 4,
        nbr: {}, 
    }
    if (graph[pointB] === undefined) graph[pointB] = { 
        self: pointB, 
        time: pointB.charCodeAt(0) - 4,
        nbr: {}, 
    }
    graph[pointB]['nbr'][pointA] = true
})

function findPath(result, seconds) {
    let queue = Object
        .values(graph)
        .filter(points=> Object.keys(points.nbr).length === 0)

    if (queue.length === 0) return seconds
    seconds++

    for (let index = 0; index < 5; index++) {
        let worker = ({ ...queue[index] }).self

        if (graph[worker] && --graph[worker].time < 1) {
            Object.values(graph).forEach(point => delete point['nbr'][worker])
            delete graph[worker]
        }
    }
    return findPath(result, seconds)
}

console.log(findPath('', 0))
