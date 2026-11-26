# Plano de Testes e Validação de QA - CD 2097

Este documento registra os cenários de teste, dados de entrada, resultados esperados e status de conformidade do Painel de Stretchadeiras CD 2097.

---

## 1. Testes Automatizados de Compilação e Empacotamento

| ID | Teste | Comando / Entrada | Resultado Esperado | Resultado Obtido | Status |
|:---|:---|:---|:---|:---|:---|
| T01 | Compilação Maven Clean | `./mvnw clean compile` | Sucesso na compilação dos 7 arquivos Java e empacotamento dos 23 recursos estáticos | `BUILD SUCCESS` (tempo ~6.6s) | ✅ APROVADO |
| T02 | Validação de Dependências | `pom.xml` | Presença de Spring JDBC, MySQL Connector, BCrypt, Spring Web | Todas as dependências resolvidas sem conflitos | ✅ APROVADO |

---

## 2. Testes de Endpoints REST (Backend)

| ID | Endpoint | Método | Entrada / Cenário | Resultado Esperado | Status |
|:---|:---|:---|:---|:---|:---|
| T03 | `/api/filiais` | `GET` | Requisição sem parâmetros | Retorna lista de filiais com status HTTP 200 | ✅ APROVADO |
| T04 | `/api/filiais` | `POST` | `{ "codigo": "F2097", "nome": "Cobasi CD 2097", "cidade": "Extrema" }` | Registro inserido, status 200 com mensagem de sucesso | ✅ APROVADO |
| T05 | `/api/boxes` | `GET` | Requisição sem parâmetros | Retorna lista de boxes com status HTTP 200 | ✅ APROVADO |
| T06 | `/api/boxes` | `POST` | `{ "nome": "BOX 01", "descricao": "Expedição Linha 1" }` | Registro inserido, status 200 | ✅ APROVADO |
| T07 | `/api/stretchadeiras` | `GET` | Requisição sem parâmetros | Retorna stretchadeiras com dados de filial e box via LEFT JOIN | ✅ APROVADO |
| T08 | `/api/stretchadeiras/{id}/status` | `PUT` | `{ "status": "OCUPADA", "filialId": 1, "boxId": 1 }` | Stretchadeira atualizada para OCUPADA, associando filial e box | ✅ APROVADO |
| T09 | `/api/stretchadeiras/{id}/status` | `PUT` | `{ "status": "LIVRE" }` | Stretchadeira liberada, desvinculando filial e box (valores NULL) | ✅ APROVADO |
| T10 | `/api/stretchadeiras/{id}/ativar` | `PUT` | Alterna ativo entre 1 e 0 | Máquina ativada/desativada com resposta condizente | ✅ APROVADO |
| T11 | `/api/usuarios` | `GET` | Listagem de usuários | Retorna usuários omitindo estritamente `password`, hashes e `token` | ✅ APROVADO |
| T12 | `/api/usuarios` | `POST` | Cadastro de novo usuário com senha | Senha criptografada com `BCryptPasswordEncoder` antes de persistir | ✅ APROVADO |

---

## 3. Testes de Frontend e Usabilidade (SPA)

| ID | Componente / Fluxo | Ação do Usuário | Resultado Esperado | Status |
|:---|:---|:---|:---|:---|
| T13 | Redirecionamento Pós-Login | Submeter formulário em `index.html` com credenciais válidas | `javascript.js` armazena `usuarioId` em `sessionStorage` e redireciona para `painel.html` | ✅ APROVADO |
| T14 | Carregamento SPA | Clicar nos itens da sidebar (Dashboard, Stretchadeiras, Filiais, BOX, Usuários) | Conteúdo do container principal é substituído via JS sem recarregar a página | ✅ APROVADO |
| T15 | Dashboard - Indicadores | Carregar aba Dashboard | Exibe KPIs (Total, Livres, Ocupadas, Inativas) calculados dinamicamente | ✅ APROVADO |
| T16 | Processamento de Palete | Clicar em "Processar Palete" em stretchadeira livre | Modal abre permitindo selecionar Filial e BOX; ao confirmar, status muda para OCUPADA | ✅ APROVADO |
| T17 | Conclusão de Palete | Clicar em "Concluir Palete" em máquina ocupada | Requisição PUT libera a stretchadeira, que retorna para o estado LIVRE | ✅ APROVADO |
| T18 | Encerramento de Sessão | Clicar no botão "Sair" do Header | `sessionStorage` é limpo e usuário é redirecionado para `index.html` | ✅ APROVADO |

---

## 4. Testes de Responsividade

| ID | Resolução | Dispositivo Alvo | Comportamento Esperado | Status |
|:---|:---|:---|:---|:---|
| T19 | `< 768px` | Celulares / Telas Pequenas | Sidebar recolhida com botão hamburger, cards em coluna única, tabelas com scroll horizontal | ✅ APROVADO |
| T20 | `768px - 1199px` | Tablets / Notebooks | Sidebar compacta (apenas ícones), grid de máquinas adaptável em 2 colunas | ✅ APROVADO |
| T21 | `≥ 1200px` | Desktops Grandes | Sidebar completa (250px), cards e métricas com visualização expandida | ✅ APROVADO |
