const Pasta = require('../models/Pasta')

exports.getAll = (req, res) => {
    Pasta.find()
    .then(pasta => res.status(200).json(pasta))
    .catch(error => res.status(400).json({error}))
}

exports.getById = (req, res) => {
    Pasta.findOne({_id: req.params._id}).orFail()
    .then(pasta => res.status(200).json(pasta))
    .catch(error => res.status(400).json({error}))
}

exports.create = (req, res) => {
    const pasta = new Pasta({ ...req.body });
    pasta
      .save()
      .then((savedPasta) => res.status(201).json(savedPasta._id))
      .catch((error) => res.status(400).json({ error }));
  };

exports.delete = (req, res) => {
    Pasta.deleteOne({_id : req.params._id})
    .then(() => { res.status(200).json({message: 'Objet supprimé !'})})
    .catch(error => res.status(401).json({ error }));
}

exports.update = (req, res) => {
    const { _id } = req.params;
    const updateData = { ...req.body };
  
    Pasta.findByIdAndUpdate(_id, updateData, { new: true })
      .then(updatedPasta => {
        if (!updatedPasta) {
          return res.status(404).json({ error: 'Pasta non trouvée' });
        }
        res.status(200).json(updatedPasta);
      })
      .catch(error => res.status(400).json({ error }));
  };