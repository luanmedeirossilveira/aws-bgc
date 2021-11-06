const AWS = require('aws-sdk')
const { save } = require('../service/products')

const PRODUCTS = process.env.PRODUCTS_TABLE
const dynamoDbClient = new AWS.DynamoDB.DocumentClient()

/**
 * Controller com objetivo de buscar os itens da tabela
 * @param {*} req
 * @param {*} res
 */
async function findProducts(req, res) {
  const params = {
    TableName: 'PRODUCTS',
  }

  try {
    dynamoDbClient.scan(params, (err, data) => {
      if (err) {
        console.log('Error', err)
      } else {
        const response = data.Responses.TABLE_NAME.forEach(function (
          element,
          _index,
          _array
        ) {
          return element
        })

        res.status(200).json({ response })
      }
    })
  } catch (error) {
    res.status(500).json({ error })
  }
}

/**
 * Controller com objetivo de filtrar o mapeamento dos produtos e salvar na tabela
 * @param {*} _req
 * @param {*} res
 */
async function mapProducts(_req, res) {
  try {
    save().then(async (response) => {
      for (let idx = 0; idx < 3; idx++) {
        const productId = response[idx].title.replace(' ', '')
        const title = response[idx].title
        const src = response[idx].src
        const oldValue = response[idx].oldValue
        const newValue = response[idx].newValue

        const params = {
          TableName: PRODUCTS,
          Item: {
            productId,
            title,
            src,
            oldValue,
            newValue,
          },
        }
        await dynamoDbClient.put(params).promise()
      }

      res.status(201).json({
        response
      })
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Produtos não foram mapeados!' })
  }
}

module.exports = {
  mapProducts,
  findProducts,
}
