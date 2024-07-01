import { JSONSchema4 } from './../../node_modules/@types/json-schema/index.d';
import cors from "cors";
import express from "express";

import { connectClient } from "./db";
import testData from "../test-data.json"

const router = express.Router();
router.use(cors());
router.use(express.json());

router.get('/shopping_list', async (req, res) => {
    try {
        res.send({items:testData});
    } catch (error) {
        console.error('Error fetching items:', error);
        res.status(500).send('Server error');
    }
 
});//get the data from mongodb



export default router;