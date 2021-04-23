# Aula 01 - Criação do projeto

## Inicializa o projeto node

Inicializar o projeto no nodeJS
```bash
yarn init -y
```

Adicionar a dependencia do  [express](https://expressjs.com/pt-br/)
```bash
yarn add express
```

Como o express não vem com a tipagem e vamos utilizar TS, precisamos
instalar a dependencia dos tipos do express como dependencia de desenvolvimento.

```bash
yarn add @types/express -D
```

Adicionar a dependencia do  [Typescript](https://yarnpkg.com/package/typescript)
```bash
yarn add typescript -D
```

Inicializando o TypeScript no projeto
```bash
yarn tsc --init
```

Desabilitando as checagens opcionais do TS
```json
"strict": false,  
```

Por padrão o node nao entende a importação libs utilizando

```ts
import express, { response } from "express";
```
para ajustar isso precisamos instalar o [ts-node-dev](https://yarnpkg.com/package/ts-node-dev)

```bash
yarn add ts-node-dev -D
```


Para executar o projeto adicionar no package.json a configuração
scripts

```ts
"scripts": {
    "dev" : "ts-node-dev src/server.ts"
  },
```

Para executar o projeto

```bash
yarn dev
```
# Aula 02 - Iniciando com banco de dados

-- Banco relacional
-- Nnex.js  / TypeOrm / Sequelize ORM

## Configurando o TypeORM

Inicializar o [TypeORM](https://typeorm.io/#/)

```bash
yarn add typeorm 
```

```bash
yarn add reflect-metadata 
```

```bash
yarn add sqllite3
```

Criar o arquivo ormconfig.json para configurar o tipo do banco,
qual a database, onde estao localizados os migrations e as entidades.

## migrations

Criar uma migration, as migrations ajudam na criação e manutenção de bases
de dados, facilita a vida quando tem uma equipe envolvida, masss, trabalhando solo
também tem varias vantagens

```bash
yarn typeorm migration:create -n CreateSettigns
```

Run [migrations](https://typeorm.io/#/migrations)

comando run : executa o metodo up dentro da migration, básicamente serve para atualizar ou criar um novo ponto na base.

```bash
yarn typeorm migration:run
```

comando revert : executa o metodo down dentro da migration, neste metodo pode ser adicionado operacoes como mudança (update) (drop), insertion, básicamente código para voltar a versão.
```bash
yarn typeorm migration:revert
```

# Controlar uuid no projeto

```bash
yarn add uuid
yarn add @types/uuid -D
```

# Repositories

Básicamente a ideia eh ser a comunicação entre base e controller, vai extender o Repositorio do TypeOrm

```ts
@EntityRepository(Setting)
class SettingsRepository extends Repository<Setting> {
}
```


# Controllers

Básicamente var sera a camada que vai intermediar o repositorio com as Routes

```ts
import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { SettingsRepository } from "../repositories/SettingsRepository";

class SettingsControllers {

    async create(request: Request, response: Response){
        const {chat, username} = request.body;
        const settingsRepository = getCustomRepository(SettingsRepository);
    
        const settings = settingsRepository.create({
            chat, 
            username
        });
    
        await settingsRepository.save(settings);
    
        return response.json(settings);
    }

}

export { SettingsControllers }
```

# routes.ts

Vai indicar todas as rotas possiveis, cria as rotas para ser consumidas

```ts
import { Router } from "express";
import { SettingsControllers } from "./controllers/SettingsControllers";

const routes = Router();

const settingsControllers = new SettingsControllers();

routes.post("/settings", settingsControllers.create);

export { routes };
```

# Aula 03 - Continuação da aplicação

Nesta aula criamos as migrations de User, Messagens.

Também foi visto como criar uma Foren Key

Na migration 

```ts
foreignKeys: [
                {
                    name: "FKUser",
                    referencedTableName : "users",
                    referencedColumnNames: ["id"],
                    columnNames : ["user_id"],
                    onDelete : "SET NULL",
                    onUpdate : "SET NULL"
                }
            ]
```

Na entities
```ts
    @JoinColumn( { name: "user_id" })
    @ManyToOne( () => User)
    user: User;
```

Para recuperar os dados de uma fk utiliza-se o relations :
```ts
    const list = await this.messagesRepository.find({
            where: {user_id},
            relations: ["user"]
    })

    return list;
```
 # Aula 03 - Websocket

## Protocolo HTTP

Cliente -> Requisição / Aguardando -> Servidor

1 conexão por Request, quando existe a resposta a conexão vai fechar, em outras palavras a vida da requisição em um protocolo http e durante a request.

## Websocket

Cliente -> Conectar -> Servidor

Quando o cliente conecta no servidor a conexão vai exister até que o cliente se desconecte do servidor, em outras palavras a conexão vai ficar aberta todo tempo.

Bi-direcional, ou seja, qualquer um dos dois (Client/Service) pode enviar dados.

Utiliza o ID do socket para continuar a conexão.

[socket.io](https://socket.io)
```bash
yarn add socket.io
yarn add @types/socket.io -D
yarn add socket.io-client
yarn add ejsy
```

server.ts

```ts
import { createServer } from "http";
import { Server, Socket } from "socket.io";
...

const http = createServer(app); // Criando protocolo http
const io = new Server(http); // Criando protocolo Websocket
```
