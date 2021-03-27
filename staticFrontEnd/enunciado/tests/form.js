let answers=document.querySelectorAll("input");



document.addEventListener("click", function(e){
    if (e.target.id==="submitBtn") {
        e.preventDefault();
        let ansChecked=document.querySelectorAll("input[name=ans]:checked");

        console.log("IN",ansChecked[0].id);

    }
});