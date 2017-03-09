import mongoose from 'mongoose';

export default function createAnimal() {
  const animalSchema = mongoose.Schema({
    name: String
  });

  animalSchema.statics.findByName = function (name, cb) {
    this.find({ name }, cb);
  };

  mongoose.model('animal', animalSchema);
}
