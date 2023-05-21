import data from './data.js';

let brojac_proizvoda = new Map();
let ukbr = 0;

function provjera(broj_kategorije){
    for(let pom = 0; pom < 5; pom++){
        if(data.categories[broj_kategorije].products[pom].brojac > 0){
            let element = document.getElementById("brojpr" + (pom+1));
            if (element) {
                element.textContent = data.categories[broj_kategorije].products[pom].brojac;
            }

        }
    }
}


let trenutna_kategorija = document.getElementById("kategorija");

kategorije("Pribor za jelo", 0);


let kat1 = document.getElementById("kat1");
let kat2 = document.getElementById("kat2");
let kat3 = document.getElementById("kat3");
let kat4 = document.getElementById("kat4");
let kat5 = document.getElementById("kat5");
let kat6 = document.getElementById("kat6");
let kat7 = document.getElementById("kat7");
let kat8 = document.getElementById("kat8");
let kat9 = document.getElementById("kat9");
let kat10 = document.getElementById("kat10");

kat1.onclick = () => {
    kategorije("Pribor za jelo", 0);
}

kat2.onclick = () => {
    kategorije("Tanjuri", 1);
}

kat3.onclick = () => {
    kategorije("Pića", 2);
}

kat4.onclick = () => {
    kategorije("Pomoćni pribor", 3);
}

kat5.onclick = () => {
    kategorije("Lampe", 4);
}

kat6.onclick = () => {
    kategorije("Zrcala", 5);
}

kat7.onclick = () => {
    kategorije("Soba", 6);
}

kat8.onclick = () => {
    kategorije("Čišćenje", 7);
}

kat9.onclick = () => {
    kategorije("Ukrasno", 8);
}

kat10.onclick = () => {
    kategorije("Aparatura", 9);
}

function kategorije(ime_kategorije, broj_kategorije){


    trenutna_kategorija.innerText = ime_kategorije;



    let container = document.querySelector('.flexcontainer');
    container.innerHTML = "";


    for(let i = 0; i < 5; i++){
        let div = document.createElement("div");
        div.className = "picture";
        div.innerHTML = `
            <button class="pomocnakosara" id=${"k" + (i+1)}><img class="kosaragumb" src=${"images/cart.png"} alt="slikakosare"></button>
            <img class="slikepr" src= ${data.categories[broj_kategorije].products[i].image} alt="${"slika" + (i+1)}">
            <span class = brojproizvoda id=${"brojpr" + (i+1)}></span>
            <span class = "opisslike" id=${"opis" +  (i+1)}>${data.categories[broj_kategorije].products[i].name}</span>`
        container.append(div);

        provjera(broj_kategorije);





        let dodajkosarica = document.getElementById("k"+(i+1));
        dodajkosarica.onclick = () => {
            ukbr++;
            let ukbroj = document.getElementById("brojukosarici");
            ukbroj.textContent = ukbr;
            console.log("kliknuto");
            let imeproizvoda = data.categories[broj_kategorije].products[i].name;
            let brpr = (document.getElementById("brojpr" + (i+1)));

            if(brojac_proizvoda.has(imeproizvoda)){
                console.log("dodano opet");
                let pm = brojac_proizvoda.get(imeproizvoda);
                brojac_proizvoda.set(imeproizvoda, pm+1);
                data.categories[broj_kategorije].products[i].brojac += 1;
                brpr.textContent = (data.categories[broj_kategorije].products[i].brojac).toString();
            }else{
                console.log("Dodano prvi put");
                brojac_proizvoda.set(imeproizvoda, 1);
                data.categories[broj_kategorije].products[i].brojac = 1;
                brpr.textContent =  (data.categories[broj_kategorije].products[i].brojac = 1).toString();
            }

            localStorage.setItem("kosarica", JSON.stringify(Object.fromEntries(brojac_proizvoda)));
            localStorage.ukupnibroj = ukbr;


        }

    }
}



