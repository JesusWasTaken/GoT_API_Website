
/************************* Fonctions API ***************************/

function getCharacters() {
    let chara = document.getElementById("characters");
    $.getJSON('https://thronesapi.com/api/v2/Characters', function( data ) {
        for (let i = 0; i < data.length;i++) {
            let current = document.createElement("div");
            let img = document.createElement("img");
            console.log(data[i].imageUrl)
            img.src = data[i].imageUrl;
            let content = document.createTextNode(data[i].fullName);
            current.appendChild(content);
            current.appendChild(img);
            chara.appendChild(current);
        } 
    });
}

function getContinents() {
    $.getJSOn('https://thronesapi.com/api/v2/Continents', function ( data ) {
        let answer = [];
        for (let i = 0 ; i < data.length ; i++) {
            answer[i] = data[i].name;
        }
    });
}

function getQuotes(character, number) {
    $.getJSON('https://thronesapi.com/api/v2/https://game-of-thrones-quotes.herokuapp.com/v1/author/'+character+'/'+number, function( data ) {
        let answer = [];
        for (let i = 0; i < number ; i++) {
            answer[i] = [data[i].character.name, data[i].sentence];
        }
        return answer;
    });
}

