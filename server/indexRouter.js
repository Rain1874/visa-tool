const express = require('express');
const path = require('path');
const fs = require('fs');

const router = express.Router();

router.all('/', (req, res) => {
  if (/^\/.*\.(js|css)/.test(req.baseUrl)) {
    const filePath = path.join(__dirname, `../dist${req.baseUrl}`);
    if (!fs.existsSync(filePath)) {
      res.status(404).end();
      return;
    }
    res.sendFile(filePath);
  } else {
    res.render('index.html');
  }
});

module.exports = router;
