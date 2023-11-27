require('dotenv').config()
const { Sequelize, QueryTypes } = require('sequelize')
const express = require('express')
const app = express()


const sequelize = new Sequelize(process.env.DATABASE_URL)


app.get('/api/blogs', async (req, res) => {
  const blogs = await sequelize.query("SELECT * FROM blogs", { type: QueryTypes.SELECT })
  res.json(blogs)
})
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})









// const main = async () => {
//   try {
//     await sequelize.authenticate()
//     console.log('Connection has been established successfully.')
//     const blogs = await sequelize.query("SELECT * FROM blogs", { type: QueryTypes.SELECT })
//     console.log(blogs)


//     sequelize.close()
//   } catch (error) {
//     console.error('Unable to connect to the database:', error)
//   }
// }

// main()