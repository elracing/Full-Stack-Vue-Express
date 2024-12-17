const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

// Get posts
router.get('/', async (req, res) => {
    const posts = await loadPostsCollection();
    res.send(await posts.find({}).toArray());
});



// Add post

router.post('/', async (req, res) => {
    const posts = await loadPostsCollection();
    await posts.insertOne({
        text: req.body.text,
        createdAt: new Date()
    });

    res.status(201).send();
});



// Delete post

router.delete('/:id', async (req, res) => {
    const posts = await loadPostsCollection();
    await posts.deleteOne({ _id: new mongodb.ObjectId(req.params.id)});
    res.status(200).send();
});

async function loadPostsCollection() {
    const client = await mongodb.MongoClient.connect(`mongodb+srv://3lr4c1ng:somepass101@vueexpress.lo2be.mongodb.net/?retryWrites=true&w=majority&appName=vueExpress`, {
        //useNewUrlParser: true  deprecated
    });

    return client.db('vueExpress').collection('posts');
}

module.exports = router;