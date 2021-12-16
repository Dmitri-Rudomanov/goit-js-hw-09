
const refs={ 
    startBtn : document.querySelector("[data-start]"),
    stopBtn : document.querySelector("[data-stop]"),
    body:document.querySelector("body")
}
let timerId=null

refs.startBtn.addEventListener("click", onStartBtn)
refs.stopBtn.addEventListener("click", onStopBtn)


function onStartBtn() { 
    timerId=setInterval(() => { 
        refs.body.style.backgroundColor = getRandomHexColor()
    }, 1000)
    refs.startBtn.disabled = true
    refs.stopBtn.disabled=false
}
function onStopBtn() { 
    clearInterval(timerId)
    refs.startBtn.disabled = false
    refs.stopBtn.disabled=true
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}