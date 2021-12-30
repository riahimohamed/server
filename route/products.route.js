const router = require('express').Router();

const Product = require('../model/products');
const Category = require('../model/category');
const Order = require('../model/order');
const OrderDetails = require('../model/orderDetails');

const multer = require('multer');
let fileExtension = require('file-extension');

const PATH = './uploads/products';

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, PATH);
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now()+ '.' +fileExtension(file.originalname))
  }
});

let upload = multer({
  storage: storage
});

router.post('/upload', upload.single('image'), function (req, res) {
  console.log(upload)
  if (!req.file) {
    console.log("No file is available!");
    return res.send({
      success: false
    });

  } else {
    console.log('File is available!');
    return res.send({
      success: true
    })
  }
});

router.get('/', (req, res) => {
  Product.find()
    .populate("category_id")
    .exec((err, data) => {
      if (!err) return res.json(data);
          else res.status(400).send(err);
    });
});

router.get('/:id', (req, res) => {
	Product.findById(req.params.id, (err, data) =>{
		if(err) return res.status(400).send(err);
		return res.send(data);
	});
});

router.post('/create',upload.single('image'), async (req, res) => {

	const product = req.body;
	product.slug = product.name.split(" ").join("_");

	await Product.create(product, (err) => {
		if(err) return res.status(400).send(err);

    Category.findByIdAndUpdate(
      Product.category_id,
      { $push: { product_id: Product._id } },
      { new: true, useFindAndModify: false }
    );

    // Category.updateMany({ '_id': Product.category_id }, { $push: { product_id: Product._id } });
		return res.send("Product bien enregistré");
	});
});


router.route("/update/:id").patch((req, res, next) => {
  Product.findByIdAndUpdate(
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
	Product.findByIdAndDelete({"_id": req.params.id}, (err, data) =>{
		if(err) return res.status(400).send(err);

    Category.updateMany({ '_id': Product.category_id}, { $pull: { product_id: Product._id } });
    
		return res.send(data);
	});
});

module.exports = router;