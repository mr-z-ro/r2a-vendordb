String.prototype.strong = function (search, replacement) {
    var target = this;
    split = target.split(search)
    console.log(split)
    return split.join(replacement);
};

String.prototype.splice = function (start, delCount, newSubStr) {
    return this.slice(0, start) + newSubStr + this.slice(start + Math.abs(delCount));
};

function autocomplete(inp, arr, selectionCallback) {
    /*the autocomplete function takes two arguments,
    the text field element and an array of possible autocompleted values:*/
    var currentFocus;


    inp.showOptions = (e, context) => {

        var a, b, i, val = context.value;
        /*close any already open lists of autocompleted values*/
        closeAllLists();
        // if (!val) { return false; }
        currentFocus = -1;
        /*create a DIV element that will contain the items (values):*/
        a = document.createElement("DIV");
        a.setAttribute("id", context.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        /*append the DIV element as a child of the autocomplete container:*/
        context.parentNode.appendChild(a);
        /*for each item in the array...*/
        if (val.length !== 1) {
            for (i = 0; i < arr.length; i++) {
                /*check if the item starts with the same letters as the text field value:*/
                // if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
                match = arr[i]


                hasOption = match.length > 0
                showAll = (val.length === 0)
                showSearchMatches = (val.length > 0 && match.toUpperCase().indexOf(val.toUpperCase()) !== -1)

                if (hasOption && (showAll || showSearchMatches)) {



                    /*create a DIV element for each matching element:*/
                    b = document.createElement("DIV");

                    if (showSearchMatches) {
                        /*make the matching letters bold:*/
                        // b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
                        // b.innerHTML += arr[i].substr(val.length);

                        indexes = []
                        index = -1

                        do {
                            console.log("In here")
                            index = match.toUpperCase().indexOf(val.toUpperCase(), index + 1)
                            if (index !== -1) {
                                indexes.push(index)
                            }
                        }
                        while (index !== -1);


                        indexes.slice().reverse().forEach(function (index) {
                            match = match.splice(index + val.length, 0, "</strong>")
                            match = match.splice(index, 0, "<strong>")
                        })

                    }
                    b.innerHTML += match;




                    /*insert a input field that will hold the current array item's value:*/
                    b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
                    /*execute a function when someone clicks on the item value (DIV element):*/
                    b.addEventListener("click", function (e) {
                        /*insert the value for the autocomplete text field:*/
                        inp.value = this.getElementsByTagName("input")[0].value;
                        if (selectionCallback !== undefined) {
                            selectionCallback(inp.value)
                        }
                        /*close the list of autocompleted values,
                        (or any other open lists of autocompleted values:*/
                        closeAllLists();
                    });
                    a.appendChild(b);
                }
            }
        }

        $('.autocomplete-items').css('max-height', getHeight() );

        $(window).scroll(function() {
            $('.autocomplete-items').css('max-height',getHeight() );
        })
    }

    function getHeight () {
        return Math.min(500, $(window).height() - (offset(inp).top + 100) + $(window).scrollTop())
    }

    inp.addEventListener("focus", function (e) {
        inp.showOptions(e, this)
    })

    /*execute a function when someone writes in the text field:*/
    inp.addEventListener("input", function (e) {
        inp.showOptions(e, this)

    });
    /*execute a function presses a key on the keyboard:*/
    inp.addEventListener("keydown", function (e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
            /*If the arrow DOWN key is pressed,
            increase the currentFocus variable:*/
            currentFocus++;
            /*and and make the current item more visible:*/
            addActive(x);
        } else if (e.keyCode == 38) { //up
            /*If the arrow UP key is pressed,
            decrease the currentFocus variable:*/
            currentFocus--;
            /*and and make the current item more visible:*/
            addActive(x);
        } else if (e.keyCode == 13) {
            /*If the ENTER key is pressed, prevent the form from being submitted,*/
            e.preventDefault();
            if (currentFocus > -1) {
                /*and simulate a click on the "active" item:*/
                if (x) x[currentFocus].click();
            }
        }
    });
    function addActive(x) {
        /*a function to classify an item as "active":*/
        if (!x) return false;
        /*start by removing the "active" class on all items:*/
        removeActive(x);
        if (currentFocus >= x.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = (x.length - 1);
        /*add class "autocomplete-active":*/
        x[currentFocus].classList.add("autocomplete-active");
    }
    function removeActive(x) {
        /*a function to remove the "active" class from all autocomplete items:*/
        for (var i = 0; i < x.length; i++) {
            x[i].classList.remove("autocomplete-active");
        }
    }
    function closeAllLists(elmnt) {
        /*close all autocomplete lists in the document,
        except the one passed as an argument:*/
        var x = document.getElementsByClassName("autocomplete-items");
        for (var i = 0; i < x.length; i++) {
            if (elmnt != x[i] && elmnt != inp) {
                x[i].parentNode.removeChild(x[i]);
            }
        }
    }

    function offset(el) {
        var rect = el.getBoundingClientRect(),
        scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
        scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
    }

    /*execute a function when someone clicks in the document:*/
    document.addEventListener("click", function (e) {
        closeAllLists(e.target);
    });
}