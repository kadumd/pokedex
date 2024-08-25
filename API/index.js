const http = require("http")
const fs = require ("fs")
const path = require("path")
const portaDeEntrada = process.env.PORT || 3000;

const servidor = http.createServer((pedido, resposta)=>{
    console.log(pedido.url)
    if(pedido.url === '/'){
        fs.readFile('frontend/view/index.html', (erro, dadosDoArquivo)=>{
            if(erro){
                resposta.writeHead(500, { 'Content-Type': 'text/plain' })
                resposta.end("Erro no servidor")
                return
            }
            resposta.writeHead(200, { 'Content-Type': 'text/html' })
            resposta.end(dadosDoArquivo)
            return
        })
    }

    if(pedido.url === '/main.css'){
        fs.readFile('frontend/view/main.css', (erro, dadosDoArquivo)=>{
            if(erro){
                resposta.writeHead(500, { 'Content-Type': 'text/plain' })
                resposta.end("Erro no servidor")
                return
            }
            resposta.writeHead(200, { 'Content-Type': 'text/css' })
            resposta.end(dadosDoArquivo)
            return
        })
    }

    if(pedido.url === '/main.js'){
        fs.readFile('frontend/view/main.js', (erro, dadosDoArquivo)=>{
            if(erro){
                resposta.writeHead(500, { 'Content-Type': 'text/plain' })
                resposta.end("Erro no servidor")
                return
            }
            resposta.writeHead(200, { 'Content-Type': 'text/javascript' })
            resposta.end(dadosDoArquivo)
            return
        })
    }

    if(pedido.url === '/pokedex.png'){
        fs.readFile('frontend/view/pokedex.png', (erro, dadosDoArquivo)=>{
            if(erro){
                resposta.writeHead(500, { 'Content-Type': 'text/plain' })
                resposta.end("Erro no servidor")
                return
            }
            resposta.writeHead(200, { 'Content-Type': 'image/png' })
            resposta.end(dadosDoArquivo)
            return
        })
    }    
})

servidor.listen(portaDeEntrada, "0.0.0.0")