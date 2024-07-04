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
 
});//get the data from mongodb

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


export default router;