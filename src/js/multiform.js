var counter = 1;
var limit = 100; // Why on earth would you use more than 100?


function addInput(divName) {
    if(counter == limit) {
        alert("You have reached the limit of 100 subreddits to source for creating the slideshow");
    } else {
        var input_div = document.createElement('div');
        var input_field = document.createElement('input');
        var input_btn = document.createElement('input');

        input_div.className = "multi-textfield";

        input_field.type="text"
        input_field.name="urls[]"

        input_btn.type="button"
        input_btn.value=""
        input_btn.className="multi-remove-element"
        input_btn.addEventListener("click", function() {
                return function() {removeInput(input_btn)}();
        }, false);

        input_div.appendChild(input_field);
        input_div.appendChild(input_btn);

        document.getElementById(divName).appendChild(input_div);
        counter++;

    }
}

function removeInput(btn) {
    btn.parentNode.parentNode.removeChild(btn.parentNode);
}