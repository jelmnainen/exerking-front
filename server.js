const path = require('path');
const express = require('express');

const root = path.join(__dirname, 'dist');
const port = process.env.PORT || 8080;

const app = express();

app.use(express.static(root));
app.get('*', (req, res) => {
  res.sendFile('index.html', { root: root });
});

if (!module.parent) {
  app.listen(port, (err) => {
    if (err) {
      return console.error(err);
    }
    console.log(`Listening on localhost:${port}`);
  });
}

module.exports = app;
