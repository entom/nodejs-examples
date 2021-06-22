const http = require('http')
const EventEmitter = require('events')
const {getFileSize, getFileInfo, getAbsolutePathFromRelative} = require('./lib/utils')

const eventEmitter = new EventEmitter()

const hostname = '0.0.0.0'
const port = process.env.PORT || 3000

const server = http.createServer((req, res) => {
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/plain')
    res.end('Hello World :)\n')
})

eventEmitter.on('random-number', (value) => {
    console.log('event-random-number', value)
})

const randomNumber = () => {
    for (let i = 0; i < 10; i++) {
        eventEmitter.emit('random-number', Math.round(Math.random() % 100 * 100))
    }
}

server.listen(port, hostname, async () => {
    console.log(`Server running at http://${hostname}:${port}/`)

    randomNumber()

    const filePath = `${__dirname}/package.json`;

    try {
        const fileSize = await getFileSize(filePath);
        console.log('file-size, success', fileSize)
    } catch (e) {
        console.log('file-size, error', e)
    }

    console.log('file-info', getFileInfo(filePath))
    console.log('file-absolute', getAbsolutePathFromRelative('./package.json'))
})
