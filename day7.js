const graph = {}

function findPath(result) {
    const queue = Object
        .values(graph)
        .filter(points=> Object.keys(points.nbr).length === 0)
        .sort((pointA, pointB) => {
            return pointA.self < pointB.self ? -1 : 1
        })

    if (queue.length === 0) return result
    
    const next = queue[0].self
    result += next

    Object.values(graph).forEach(point => delete point.nbr[next])
    delete graph[next]
    return findPath(result)
}

input.split('\n').forEach(text => {
  const [ , pointA, pointB] = /Step (\w*) must be finished before step (\w*)/.exec(text)

  if (graph[pointA] === undefined) graph[pointA] = { nbr: { }, self: pointA }
  if (graph[pointB] === undefined) graph[pointB] = { nbr: { }, self: pointB }
  graph[pointB]['nbr'][pointA] = true
})
