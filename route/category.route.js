const router = require('express').Router();

const Category = require('../model/category');

router.get('/', (req, res) => {
	Category.find((err, data) => {
		if(err) return res.status(400).send("error: ".err);
		return res.send(data);
	});
});

router.get('/:id', (req, res) => {
	Product.find()
    .populate("product_id")
    .exec((err, promo) => {
      if (!err) return res.send(promo);
          else res.status(400).send(err);
    });
});

router.post('/create', async (req, res) => {

	const category = req.body;

	category.slug = category.name.split(" ").join("_");

	await Category.create(category, (err) => {
		if(err) return res.status(400).send(err);
		return res.send("Category bien enregistré");
	});
});

router.route("/update/:id").patch((req, res, next) => {
  Category.findByIdAndUpdate(
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
	Category.findByIdAndDelete(req.params.id, (err, data) =>{
		if(err) return res.status(400).send(err);
		return res.send(data);
	});
});

module.exports = router;