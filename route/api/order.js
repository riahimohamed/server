const db = require('../../model');

const createOrder = function(userId, _order) {
  return db.order.create(_order).then(data => {
  	order
    console.log("Created Order: ", data);

    return db.user.updateMany(
      { '_id':userId },
      { $set: { order_id: data._id } });
  });
};