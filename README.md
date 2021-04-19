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
