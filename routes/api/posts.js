const express = require('express');
const router = express.Router();

// @router api/posts/tests
// @desc   Tests posts route
// @access Public
router.get('/test', (req, res) => res.json({msg: "Posts Works"}));

module.exports = router;