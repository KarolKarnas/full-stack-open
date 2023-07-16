import express from 'express';
const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  console.log(req.query)
  const height = req.query.height
  const weight = req.query.weight
  res.send(`height = ${height}, weight= ${weight}`)
  res.json({
    weight,
    height,
    bmi: "Normal (healthy weight)"
  })
})

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});