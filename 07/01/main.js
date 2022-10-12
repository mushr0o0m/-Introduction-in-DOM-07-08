document.addEventListener("DOMContentLoaded", function(){
    let timerInput = document.querySelector(".time-input");
    let startTimerButton = document.querySelector(".timer-start");
    let timerWindow = document.querySelector(".timer-window");
    let intervalID;

    function startTimer(){
        clearInterval(intervalID)
        let startValue = parseInt(timerInput.value);
        timerWindow.textContent = startValue;
        intervalID = setInterval(countDown, 1000);
    }

    function countDown(){
        let currentValue = parseInt(timerWindow.textContent);
        timerWindow.textContent = currentValue - 1;
        if(currentValue === 1)
            clearInterval(intervalID);
    }

    startTimerButton.addEventListener("click", startTimer);
})