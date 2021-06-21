const http = require('http')
const EventEmitter = require('events')
const eventEmiter = new EventEmitter()

const hostname = '0.0.0.0'
const port = process.env.PORT || 3000

const server = http.createServer((req, res) => {
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/plain')
    res.end('Hello World :)\n')
})

eventEmiter.on('random-number', (value) => {
    console.log('event-random-number', value)
})

const randomNumber = () => {
    for (let i = 0; i < 10; i++) {
        eventEmiter.emit('random-number', Math.round(Math.random() % 100 * 100))
    }
}

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`)

    randomNumber()
})
