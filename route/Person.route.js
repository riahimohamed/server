const router = require('express').Router();

const Person = require('../model/person');

router.get('/', (req, res) => {
	Person.find((err, data) => {
		if(err) return res.status(400).send("error: ".err);
		return res.send(data);
	});
});

router.post('/create', async (req, res) => {

	const person = req.body;

	await Person.create(person, (err) => {
		if(err) return res.status(400).send(err);
		return res.send("Person bien enregistré");
	});
});

router.route("/update/:id").patch((req, res, next) => {
  Person.findByIdAndUpdate(
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
	Person.findByIdAndDelete(req.params.id, (err, data) =>{
		if(err) return res.status(400).send(err);
		return res.send(data);
	});
});

module.exports = router;