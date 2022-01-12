/************************* Variables ***************************/



let characters = document.getElementById("characters");
let continents = document.getElementById("continents");
let quotes = document.getElementById("quotes");
let arrows = document.getElementById("arrows");
let isCharLoaded = false;
let isContLoaded = false;
let count = 26;

/************************** INIT  **********************************/

$( document ).ready(function() {
    jQuery(arrows).hide();
});

/************************* Fonctions API ***************************/

function getCharacters() {
    jQuery(continents).hide();
    jQuery(quotes).hide();
    if (isCharLoaded == false) {
        $.getJSON('https://thronesapi.com/api/v2/Characters', function( data ) {
            for (let i = 0; i < data.length;i++) {
                let card = document.createElement("div");
                let details = document.createElement("div");
                let content = data[i].fullName+", "+data[i].title+"<br>Family : "+data[i].family;
                details.innerHTML = content;
                card.appendChild(details);
                $(card).addClass("card");
                $(card).attr('id', data[i].id);
                $(card).attr('onclick', "toggle("+data[i].id+")");
                $(card).css("background-image", "url(" + data[i].imageUrl + ")");
                characters.appendChild(card);
            } 
            isCharLoaded = true;
            jQuery(".card>div").hide();
        });
    }
    jQuery(characters).show();
    jQuery(arrows).show();
}

function getContinents() {
    jQuery(arrows).hide();
    jQuery(characters).hide();
    jQuery(quotes).hide();
    if (isContLoaded == false) {
        $.getJSON('https://thronesapi.com/api/v2/Continents', function ( data ) {
            for (let i = 0 ; i < data.length ; i++) {
                let content = data[i].name;
                let current = document.createElement("p");
                current.innerText = content;
                continents.appendChild(current);
                $(current).attr("onclick",'customNav("https://fr.wikipedia.org/wiki/'+data[i].name+'")')
            }
            $("#continents>p").addClass("contName");
            isContLoaded = true;
        });
    }
    jQuery(continents).show();
}

function getQuotes() {
    jQuery(arrows).hide();
    jQuery(characters).hide();
    jQuery(continents).hide();
    quotes.innerHTML = "";
    $.getJSON('https://game-of-thrones-quotes.herokuapp.com/v1/random/5', function( data ) {
        for (let i = 0; i < data.length ; i++) {
            let content = " \""+data[i].sentence+"\" - "+data[i].character.name;
            let current = document.createElement("p");
            current.innerText = content;
            quotes.appendChild(current);
        }
        $("#quotes>p").addClass("quote");
    });
    jQuery(quotes).show();
}

function getSpecificQuotes(character, number) {
    $.getJSON('https://thronesapi.com/api/v2/https://game-of-thrones-quotes.herokuapp.com/v1/author/'+character+'/'+number, function( data ) {
        let answer = [];
        for (let i = 0; i < number ; i++) {
            answer[i] = [data[i].character.name, data[i].sentence];
        }
        return answer;
    });
}

function customNav(link) {
    window.open(link, '_blank');
}

/*********************** CAROUSEL *************************/

function leftCarou() {
    if (count>0 && isCharLoaded) {
        $(characters).animate({
            left:'+=432px'
        });
        count --;
    }
}

function rightCarou() {
    if (count<52 && isCharLoaded) {
        $(characters).animate({
            left:'-=432px'
        });
        count++;
    }
}

function toggle(id) {
    $("#"+id+">div").toggle();
}