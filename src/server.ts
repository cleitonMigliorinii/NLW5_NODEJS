import express, { response } from "express";

const app = express();

/**
 * 
 *  GET = Buscas
 *  POST = Criaçao
 *  PUT = Alteraçao
 *  DELETE = deletar
 *  PATCH = Alterar uma alteracao especifica
 * 
 */

app.get("/", (request, response) => {
    return response.json({
        message: "Olá NLW 05 !"
    })
})

app.post("/", (request, response) => {
    return response.json({
        message: "Usuario salvo com sucesso"
    })
})

app.listen(3333, () => {
    console.log("Server is running on port 3333");
});