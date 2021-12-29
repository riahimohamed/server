const router = require("express").Router();

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const User = require("../model/user");


const auth = require("../middleware/auth");
const permit = require('../middleware/authorization');

router.get('/', auth, (req, res) => {
	User.find((err, data) => {
		if(err) return res.status(400).send("error: ".err);

		return res.send(data);
	})
});

router.post("/register", async (req, res) => {

	  try {
	    const user = req.body;

	    if (!(user)) {
	      res.status(400).send("All input is required");
	    }

	    const oldUser = await User.findOne({ email: req.body.email });

	    if (oldUser) {
	      return res.status(409).send("User Already Exist. Please Login");
	    }

	    user.password = await bcrypt.hash(req.body.password, 10);

	    const users = await User.create(user);

	    const token = jwt.sign(
	      { user_id: users._id, role: users.role },
	      process.env.TOKEN_KEY,
	      
	    );

	    users.token = token;

	    res.status(201).json(user);
	  } catch (err) {
	    console.log(err);
	  }
});

router.post("/login", async (req, res) => {

  try {
    const { email, password } = req.body;

    if (!(email && password)) {
      res.status(400).send("All input is required");
    }

    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign(
        { user_id: user._id, email, role: user.role },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );

      user.token = token;

      return res.status(200).json(user);
    }
    return res.status(400).send("Invalid Credentials");
  } catch (err) {
    console.log(err);
  }
});

router.get('/profile/:id', auth, (req, res) => {
	User.findById(req.params.id, (err, data) => {
		if(err) return res.status(400).send(err);
		return res.send(data);
	});
});

router.delete('/delete/:id', auth, permit('ADMIN'), (req, res) => {
	User.findByIdAndDelete(req.params.id, (err, data) =>{
		if(err) return res.status(400).send(err);
		return res.send(data);
	});
});

module.exports = router;