const express = require('express')
const http = require('http')
const axios = require('axios')
const fs = require('fs')
const { join } = require('path')
const url = require('url')
const { JSDOM } = require('jsdom')

const app = express()

const server = http.createServer(app)
const RESULTS_PATH = join(process.cwd(), 'results')

app.use(express.json())
app.use('/files', express.static('results'))
app.use(express.urlencoded({ extended: true }))

// POST /crawl Endpoint
// Crawl website from given url
app.get('/crawl', async (req, res, next) => {
  const givenUrl = req.query.url
  console.log(givenUrl)

  const { data } = await axios.get(givenUrl)
  const dom = new JSDOM(data)
  const $ = dom.serialize()

  const pathName = url.parse(givenUrl).hostname
  const create = fs.createWriteStream(join(RESULTS_PATH, pathName + '.html'), {
    encoding: 'utf-8',
  })

  const writeFile = () =>
    new Promise((resolve, reject) => {
      create.once('open', (fd) => {
        resolve(create.end($))
      })
    })

  await writeFile()
  res.status(201).json({
    message: 'Success',
    detail: {
      path: `${RESULTS_PATH}/${url}`,
    },
  })
})

// HANDLE PATH NOT FOUND ERROR
app.all('*', (req, res, next) => {
  res.status(404).json({
    error: 'NOT_FOUND',
    message: 'Path Not Found',
    status: res.statusCode,
  })
})

const APP_PORT = 8080
server.listen(APP_PORT, () =>
  console.log(`App is listening on port ${APP_PORT}`)
)
