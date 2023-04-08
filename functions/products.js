require('dotenv').config()

const Airtable = require('airtable-node')

const airtable = new Airtable({ apiKey: process.env.AIR_TABLE_API }).base(process.env.AIR_TABLE_BASE).table(process.env.AIR_TABLE)

exports.handler = async (event, context, cb) => {
  try {
    const response = await airtable.list({ maxRecords: 200 })
    const products = response.records.map((product) => {
      const { id, fields } = product
      const {
        name,
        featured,
        price,
        images,
        stars,
        stock,
        colors,
        company,
        category,
        description,
        shipping
      } = fields

      const { url } = images[0]
      return {
        name,
        price,
        id,
        description,
        stars,
        stock,
        image: url,
        colors,
        company,
        category,
        shipping,
        featured
      }
    })
    return {
      statusCode: 200,
      body: JSON.stringify(products)
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: error.message
    }
  }
}