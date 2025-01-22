const express = require('express');
const router = express.Router();
const getDatabase = require('../db/db');
const { ObjectId } = require('mongodb');

// Tüm kullanıcıları getir
router.get('/', async (req, res) => {
  try {
    const db = await getDatabase();
    const collection = db.collection('users');
    const users = await collection.find({}).toArray();
    res.status(200).json(users);
  } catch (error) {
    console.error('Kullanıcılar çekilirken hata oluştu:', error);
    res.status(500).json({ error: 'Kullanıcılar alınırken bir hata oluştu' });
  }
});

// Belirli bir kullanıcıyı ID ile getir
router.get('/:id', async (req, res) => {
  const userId = req.params.id;
  try {
    const db = await getDatabase();
    const collection = db.collection('users');

    if (!ObjectId.isValid(userId)) {
      return res.status(400).json({ error: 'Geçersiz kullanıcı ID formatı' });
    }

    const user = await collection.findOne({ _id: new ObjectId(userId) });

    if (!user) {
      return res.status(404).json({ error: 'Kullanıcı bulunamadı' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error('Kullanıcı alınırken hata oluştu:', error);
    res.status(500).json({ error: 'Kullanıcı alınırken bir hata oluştu' });
  }
});

// Yeni kullanıcı ekle
router.post('/', async (req, res) => {
  const newUser = req.body;

  if (!newUser || !newUser.name || !newUser.email) {
    return res.status(400).json({ error: 'Geçersiz kullanıcı verisi' });
  }

  try {
    const db = await getDatabase();
    const collection = db.collection('users');

    const result = await collection.insertOne(newUser);

    res.status(201).json({
      message: 'Yeni kullanıcı oluşturuldu',
      userId: result.insertedId,
    });
  } catch (error) {
    console.error('Yeni kullanıcı eklenirken hata oluştu:', error);
    res.status(500).json({ error: 'Yeni kullanıcı eklenirken bir hata oluştu' });
  }
});

module.exports = router;