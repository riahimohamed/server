const router = require('express').Router();

const Promotion = require('../model/promotion');
const Product = require('../model/promotions');

router.get('/', (req, res) => {
  Promotion.find()
    .populate("promotion_id")
    .exec((err, promo) => {
      if (!err) return res.send(promo);
          else res.status(400).send(err);
    });
});

router.get('/:id', (req, res) => {
	Promotion.findById(req.params.id, (err, data) =>{
		if(err) return res.status(400).send(err);
		return res.send(data);
	});
});

router.post('/create', async (req, res) => {

	const promotion = req.body;

	await Promotion.create(promotion, (err) => {
		if(err) return res.status(400).send(err);

    Product.findByIdAndUpdate(
      Promotion.promotion_id,
      { $push: { promotion_id: Promotion._id } },
      { new: true, useFindAndModify: false }
    );

    // Category.updateMany({ '_id': Promotion.promotion_id }, { $push: { promotion_id: Promotion._id } });
		return res.send("Promotion bien enregistré");
	});
});

router.route("/update/:id").patch((req, res, next) => {
  Promotion.findByIdAndUpdate(
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

router.delete("/delete/:id", (req, res) => {
	Promotion.findByIdAndDelete({"_id": req.params.id}, (err, data) =>{
		if(err) return res.status(400).send(err);

    Category.updateMany({ '_id': Promotion.promotion_id}, { $pull: { promotion_id: Promotion._id } });
    
		return res.send(data);
	});
});

module.exports = router;