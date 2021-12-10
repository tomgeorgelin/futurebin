const express = require('express');
const mongoose = require('mongoose');
const Futurebin = require('./models/Futurebin');
const app = express()
const port = 3000

mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://shortener-api-user:GOF6zeofm3BKEBau@shortener.ixbis.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
.then(() => console.log('connexion réussie'))
.catch(() => console.log('connexion foirée'));

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/api',(req,res) => {
  delete req.body._id;
  const futurebin = new Futurebin({
      text:req.body.text,
      language:req.body.language,
      expiration_time:req.body.expiration_time,
      code:makeId(5)
  });
  
  futurebin.save()
      .then((e) => {
          res.status(201);
          res.json({message:'ok'});
      })
      .catch(error => res.status(400).json({ error }));
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});


function makeId(length) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
 }
 return result;
}