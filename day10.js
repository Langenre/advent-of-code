let input = ``

input = input.split('\n').map(text => {
    let [ , x, y, vx, vy] = /position=<(.\d*), (.\d*)> velocity=<(.\d*), (.\d*)>/.exec(text)
    return { x: parseInt(x), y: parseInt(y), vx: parseInt(vx), vy: parseInt(vy) }
})

function moveStars(input) {

    input.map(star => ({ ...star, x: star.x * star.vx, y: star.y * star.vy}))
    console.log()
    setTimeout(() => moveStars(input), 1000)
}

moveStars(input)
