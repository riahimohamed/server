const router = require('express').Router();

const Stock = require('../model/stock');

router.get('/', (req, res) => {
	Stock.find((err, data) => {
		if(err) return res.status(400).send("error: ".err);
		return res.send(data);
	});
});

router.get('/:id', (req, res) => {
	Product.find()
    .populate("product_id")
    .exec((err, data) => {
      if (!err) return res.send(data);
          else res.status(400).send(err);
    });
});

router.post('/create', async (req, res) => {

	const stock = req.body;

	await Stock.create(stock, (err) => {
		if(err) return res.status(400).send(err);
		return res.send("Stock bien enregistré");
	});
});

router.route("/update/:id").patch((req, res, next) => {
  Stock.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },(error, data) => {
      if (error) {
        return next(error);
      } else {
        res.json("Données mises à jour avec succès");
      }
    }
  );
});

router.delete('delete/:id', (req, res) => {
	Stock.findByIdAndDelete(req.params.id, (err, data) =>{
		if(err) return res.status(400).send(err);
		return res.send(data);
	});
});

module.exports = router;