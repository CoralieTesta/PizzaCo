const Dessert = require('../models/Dessert')

exports.getAll = (req, res) => {
  console.log("getall dessert")
    Dessert.find()
    .then(desserts => res.status(200).json(desserts))
    .catch(error => res.status(400).json({error}))
}

exports.getById = (req, res) => {
    Dessert.findOne({_id: req.params._id}).orFail()
    .then(dessert => res.status(200).json(dessert))
    .catch(error => res.status(400).json({error}))

}

exports.delete = (req, res) => {
    Dessert.deleteOne({_id : req.params._id})
    .then(() => { res.status(200).json({message: 'Objet supprimé !'})})
    .catch(error => res.status(401).json({ error }));
}

exports.create = (req, res) => {
    const dessert = new Dessert({ ...req.body });
    dessert
      .save()
      .then((savedDessert) => res.status(201).json(savedDessert._id))
      .catch((error) => res.status(400).json({ error }));
  };

  exports.update = (req, res) => {
    const { _id } = req.params;
    const updateData = { ...req.body };
  
    Dessert.findByIdAndUpdate(_id, updateData, { new: true })
      .then(updatedDessert => {
        if (!updatedDessert) {
          return res.status(404).json({ error: 'Dessert non trouvée' });
        }
        res.status(200).json(updatedDessert);
      })
      .catch(error => res.status(400).json({ error }));
  };
  