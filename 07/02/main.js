document.addEventListener("DOMContentLoaded", function(){
    let input = document.createElement("input");
    let title = document.createElement("h2");
    let intervalID;

    document.body.append(input);
    document.body.append(title);

    function startTimeout(){
        clearTimeout(intervalID);
        intervalID = setTimeout(changeTitle, 300);
    }

    function changeTitle(){
        title.textContent = input.value;
    }

    input.addEventListener("input", startTimeout);
    // Не совсем понял задание, какое именно событие нужно отлавливать input или change
})