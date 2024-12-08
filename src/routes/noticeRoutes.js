// routes/noticeRoutes.js
const express = require('express');
const router = express.Router();
const noticeController = require('../controllers/noticeController');

// POST: Create a new notice
router.post('/', noticeController.createNotice);

// GET: Retrieve all notices
router.get('/', noticeController.getAllNotices);

// GET: Retrieve a specific notice by ID
router.get('/:id', noticeController.getNoticeById);

// PUT: Update a notice
router.put('/:id', noticeController.updateNotice);

// DELETE: Delete a notice
router.delete('/:id', noticeController.deleteNotice);

module.exports = router;