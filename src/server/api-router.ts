import cors from "cors";
import express from "express";
import { connectClient } from "./db";


const router = express.Router();
router.use(cors());
router.use(express.json());

router.get('/shopping_list', async (req, res) => {
    try {
        const client = await connectClient();
        const items = await client.collection("shopping_list")
            .find()
            .project({
                id: 1,
                name: 1,
                price: 1,
                _id: 0
            })
            .toArray();
        res.send({ items });
    } catch (error) {
        console.error('Error fetching items:', error);
        res.status(500).send('Server error');
    }
 
});//read the data from mongodb

router.post('/shopping_cart', async (req, res) => {
    try {
        const client = await connectClient();
        const newItem = {
            id: req.body.id,
            name: req.body.name,
            price: req.body.price,
            count: req.body.count,
          };
        await client.collection("shopping_cart").insertOne(newItem);
        res.status(201).send({ message: 'Item added successfully', newItem });
    } catch (error) {
        console.error('Error fetching items:', error);
        res.status(500).send('Server error');
    }
 
});//add the data to mongodb

router.put('/shopping_cart/:id', async (req, res) => {
    
    try {
        const client = await connectClient();
        const { id } = req.params;
        const { count } = req.body;
        await client.collection("shopping_cart")
        .updateOne(
            { id },
            { $set: { count } }
        );
        res.send({ message: 'Item count updated successfully' });
    } catch (error) {
        console.error('Error updating item count:', error);
        res.status(500).send('Server error');
    }
});//update data in mongodb

router.delete('/shopping_cart/:id', async (req, res) => {
    
    try {
        const client = await connectClient();
        const { id } = req.params;
        const result = await client.collection("shopping_cart").deleteOne({ id });
        if (result.deletedCount === 1) {
            res.status(200).send({ message: 'Item successfully deleted' });
        } else {
            res.status(404).send({ message: 'Item not found' });
        }
    } catch (error) {
        console.error('Error deleting item:', error);
        res.status(500).send('Server error');
    }
});//Delete data from mongodb

router.delete('/shopping_cart', async (req, res) => {
    try {
        const client = await connectClient();
        const result = await client.collection("shopping_cart").deleteMany({});
        if (result.deletedCount > 0) {
            res.status(200).send({ message: 'All items successfully deleted' });
        } else {
            res.status(404).send({ message: 'No items to delete' });
        }
    } catch (error) {
        console.error('Error deleting items:', error);
        res.status(500).send('Server error');
    }
});//Delete all data from mongodb

export default router;