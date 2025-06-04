const express = require('express');
const router = express.Router();
const Counter = require('../models/Counter');

// GET /counter
router.get('/', async (req, res) => {
    try {
        let counter = await Counter.findOne();
        if (!counter) {
            counter = await Counter.create({ value: 0 });
        }
        res.json({ value: counter.value });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// POST /counter/increment
router.post('/increment', async (req, res) => {
    try {
        let counter = await Counter.findOne();
        if (!counter) {
            counter = await Counter.create({ value: 0 });
        }
        counter.value += 1;
        await counter.save();
        res.json({ value: counter.value });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// POST /counter/decrement
router.post('/decrement', async (req, res) => {
    try {
        let counter = await Counter.findOne();
        if (!counter) {
            counter = await Counter.create({ value: 0 });
        }
        counter.value -= 1;
        await counter.save();
        res.json({ value: counter.value });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router; 