const express = require('express');
const router = express.Router();

const meController = require('./../app/controllers/MeController');

router.patch('/:id/restore', meController.restoreDocument);
router.get('/:id/edit', meController.edit);
router.get('/:id/edit', meController.profile);
router.get('/trash', meController.trash);
router.get('/profile', meController.profile);
router.post('/check', meController.deleteCheck);
router.patch('/:id/update', meController.update);
router.delete('/:id/deleteVideo', meController.delete);
router.delete('/:id/deleteCheck', meController.deleteCheck);
router.delete('/:id/deleteForce', meController.deleteForce);
// router.get('/:id/restore', meController.restoreDocument);

module.exports = router;