const Object = require('../models/Booking')

exports.create = (req, res) => {
    const object = new Object({ ...req.body });
    object
      .save()
      .then((savedObject) => res.status(201).json(savedObject._id))
      .catch((error) => res.status(400).json({ error }));
  };

exports.getAll = (req, res) => {
  console.log("getall bookings")
  Object.find()
    .then(objects => res.status(200).json(objects))
    .catch(error => res.status(400).json({error}))
}

exports.delete = (req, res) => {
  Object.deleteOne({_id : req.params._id})
  .then(() => { res.status(200).json({message: 'Objet supprimé !'})})
  .catch(error => res.status(401).json({ error }));
}

exports.update = (req, res) => {
  const { _id } = req.params;
  const updateData = { ...req.body };

  Object.findByIdAndUpdate(_id, updateData, { new: true })
    .then(updatedObject => {
      if (!updatedObject) {
        return res.status(404).json({ error: 'Objet non trouvé' });
      }
      res.status(200).json(updatedObject);
    })
    .catch(error => res.status(400).json({ error }));
};