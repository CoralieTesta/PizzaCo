const Order = require('../models/Order')

exports.getAll = (req, res) => {
    Order.find()
    .then(orders => res.status(200).json(orders))
    .catch(error => res.status(400).json({error}))
}

exports.getById = (req, res) => {
    Order.findOne({_id: req.params._id}).orFail()
    .then(order => res.status(200).json(order))
    .catch(error => res.status(400).json({error}))
}

exports.create = (req, res, next) => {
    const order = new Order({
            ...req.body
        })
      order.save()
        .then(() => res.status(201).json({message: 'Objet enregistré', _id: order._id}))
        .catch(error => res.status(400).json({error}))    
}

exports.update = (req, res) => {
    const { _id } = req.params;
    const updateData = { ...req.body };
  
    Order.findByIdAndUpdate(_id, updateData, { new: true })
      .then(updatedOrder => {
        if (!updatedOrder) {
          return res.status(404).json({ error: 'Commande non trouvée' });
        }
        res.status(200).json(updatedOrder);
      })
      .catch(error => res.status(400).json({ error }));
  };

exports.delete = (req, res) => {
  Order.deleteOne({_id : req.params._id})
  .then(() => { res.status(200).json({message: 'Objet supprimé !'})})
  .catch(error => res.status(401).json({ error }));
}