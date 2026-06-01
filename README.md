# Sistema de Consulta de Equipamentos

## Descrição

Sistema desenvolvido para cadastro, consulta, edição e exclusão de equipamentos multimídia.

O projeto é composto por:

* Frontend em HTML, CSS e JavaScript.
* Backend em Node.js utilizando Express.
* Comunicação via API REST.

---

## Funcionalidades

### Cadastro de Equipamentos

Permite adicionar novos equipamentos informando:

* Nome
* Tipo
* Status
* Descrição

### Consulta de Equipamentos

Permite visualizar todos os equipamentos cadastrados.

### Filtros

* Filtrar por status.
* Filtrar por tipo.
* Buscar por nome ou descrição.

### Edição

Permite atualizar os dados de um equipamento existente.

### Exclusão

Permite remover equipamentos cadastrados.

---

## Tecnologias Utilizadas

### Frontend

* HTML5
* CSS3
* JavaScript

### Backend

* Node.js
* Express
* Bun

---

## Estrutura do Projeto

```text
projeto/
│
├── frontend/
│   ├── index.html
│   ├── style.css
│   └── script.js
│
├── server.js
├── package.json
├── bun.lock
└── README.md
```

---

## Instalação

### 1. Clonar o projeto

```bash
git clone <url-do-repositorio>
```

### 2. Instalar dependências

```bash
bun install
```

---

## Execução

### Iniciar Backend

No terminal:

```bash
bun run dev
```

Saída esperada:

```text
Servidor rodando na porta 4001
```

### Iniciar Frontend

Abrir o arquivo:

```text
frontend/index.html
```

ou utilizar a extensão Live Server do VS Code.

Exemplo:

```text
http://127.0.0.1:5500/frontend/index.html
```

---

## Endpoints da API

### Listar Equipamentos

```http
GET /equipamentos
```

### Buscar por ID

```http
GET /equipamentos/:id
```

### Criar Equipamento

```http
POST /equipamentos
```

### Atualizar Equipamento

```http
PUT /equipamentos/:id
```

### Excluir Equipamento

```http
DELETE /equipamentos/:id
```

---

## Exemplo de Equipamento

```json
{
  "id": 1,
  "nome": "Projetor Epson X39",
  "tipo": "projetor",
  "status": "disponivel",
  "descricao": "Projetor com resolução XGA 3600 lumens"
}
```

---

## Commits Utilizados

### Commit 1

```text
feat: criação da estrutura inicial do projeto
```

### Commit 2

```text
feat: implementação da API REST de equipamentos
```

### Commit 3

```text
feat: criação da interface de consulta e cadastro
```

### Commit 4

```text
feat: implementação de filtros e busca
```

### Commit 5

```text
fix: correção de CORS para operações PUT e DELETE
```

### Commit 6

```text
docs: adição do README com instruções de execução
```

---

## Autor
Eduardo Damian Bizio // Antônio Júnior M. Da Silva
Projeto desenvolvido para atividade avaliativa da disciplina de Desenvolvimento Web.
