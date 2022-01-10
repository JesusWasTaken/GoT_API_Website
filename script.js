/************************* Variables ***************************/

let characters = document.getElementById("characters");
let continents = document.getElementById("continents");
let quotes = document.getElementById("quotes");
let isCharLoaded = false;
let isContLoaded = false;

/************************* Fonctions API ***************************/

function getCharacters() {
    jQuery(continents).hide();
    jQuery(quotes).hide();
    if (isCharLoaded == false) {
        $.getJSON('https://thronesapi.com/api/v2/Characters', function( data ) {
            for (let i = 0; i < data.length;i++) {
                let current = document.createElement("div");
                let image = document.createElement("img");
                image.src = data[i].imageUrl;
                let content = document.createTextNode(data[i].fullName);
                current.appendChild(content);
                current.appendChild(image);
                characters.appendChild(current);
            } 
            $("#characters>div>img").addClass("charaImg");
            isCharLoaded = true;
        });
    }
    jQuery(characters).show();
}

function getContinents() {
    jQuery(characters).hide();
    jQuery(quotes).hide();
    if (isContLoaded == false) {
        $.getJSOn('https://thronesapi.com/api/v2/Continents', function ( data ) {
            for (let i = 0 ; i < data.length ; i++) {
                let content = data[i].name;
                let current = document.createElement("p");
                current.appendChild(content);
                container.appendChild(current);
            }
            $("#continents>p").addClass("contName");
            isContLoaded = true;
        });
    }
    jQuery(continents).show();
}

function getQuotes() {
    jQuery(characters).hide();
    jQuery(continents).hide();
    $.getJSON('https://game-of-thrones-quotes.herokuapp.com/v1/random/5', function( data ) {
        for (let i = 0; i < 10 ; i++) {
            let content = data[i].character.name +" : "+data[i].sentence;
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

