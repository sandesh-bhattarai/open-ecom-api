// http server 
const http = require("http");
const app = require("./src/config/express.config")

const httpServer = http.createServer(app)

httpServer.listen(9005, '192.168.101.191', (e) => {
    if(!e) {
        console.log("Server is running on port ",9005)
        console.log("Press CTRL+C to discontinue server...")
    }
})