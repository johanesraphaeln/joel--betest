const app = require('./server');
const port = process.env.PORT;

app.listen(port, async () => {
  console.log(`Auth Service listening at http://localhost:${port}`);
});
