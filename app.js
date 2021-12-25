const express = require('express');
const mongoose = require('mongoose');
const Futurebin = require('./models/Futurebin');
const app = express()
const port = 3000

mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://shortener-api-user:GOF6zeofm3BKEBau@shortener.ixbis.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
.then(() => console.log('connexion réussie'))
.catch(() => console.log('connexion foirée'));

app.use(express.json());
app.use(express.static(__dirname + '/client/build'));

// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
//   next();
// });

app.get('/futurebin', (req, res) => {
  res.sendFile(__dirname + '/client/build/index.html')
  //res.send('Hello World!');
});

app.get('/futurebin/:page',(req, res) => {
  res.sendFile(__dirname + '/client/build/index.html')
});

app.get('/api/:page', (req,res) => {
  Futurebin.findOne({short:req.params.page})
  .then(futurebin => {
      if(!futurebin) {
          res.status(404);
          res.json({message:'le futurebin n\'a pas été trouvé'});
      }
      else {
          res.status(200);
          res.end(JSON.stringify(futurebin));
      }
  }).
  catch(error => {
      res.status(400);
      res.json({message:error});
      console.log(error);
  });
})
app.post('/api',(req,res) => {
  delete req.body._id;
  let datas = {
    text:req.body.code,
    language:req.body.language,
    code:makeId(6)
  }
  if(req.body.expiration) {
    datas.expireAt = req.body.expiration;
  } 
  const futurebin = new Futurebin(datas);
  
  futurebin.save()
      .then((e) => {
          res.status(201);
          res.json({code:req.protocol + '://' + req.get('host') + '/futurebin/' + e.code});
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