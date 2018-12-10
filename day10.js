let input = ``

input = input.split('\n').map(text => {
    let [ , x, y, vx, vy] = /position=<(.\d*), (.\d*)> velocity=<(.\d*), (.\d*)>/.exec(text)
    return {x, y, vx, vy}
})

function moveStars(input) {

    console.log()
    setTimeout(() => moveStars(input), 1000)
}

moveStars(input)
