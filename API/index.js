const http = require("http")
const fs = require("fs")
const path = require("path")
const portaDeEntrada = process.env.PORT || 3000;

const servidor = http.createServer((pedido, resposta) => {
    console.log(pedido.url)
    switch (pedido.url) {
        case '/':
            resposta.writeHead(200, { "Content-Type": "text/html" })
            resposta.end(fs.readFileSync("./frontend/view/index.html"))
            break

        case '/main.css':
            resposta.writeHead(200, { "Content-Type": "text/css" })
            resposta.end(fs.readFileSync("./frontend/view/main.css"))
            break

        case '/main.js':
            resposta.writeHead(200, { "Content-Type": "text/javascript" })
            resposta.end(fs.readFileSync("./frontend/view/main.js"))
            break

        case '/pokedex.png':
            resposta.writeHead(200, { "Content-Type": "image/png" })
            resposta.end(fs.readFileSync("./frontend/view/pokedex.png"))
            break

        case '/icone-pokebola.png':
            resposta.writeHead(200, { "Content-Type": "image/png" })
            resposta.end(fs.readFileSync("./frontend/view/icone-pokebola.png"))
            break
    }
})

servidor.listen(portaDeEntrada, "0.0.0.0")