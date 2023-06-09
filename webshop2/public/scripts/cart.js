let listL = document.getElementById("lijevalista");
let listR = document.getElementById("desnalista");

let brojac_proizvoda = {};

const url = "/cart/getAll";
fetch(url)
    .then(function(response) {
        // Provjerite statusni kod odgovora
        if (response.ok) {
            return response.json();
        } else {
            throw new Error("Neuspješan zahtjev");
        }
    })
    .then(function(data) {
        brojac_proizvoda = data;

        // poziv funkcija koje ovise o podacima s servera
        updateKosaricaUI();
    })
    .catch(function(error) {
        console.log(error.message);
    });


function updateKosaricaUI() {
    let i = 0;
    for (let key in brojac_proizvoda) {

        let li = document.createElement("li");
        li.className = "proizvod";
        li.id = "imeeee" + (i + 1);
        li.textContent = key;
        listL.appendChild(li);

        let li2 = document.createElement("li");
        li2.className = "proizvod";
        li2.id = "kolicinaaaa" + (i + 1);
        listR.appendChild(li2);

        let kolicina = brojac_proizvoda[key];

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
            const url1 = '/cart/add/' + encodeURIComponent(key);
            fetch(url1, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(function (response){
                if(response.ok){
                    brojac_proizvoda[key]++;
                    span.textContent = brojac_proizvoda[key];

                }else{
                    throw new Error("Neuspješan zahtjev");
                }
            }).catch(function(error) {
                console.log(error.message);
            });

        });

        b2.addEventListener('click', function () {
            const url1 = '/cart/remove/' + encodeURIComponent(key);
            fetch(url1, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(function(response){
                if(response.ok){
                    if(brojac_proizvoda[key] > 1){
                        brojac_proizvoda[key]--;
                        span.textContent = brojac_proizvoda[key];
                    }else{
                        listR.removeChild(li2);
                        listL.removeChild(li);
                        delete brojac_proizvoda[key];
                    }

                }else{
                    throw new Error("Neuspešan zahtjev");
                }
            }).catch(function (error){
                console.log(error.message);
            });


        });

        i++;
    }
}
