let brojac_proizvoda = {}; // za spremanje imena proizvoda i koliko kojeg proizvoda ima
let proizvodi = [];
let ukbr = 0;
let categories = {};
const kats = []; // za spremanje gumbova kategorija iz ejs-a

(function () {
    window.onpageshow = function (event) {
        if (event.persisted) {
            window.location.reload();
        }
    };
})()

window.onload = function() {
    if (window.performance && window.performance.navigation.type === 2) {
        location.reload();
    }
}

async function getAll_getCategories() {

    //dohvaćanje podataga o košarici sa servera
    const url_getAll = "/cart/getAll";
    fetch(url_getAll)
        .then(function (response) {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("Neuspješan zahtjev");
            }
        })
        .then(function (data) {
            brojac_proizvoda = data;
            for (let key in brojac_proizvoda) {
                if (brojac_proizvoda.hasOwnProperty(key)) {
                    const vrijednost = brojac_proizvoda[key];
                    ukbr += vrijednost;
                }
            }
            updateCartCounter(ukbr);

        })
        .catch(function (error) {
            console.log(error.message);
        });


    //dohvaćanje podataka o imenima kategorija sa servera
    const url_getCategories = "/home/getCategories";
    fetch(url_getCategories)
        .then(function (response){
            if(response.ok){
                return response.json();
            }else {
                throw new Error("Neuspješan zahtjev");
            }
        })
        .then(async function (data) {
            categories = data;

            //poziv funkcije kategorije kako bi se čim otvorimo stranicu prikazao sadržaj prve kategorije
            await kategorije(categories[0].name, 0);
        })
        .catch(function (error){
            console.log(error.message);
        })

}

// ažuriranje prikaza ukupnog broja proizvoda u košarici
function updateCartCounter(ukbr) {
    let ukbroj = document.getElementById("brojukosarici");
    if(ukbr > 0){
        ukbroj.textContent = ukbr;
        ukbroj.style.display = "inline";
    }else{
        ukbroj.style.display = "none";
    }
}

await getAll_getCategories();

let trenutna_kategorija = document.getElementById("kategorija");



//dohvaćanje iz ejsa gumba za svaku pojedinu kategoriju i dodavanje onclick naredbe za njih
for (let i = 1; i <= 10; i++) {
    kats[i] = document.getElementById("kat" + i);
    kats[i].onclick = async () => {
        await kategorije(categories[i - 1].name, i - 1);
    };
}

async function kategorije(ime_kategorije, broj_kategorije) {
    trenutna_kategorija.innerText = ime_kategorije;

    const url_getProducts = "/home/getProducts/" + broj_kategorije.toString();
    fetch(url_getProducts)
        .then(function(response) {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("Neuspješan zahtjev");
            }
        })
        .then(function(data) {
            proizvodi = data;

            let container = document.querySelector('.flexcontainer');

            if (container === null) {
                console.error("Container element not found.");
                return;
            }


            container.innerHTML = "";

            for (let i = 0; i < 5; i++) {
                let div = document.createElement("div");
                div.className = "picture";
                div.innerHTML = `
            <button class="pomocnakosara" id=${"k" + (i + 1)}><img class="kosaragumb" src=/images/cart.png alt="slikakosare"></button>
            <img class="slikepr" src='../${proizvodi[i].image}' alt="${"slika" + (i + 1)}">
            <span class = brojproizvoda id=${"brojpr" + (i + 1)}></span>
            <span class = "opisslike" id=${"opis" + (i + 1)}>${proizvodi[i].name}</span>`;
                container.append(div);

                //ažuriranje broja pojedinog proizvoda ako ga već ima u košarici
                let azuriraj = document.getElementById("brojpr" + (i+1));
                if(brojac_proizvoda[proizvodi[i].name] !== undefined) {
                    azuriraj.textContent = brojac_proizvoda[proizvodi[i].name];
                }

                //dohvaćanje iz ejs-a gumba košarice na ovom proizvodu na kojem smo trenutno u for petlji
                let dodajkosarica = document.getElementById("k" + (i + 1));
                dodajkosarica.onclick = () => {

                    const url_kosarica = '/cart/add/' + encodeURIComponent(proizvodi[i].name).toString();
                    fetch(url_kosarica, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }).then(function(response) {
                            if (response.ok) {
                                ukbr++;
                                let ukbroj = document.getElementById("brojukosarici");
                                ukbroj.textContent = ukbr;
                                let imeproizvoda = proizvodi[i].name;
                                let brpr = document.getElementById("brojpr" + (i + 1));

                                if (brojac_proizvoda.hasOwnProperty(imeproizvoda)) {
                                    let pm = brojac_proizvoda[imeproizvoda];
                                    brojac_proizvoda[imeproizvoda] = ++pm;
                                    proizvodi[i].brojac += 1;
                                    brpr.textContent = pm.toString();
                                } else {
                                    brojac_proizvoda[imeproizvoda] = 1;
                                    proizvodi[i].brojac = 1;
                                    brpr.textContent = (proizvodi[i].brojac = 1).toString();
                                }
                                updateCartCounter(ukbr);

                            } else {
                                throw new Error("Neuspješan zahtjev");
                            }
                        }).catch(function(error) {
                            console.log(error.message);
                        });
                }
            }
        })
        .catch(function(error) {
            console.log(error.message);
        });
}






