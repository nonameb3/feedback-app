import express from 'express'
const app = express()

app.get('', (req, res) => {
  res.send('hello there')
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log('server start at port: 5000')
})