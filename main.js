const playBtn = document.querySelector('button')

playBtn.addEventListener('click', () =>{
    console.log('Hola')
    let time = 0
    setInterval(() => {
        time += 1000
        const circle = document.getElementById('timer-fg')
        const rel = 283 * (1 - time/25000)
        console.log(time, rel, circle.style.strokeDashoffset)
        circle.style.strokeDashoffset = rel
    }, 1000);
})


