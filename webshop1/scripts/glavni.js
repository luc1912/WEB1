import data from './data.js';

let brojac_proizvoda = new Map();
let ukbr = 0;
let kategorija_refresh;




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

    kategorija_refresh = broj_kategorije;
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
            let ima_li_nesto_na_local_storageu_2 = JSON.parse(localStorage.getItem("ukupnibroj"));
            let elementi_na_local_2 = JSON.parse(localStorage.getItem("kosarica"));
            if(ima_li_nesto_na_local_storageu_2){
                ukbr = ima_li_nesto_na_local_storageu_2
            }
            ukbr++;
            let ukbroj = document.getElementById("brojukosarici");
            ukbroj.textContent = ukbr;
            let imeproizvoda = data.categories[broj_kategorije].products[i].name;
            let brpr = (document.getElementById("brojpr" + (i+1)));

            if(elementi_na_local_2){
                 brojac_proizvoda = new Map(Object.entries(elementi_na_local_2));
                }
            if(brojac_proizvoda.has(imeproizvoda)){
                let pm = brojac_proizvoda.get(imeproizvoda);
                brojac_proizvoda.set(imeproizvoda, ++pm);
                data.categories[broj_kategorije].products[i].brojac += 1;
                brpr.textContent = pm.toString();
            }else{
                brojac_proizvoda.set(imeproizvoda, 1);
                data.categories[broj_kategorije].products[i].brojac = 1;
                brpr.textContent =  (data.categories[broj_kategorije].products[i].brojac = 1).toString();
            }

            localStorage.setItem("kosarica", JSON.stringify(Object.fromEntries(brojac_proizvoda)));
            localStorage.ukupnibroj = ukbr;

        }
    }
}

let ima_li_nesto_na_local_storageu = JSON.parse(localStorage.getItem("ukupnibroj"));
if(ima_li_nesto_na_local_storageu){
    let ukupno = document.getElementById("brojukosarici");
    ukupno.textContent = ima_li_nesto_na_local_storageu;
}

let elementi_na_local = JSON.parse(localStorage.getItem("kosarica"))
if(elementi_na_local){
    let local_elementi_mapa = new Map(Object.entries(elementi_na_local));
    for(let i = 0; i < 5; i++){
        let imeproizvoda = data.categories[kategorija_refresh].products[i].name;
        let brpr = (document.getElementById("brojpr" + (i+1)));
        if(local_elementi_mapa.has(imeproizvoda)){
            brpr.textContent = local_elementi_mapa.get(imeproizvoda).toString();
        }
    }
}