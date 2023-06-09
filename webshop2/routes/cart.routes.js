const express = require('express');
const router = express.Router();

router.get('/', function (req, res) {
    res.render('cart.ejs');
});

router.post("/add/:id", function (req, res) {
    let imeProizvoda = req.params.id;

    if (req.session.cart === undefined) {
        req.session.cart = {};
    }

    if (req.session.cart[imeProizvoda]) {
        req.session.cart[imeProizvoda]++;
    } else {
        req.session.cart[imeProizvoda] = 1;
    }

    return res.sendStatus(204);
});

router.post("/remove/:id", function (req, res) {
    let imeProizvoda = req.params.id;

    if (req.session.cart[imeProizvoda] > 1) {
        req.session.cart[imeProizvoda]--;
    }else{
        delete req.session.cart[imeProizvoda];
    }

    return res.sendStatus(204);
});

router.get('/getAll', function (req, res) {
    if (req.session.cart === undefined) {
        req.session.cart = {};
    }
    res.json(req.session.cart);
});

module.exports = router;
