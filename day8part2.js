input = ``.split(' ').map(number => parseInt(number))

function createTree(input) {

    function createNode(tree, index, node) {
        tree[node] = { 
            childs: input[index++], 
            qty: input[index++], 
            nbrs: [],
            metadata: [],
        }
    
        let next = node
        Array(tree[node]['childs']).fill().forEach(() => {
            tree[node]['nbrs'].push(++next);
            [tree, index, next] = createNode(tree, index, next)
        })
    
        Array(tree[node]['qty']).fill().forEach(() => tree[node]['metadata'].push(input[index++]))
    
        return [tree, index, next]
    }
    return createNode({}, 0, 1)
}

function getNodeValue(tree, node) {

    if (tree[node]['childs'] === 0) return tree[node]['metadata'].reduce((acc, value) => acc + value, 0)

    return tree[node]['metadata']
        .reduce((acc, nbr) => 
            tree[node]['nbrs'][nbr-1] === undefined ? acc : acc + getNodeValue(tree, tree[node]['nbrs'][nbr-1]), 0)
}

const [tree] = createTree(input)
const result = getNodeValue(tree, 1)
