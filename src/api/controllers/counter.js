import fetch from 'isomorphic-fetch';
import mongoose from 'mongoose';

export default app => {
  app.get('/counter', (req, res) => {
    const Animal = mongoose.model('animal');

    Animal.findByName('dog', (err, animal) => {
      console.info(animal);
    });

    // ADD
    // const dog = new Animal({ name: 'dog' });
    // dog.save((err) => {
    //   if (err) {
    //     console.error(err);
    //   } else {
    //     console.info('succeed');
    //   }
    // });

    // DELETE
    // Animal.remove({ name: 'cat' }, err => {
    //   if (err) {
    //     console.error(err);
    //   } else {
    //     console.info('Delete succeed');
    //   }
    // });

    // UPDATE
    // Animal.update({ name: 'dog' },{ $set: { name: 'cat' }},
    //   err => {
    //     if (err) {
    //       console.error(err);
    //     } else {
    //       console.info('update succeed');
    //     }
    //   }
    // )

    // FIND
    // Animal.find((err, animals) => {
    //   if (err) {
    //     console.error(err);
    //   } else {
    //     console.info(animals);
    //   }
    // });

    return fetch('http://localhost:3004/test')
      .then(response => response.json())
      .then(json => res.send(json));
  });
};
