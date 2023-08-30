const BookingSettings = require('../models/BookingSettings')

exports.getLunch = (req, res) => {
  console.log("getLunch")
  BookingSettings.find({lunch: true})
    .then(data => {
        console.log(data)
        return (res.status(200).json(data))
})
    .catch(error => res.status(400).json({error}))
}

exports.getDiner = (req, res) => {
    console.log("getDiner")
    BookingSettings.find({lunch: false})
      .then(data => {
          console.log(data)
          return (res.status(200).json(data))
  })
      .catch(error => res.status(400).json({error}))
  }

  exports.update = (req, res) => {
    const { _id } = req.params;
    const updateData = { ...req.body };
    console.log(updateData)
  
    BookingSettings.findByIdAndUpdate(_id, updateData, { new: true })
      .then(updatedObject => {
        if (!updatedObject) {
          return res.status(404).json({ error: 'Objet non trouvé' });
        }
        res.status(200).json(updatedObject);
      })
      .catch(error => res.status(400).json({ error }));
  };