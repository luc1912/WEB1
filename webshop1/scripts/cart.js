import data from './data.js';

let listL = document.getElementById("lijevalista");
let listR = document.getElementById("desnalista");

let mapa_proizvoda = JSON.parse(localStorage.getItem('kosarica'));
console.log(mapa_proizvoda);

function updateKosarica(proizvod, kolicina) {
    mapa_proizvoda[proizvod] = kolicina;
    localStorage.setItem('kosarica', JSON.stringify(mapa_proizvoda));
}

function obrisiProizvod(proizvod) {
    delete mapa_proizvoda[proizvod];
    localStorage.setItem('kosarica', JSON.stringify(mapa_proizvoda));
}

let i = 0;
for (const key in mapa_proizvoda) {
    let li = document.createElement("li");
    li.className = "proizvod";
    li.id = "imeeee" + (i + 1);
    li.textContent = key;
    listL.appendChild(li);

    let li2 = document.createElement("li");
    li2.className = "proizvod";
    li2.id = "kolicinaaaa" + (i + 1);
    listR.appendChild(li2);

    let kolicina = mapa_proizvoda[key];

    let span = document.createElement("span");
    span.textContent = kolicina;
    li2.appendChild(span);

    let b2 = document.createElement("button");
    b2.className = "gumb";
    b2.id = "gumbminus" + (i + 1);
    b2.textContent = '-';
    li2.appendChild(b2);

    let b1 = document.createElement("button");
    b1.className = "gumb";
    b1.id = "gumbplus" + (i + 1);
    b1.textContent = '+';
    li2.appendChild(b1);



    b1.addEventListener('click', function () {
        let ukupno = (parseInt(localStorage.getItem("ukupnibroj"))-1).toString();
        localStorage.setItem("ukupnibroj", ukupno);
        kolicina++;
        span.textContent = kolicina;
        updateKosarica(key, kolicina);
    });

    b2.addEventListener('click', function () {
        let ukupno = (parseInt(localStorage.getItem("ukupnibroj"))-1).toString();
        localStorage.setItem("ukupnibroj", ukupno);
        if(ukupno === "0") localStorage.removeItem("ukupnibroj");
        if (kolicina > 1) {
            kolicina--;
            span.textContent = kolicina;
            updateKosarica(key, kolicina);
        } else {
            listR.removeChild(li2);
            listL.removeChild(li);
            obrisiProizvod(key);
        }

    });

    i++;
}
