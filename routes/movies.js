const express = require('express');
const router = express.Router();
const getDatabase = require('../db/db');
const { ObjectId } = require('mongodb');

// All movies
router.get('/', async (req, res) => {
    try {
      const db = await getDatabase();
      const collection = db.collection('movies');
  
      // İlk 50 filmi al
      const movies = await collection.find({}).limit(50).toArray();
  
      if (!movies || movies.length === 0) {
        console.log('Movies veritabanında kayıt yok.');
        return res.status(404).json({ error: 'Film bulunamadı!' });
      }
      res.status(200).json(movies);
    } catch (error) {
      console.error('Movies endpointinde hata:', error);
      res.status(500).json({ error: 'Bir hata oluştu!' });
    }
  });
  
// Single movie
router.get('/:title', async (req,res) =>{
    const title = req.params.title;
    try{
        const db = await getDatabase();
        const collection = db.collection('movies');
        const movie = await collection.findOne({ title: { $regex: `^${title}$`, $options: 'i' } });
        if (!movie){
            return res.status(404).json({error: "Film Bulunamadı!"});
        }
        res.status(200).json(movie);
    }catch(error){
        console.error('Movies endpointinde hata:', error);
        res.status(500).json({error: "Bir hata oluştu"});
    }
});
// Add movie
router.post('/', async (req,res) => {
    const newMovie = req.body;
    try{
    const db = await getDatabase();
    const collection = db.collection('movies');
    const result = await collection.insertOne(newMovie);
    res.status(201).json({
        message: "Yeni film eklendi",
        movieID: result.insertedId,
    })
    }catch(error){
        console.error('Movies endpointinde hata:', error);
        res.status(500).json({error: "Bir hata oluştu!"});
    }
});
module.exports = router;