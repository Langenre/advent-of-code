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

function findPath(result, seconds, path, workers) {
    let queue = Object
        .values(graph)
        .filter(points=> Object.keys(points.nbr).length === 0)
        .sort((pointA, pointB) => pointA.self < pointB.self ? -1 : 1)

    if (queue.length === 0) return seconds
    seconds++
    queue = queue.filter(point => workers.indexOf(point.self) === -1)
    
    workers.reduce((___, worker, index) => {
        worker = ({ ...queue[index] }).self || ''
        
        if (graph[worker] && --graph[worker].time < 1) {
            workers[index] = ''
            path.concat(worker)
            Object.values(graph).forEach(point => delete point['nbr'][worker])
            delete graph[worker]
        }
    }, undefined)

    return findPath(result, seconds, path, workers)
}
