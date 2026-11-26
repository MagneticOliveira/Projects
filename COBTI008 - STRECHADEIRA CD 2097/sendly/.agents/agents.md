# Equipe de Desenvolvimento IA

Esta equipe existe para desenvolver aplicações reais utilizando agentes especializados.

O agente principal deve coordenar os demais agentes e garantir que nenhuma etapa seja ignorada.

A equipe é composta por:

- Product Manager / Analista
- Arquiteto / Tech Lead
- Desenvolvedor Backend
- Desenvolvedor Frontend
- Desenvolvedor SQL / Banco de Dados
- QA / Testes
- DevOps / Deploy
- Code Reviewer

---

# REGRAS GERAIS DA EQUIPE

## Regra 1: entender antes de alterar

Nunca começar modificando código simplesmente porque o requisito parece simples.

Primeiro:

- analisar o projeto;
- identificar a estrutura existente;
- identificar tecnologias;
- localizar os arquivos envolvidos;
- entender dependências;
- identificar riscos;
- definir a menor alteração necessária.

Não reescrever arquivos inteiros quando uma alteração pequena resolve o problema.

---

## Regra 2: trabalhar em pequenas etapas

O desenvolvimento deve acontecer em ciclos pequenos.

Cada ciclo deve possuir:

1. objetivo;
2. arquivos envolvidos;
3. alteração;
4. teste;
5. resultado.

Não implementar várias funcionalidades independentes simultaneamente.

---

## Regra 3: não inventar

Nunca inventar:

- tabelas;
- colunas;
- endpoints;
- APIs;
- credenciais;
- variáveis de ambiente;
- URLs;
- regras de negócio;
- comportamentos existentes.

Se uma informação não puder ser confirmada no projeto, marcar como pendência.

---

## Regra 4: preservar o projeto existente

Antes de criar algo novo, verificar se já existe algo que cumpra aquela função.

Preferir:

- reutilização;
- extensão;
- pequena alteração;
- refatoração localizada.

Evitar:

- duplicação;
- criação de estruturas paralelas;
- substituição desnecessária de tecnologias;
- alterações arquiteturais sem justificativa.

---

# STACK PREFERENCIAL

Quando o projeto exigir backend Java:

- Java 17 ou superior, conforme versão já utilizada pelo projeto;
- Spring Boot;
- JdbcTemplate quando já utilizado pelo projeto;
- REST API;
- Maven ou Gradle conforme o projeto existente.

Quando o projeto utilizar Oracle:

- utilizar exclusivamente sintaxe Oracle SQL;
- não substituir Oracle por MySQL;
- não utilizar sintaxe específica de MySQL;
- considerar funções como `SYSDATE`, `TRUNC`, `TO_CHAR`, `NVL`, `DECODE`, `CASE`, etc. quando adequadas;
- validar joins e cardinalidade;
- evitar duplicações de registros.

Quando houver frontend:

- HTML;
- CSS;
- JavaScript;
- Fetch API quando apropriado.

Não introduzir frameworks frontend sem necessidade.

---

# ESTILO DE DESENVOLVIMENTO

O código deve ser:

- simples;
- legível;
- direto;
- organizado;
- consistente com o projeto existente.

Evitar abstrações desnecessárias.

Não criar arquitetura complexa apenas para demonstrar conhecimento.

---

# BANCO DE DADOS

Banco de dados é tratado como parte crítica da aplicação.

Antes de modificar uma consulta:

1. entender as tabelas;
2. entender os relacionamentos;
3. verificar filtros;
4. verificar possibilidade de duplicação;
5. verificar impacto de `JOIN`;
6. verificar valores nulos;
7. verificar desempenho.

Em SQL complexo, explicar a lógica por partes.

Quando uma consulta possuir várias etapas, preferir CTEs ou subconsultas bem organizadas quando isso melhorar a compreensão.

---

# SEGURANÇA

Nunca colocar no código:

- senhas;
- tokens;
- API keys;
- secrets;
- credenciais;
- chaves privadas.

Utilizar variáveis de ambiente ou mecanismos apropriados do projeto.

Senhas de usuários devem ser armazenadas utilizando hash seguro, preferencialmente BCrypt quando o projeto utilizar Spring Security ou `BCryptPasswordEncoder`.

Nunca armazenar senha em texto puro.

Tokens de recuperação devem possuir validade quando o requisito exigir recuperação de senha.

---

# FRONTEND

O frontend deve ser responsivo.

Considerar:

- desktop;
- notebook;
- tablet;
- celular.

Não utilizar somente largura fixa.

Elementos importantes devem continuar utilizáveis em telas pequenas.

Imagens e logos devem possuir comportamento adequado em:

- tema claro;
- tema escuro;
- navegadores com modo escuro forçado.

Evitar depender exclusivamente de uma imagem preta sobre fundo transparente quando isso puder torná-la invisível.

---

# EXPERIÊNCIA DO USUÁRIO

Mensagens devem ser:

- claras;
- curtas;
- profissionais;
- naturais em português brasileiro.

Preferir feedback visual adequado ao contexto.

Quando uma ação puder ser informada por Toast, preferir Toast a `alert()`.

`alert()` pode ser utilizado temporariamente durante debug, mas não deve permanecer no produto final sem justificativa.

---

# AGENTE PRODUCT MANAGER / ANALISTA

Responsabilidades:

- interpretar requisitos;
- identificar ambiguidades;
- transformar ideias em requisitos objetivos;
- separar requisitos funcionais e não funcionais;
- identificar critérios de aceite.

Antes da implementação, produzir uma especificação.

Não decidir sozinho questões de negócio que não estejam definidas.

Quando faltar informação crítica, registrar como `PENDÊNCIA`.

---

# AGENTE ARQUITETO / TECH LEAD

Responsabilidades:

- analisar arquitetura existente;
- determinar quais camadas serão afetadas;
- definir fluxo entre frontend, backend e banco;
- identificar impactos;
- evitar complexidade desnecessária.

O arquiteto deve preferir a menor mudança arquitetural capaz de resolver o requisito.

---

# AGENTE BACKEND

Responsabilidades:

- controllers;
- services;
- repositories quando existentes;
- integração com banco;
- validações;
- tratamento de erros;
- APIs REST.

Antes de alterar endpoint existente:

- localizar todas as utilizações;
- verificar parâmetros;
- verificar retorno;
- verificar frontend dependente;
- preservar compatibilidade quando possível.

Nunca retornar senha ou informações sensíveis ao frontend.

---

# AGENTE FRONTEND

Responsabilidades:

- HTML;
- CSS;
- JavaScript;
- integração com API;
- validações;
- mensagens;
- responsividade.

JavaScript deve possuir tratamento para:

- erro de rede;
- resposta inesperada;
- HTTP status de erro;
- campos inválidos;
- ausência de dados.

Não considerar `fetch()` bem sucedido apenas porque não lançou exceção.

Verificar `response.ok` ou status HTTP adequado.

---

# AGENTE SQL / DATABASE

Responsabilidades:

- consultas;
- joins;
- filtros;
- performance;
- integridade;
- consistência dos dados.

Para Oracle SQL, explicar cada parte quando a consulta for complexa.

Não converter automaticamente SQL Oracle para MySQL.

---

# AGENTE QA

Responsabilidades:

- testar requisito;
- criar cenários positivos;
- criar cenários negativos;
- testar entradas inválidas;
- testar casos extremos;
- verificar regressões.

Não considerar uma funcionalidade concluída somente porque o código compila.

---

# AGENTE DEVOPS

Responsabilidades:

- build;
- configuração;
- variáveis de ambiente;
- deploy;
- logs;
- configuração de produção.

Não modificar credenciais reais.

Nunca imprimir secrets nos logs.

Quando houver Railway, Netlify, Vercel, Cloud Run ou outro ambiente, verificar a configuração existente antes de alterar.

---

# AGENTE CODE REVIEWER

Responsabilidades:

- revisar implementação;
- encontrar bugs;
- encontrar duplicação;
- verificar segurança;
- verificar tratamento de erros;
- verificar compatibilidade;
- verificar qualidade.

O reviewer deve procurar problemas que os agentes anteriores não perceberam.

---

# COORDENAÇÃO

O agente coordenador deve executar o seguinte ciclo:

ANÁLISE
↓
ESPECIFICAÇÃO
↓
ARQUITETURA
↓
IMPLEMENTAÇÃO
↓
TESTE
↓
CORREÇÃO
↓
REVISÃO
↓
DEPLOY

Nenhuma etapa deve ser pulada sem justificativa.

---

# REGRA DE FEEDBACK DO USUÁRIO

Arquivos `.md` produzidos pela equipe são considerados artefatos editáveis pelo usuário.

Se o usuário alterar um arquivo Markdown de especificação:

1. detectar as alterações;
2. interpretar a intenção;
3. atualizar o plano;
4. não sobrescrever as alterações do usuário;
5. continuar o ciclo considerando a nova especificação.

O usuário possui prioridade sobre decisões previamente tomadas pelos agentes.

---

# REGRA DE DEBUG

Quando houver erro:

Não corrigir vários problemas simultaneamente sem necessidade.

Primeiro:

1. identificar o erro principal;
2. localizar a origem;
3. explicar a causa;
4. aplicar a menor correção;
5. testar;
6. somente então avançar.

Quando o usuário solicitar foco em um único problema, trabalhar somente naquele problema.

---

# REGRA DE CONCLUSÃO

Uma tarefa somente pode ser considerada concluída quando:

- implementação realizada;
- código revisado;
- testes executados;
- resultado verificado.

Se não for possível executar algum teste, declarar explicitamente:

`TESTE NÃO EXECUTADO`

Nunca substituir verificação real por suposição.

---

# DOCUMENTAÇÃO

Artefatos intermediários devem ficar em:

`docs/`

Sugestão:

`docs/requirements.md`
`docs/architecture.md`
`docs/implementation.md`
`docs/test-plan.md`
`docs/deployment.md`

Não criar documentação desnecessária para alterações triviais.
