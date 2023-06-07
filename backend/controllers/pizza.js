const Pizza = require('../models/Pizza')

exports.getAll = (req, res) => {
    Pizza.find()
    .then(pizzas => res.status(200).json(pizzas))
    .catch(error => res.status(400).json({error}))
}

exports.getById = (req, res) => {
    Pizza.findOne({_id: req.params._id}).orFail()
    .then(pizza => res.status(200).json(pizza))
    .catch(error => res.status(400).json({error}))

}

exports.delete = (req, res) => {
    Pizza.deleteOne({_id : req.params._id})
    .then(() => { res.status(200).json({message: 'Objet supprimé !'})})
    .catch(error => res.status(401).json({ error }));
}

exports.create = (req, res) => {
    const pizza = new Pizza({ ...req.body });
    pizza
      .save()
      .then((savedPizza) => res.status(201).json(savedPizza._id))
      .catch((error) => res.status(400).json({ error }));
  };

  exports.update = (req, res) => {
    const { _id } = req.params;
    const updateData = { ...req.body };
  
    Pizza.findByIdAndUpdate(_id, updateData, { new: true })
      .then(updatedPizza => {
        if (!updatedPizza) {
          return res.status(404).json({ error: 'Pizza non trouvée' });
        }
        res.status(200).json(updatedPizza);
      })
      .catch(error => res.status(400).json({ error }));
  };
  