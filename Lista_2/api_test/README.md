## Lista 2

### Configuração do projeto

Para instalar as dependências do projeto, basta rodar:

```bash
npm install

ou

yarn
```

### Executando os testes

Para executar os testes no terminal, basta rodar:

```bash
npx newman run postman_collection.json

ou

yarn report:cli
```

### Gerando relatório

Para gerar o relatório em HTML, basta rodar:

```bash
npx newman run postman_collection.json --reporters html

ou

yarn report:html
```

Para abrir o relatório em HTML, basta rodar:

```bash
open ./reports/report.html

ou

yarn report:open
```
