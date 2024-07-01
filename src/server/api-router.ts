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



export default router;