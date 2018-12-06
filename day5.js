function removeDuplicates(input) {
    let result = ''

    input.split('').reduce((acc, curr) => {
        if (acc !== undefined && Math.abs(curr.charCodeAt(0) - acc.charCodeAt(0)) === 32) { 
            result = result.slice(0, -1)
            return undefined
        }
        result += curr
        return curr
    }, undefined)

    if (input.length !== result.length) return removeDuplicates(result)
    return result
}
