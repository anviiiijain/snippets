function toggleacc(x) {
    var acc = document.getElementsByClassName("accordion-heading");
    var isActive = x.classList.contains("accordion-active");
    for (var i = 0; i < acc.length; i++) {
        acc[i].classList.remove("accordion-active");
        var con = acc[i].nextElementSibling;
        con.style.maxHeight = "0";
        con.style.display = "none";
    }

    var content = x.nextElementSibling;
    if (isActive) {
        x.classList.remove("accordion-active");
    } else {
        x.classList.add("accordion-active");
        content.style.maxHeight = content.scrollHeight + "rem";
        content.style.display = "unset";
    }
}