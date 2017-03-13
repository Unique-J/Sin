import mongoose from 'mongoose';

export default function createAnimal() {
  const animalSchema = mongoose.Schema({  // eslint-disable-line
    name: String
  });

  animalSchema.statics.findByName = function (obj, cb) {
    this.findOne({ username: obj.username, pwd: obj.pwd }, cb);
  };

  mongoose.model('animal', animalSchema);
}
