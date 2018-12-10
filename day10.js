let input = ``.split('\n').map(text => {
    let [ , x, y, vx, vy] = /position=<(.\d*), (.\d*)> velocity=<(.\d*), (.\d*)>/.exec(text)
    return { x: parseInt(x), y: parseInt(y), vx: parseInt(vx), vy: parseInt(vy) }
})

while(true) {
    
    input = input.map(star => 
        ({ 
            vy: star.vy,
            vx: star.vx,
            x: star.x + star.vx,
            y: star.y + star.vy,
        })
    )
    let xmax = input.reduce((acc, star) => star.x > acc ? star.x : acc, -Infinity)
    let ymax = input.reduce((acc, star) => star.y > acc ? star.y : acc, -Infinity)
    let xmin = input.reduce((acc, star) => star.x < acc ? star.x : acc, Infinity)
    let ymin = input.reduce((acc, star) => star.y < acc ? star.y : acc, Infinity)

    if (Math.abs(xmax - xmin) < 62 && Math.abs(ymax - ymin < 10)) {

        let mapOfStars = Array(10).fill().map(y => Array(62).fill('.'))

        input.forEach(star => {
            mapOfStars[(star.y - ymin)][(star.x - xmin)] = '#'
        })

        mapOfStars.forEach(yacis => {
            yacis.forEach(x => {
                process.stdout.write(x)
            })
            process.stdout.write('\n')
        })
        sleep(10)
    }
}

function sleep(seconds){
    var waitUntil = new Date().getTime() + seconds*1000;
    while(new Date().getTime() < waitUntil) true;
}
