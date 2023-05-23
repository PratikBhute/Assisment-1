const express = require('express');
const app = express();
const db = require('./connection');
const bodyParser = require('body-parser');
const postModel = require('./postModel');
app.use(express.urlencoded( {extended:true}));
 app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());

// CRUDE Applications
//API for Post the data in database
app.post('/', async (req, res) => {
  const {title, content } = req.body;
        try {
          const newPost = await postModel.create({title, content});
          res.json(newPost);
        } catch (error) {
          res.status(500).send(error);
        } 
});
//API for get Data
app.get('/', async (req, res) =>{
  try {
    const posts =await postModel.find();
    res.json(posts);
    
  } catch (error) {
    res.status(500).send(error)
  }
})

//API for get Data by id
app.get('/:id', async (req, res) =>{
  const {id} = req.params;
 
      try {
        const post =await postModel.findById(id);
        res.json(post);

      }
       catch (error) { res.status(500).send(error)
      }
});

//API for update Data by id
app.put('/:id', async (req, res) => {
  const {id} = req.params;
  const {title, content} = req.body;

  try {
    const post =await postModel.findByIdAndUpdate(id, {title, content});
    res.json(post)
    
  } catch (error) {
    res.status(500).send(error)
  }

 })

 //API for Delete Data by id
 app.delete('/:id', async (req, res) => {
  const {id} = req.params;
  try {
    const delet =await postModel.findByIdAndDelete(id);
    res.send(`Data is Successfully deleted
     ${delet} of id: ${id}`);
    
    
  } catch (error) {
    res.status(500).send(error)
  }

 })


app.listen(3001, () => {
  console.log("Listning to port 3001, http://localhost:3001");
});
