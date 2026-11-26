# Requisitos - Painel de Stretchadeiras CD 2097

## Objetivo

Construir um painel operacional de acompanhamento do processo de paletes nas stretchadeiras do CD 2097.

O sistema deve permitir:
- Acompanhar o estado das stretchadeiras (LIVRE / OCUPADA / ATIVA / INATIVA)
- Identificar qual filial/loja está relacionada ao palete em processamento
- Informar para qual BOX o palete deve ser direcionado
- Cadastrar e manter stretchadeiras, filiais, BOX e usuários
- Centralizar essas informações em um painel operacional

---

## Projeto Existente - Análise

### Estrutura Atual do Projeto

| Camada | Tecnologia | Arquivos |
|--------|-----------|----------|
| Frontend | HTML + CSS + JS (Vanilla) | `static/*.html`, `static/css/*.css`, `static/js/*.js` |
| Backend | Spring Boot 4.0.6 / Java 17 | `Service.java` (RestController), `Controller.java` (utilitários) |
| Banco | MySQL (Railway) | Tabela `users` |
| Build | Maven | `pom.xml` |
| Deploy | Railway | URL: `sendly-production-b679.up.railway.app` |

### Arquivos Existentes (NÃO ALTERAR)

#### HTML
- `index.html` — Tela de login
- `criarConta.html` — Tela de criação de conta
- `esqueciSenha.html` — Tela de recuperação de senha
- `validarToken.html` — Tela de validação de token
- `trocarSenha.html` — Tela de troca de senha
- `menuprincipal.html` — Menu principal atual (referência de padrão)

#### CSS
- `css/style.css` — CSS do login
- `css/conta.css` — CSS das telas de conta
- `css/styleMenuprincipal.css` — CSS do menu principal (referência)

#### JavaScript
- `js/javascript.js` — Login (fetch POST → sessionStorage)
- `js/criarConta.js` — Criação de conta
- `js/esqueciSenha.js` — Recuperação de senha
- `js/validarToken.js` — Validação de token
- `js/trocarSenha.js` — Troca de senha
- `js/javascriptMenuPrincipal.js` — Menu principal (referência)

#### Backend Java
- `SendlyApplication.java` — Classe principal Spring Boot
- `Service.java` — Todos os endpoints REST (6 endpoints de autenticação)
- `Controller.java` — Utilitários (envio de email, resposta de usuário não encontrado)

### Autenticação Existente (PRESERVAR)

| Endpoint | Método | Finalidade |
|----------|--------|-----------|
| `/cadastro` | POST | Login (email + password com BCrypt) |
| `/cadastro` | GET | Buscar dados do usuário por id |
| `/cadastroNew` | POST | Criar nova conta |
| `/cadastroUpdate` | POST | Solicitar recuperação de senha (gera token + envia email via Resend) |
| `/cadastroUpdate2` | GET | Validar token de recuperação |
| `/cadastroUpdate3` | POST | Trocar senha com token |

### Fluxo de Autenticação Atual
```
index.html → fetch POST /cadastro
  → sucesso: sessionStorage.setItem('usuarioId', data.id) → menuprincipal.html
  → falha: exibe mensagem de erro
```

### Banco de Dados Existente

Tabela `users`:
```sql
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `destino` varchar(120) DEFAULT NULL,
  `firstName` varchar(50) DEFAULT NULL,
  `statusEntregaRecente` varchar(30) DEFAULT NULL,
  `observacao` varchar(30) DEFAULT NULL,
  `estimativaER` varchar(30) DEFAULT NULL,
  `name` varchar(150) DEFAULT NULL,
  `endereco` varchar(150) DEFAULT NULL,
  `entregasAtivas` int DEFAULT NULL,
  `entregasFeitas` int DEFAULT NULL,
  `entregasSolicitadas` int DEFAULT NULL,
  `iconPerfil` varchar(255) DEFAULT NULL,
  `telefone` varchar(11) DEFAULT NULL,
  `token` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
```

### Dependências Maven
- `spring-boot-starter-jdbc` (JdbcTemplate)
- `spring-boot-starter-web`
- `spring-boot-devtools`
- `mysql-connector-j`
- `lombok`
- `spring-boot-starter-test`
- `resend-java` 4.22.0 (envio de email)
- `spring-security-crypto` (BCryptPasswordEncoder)

### Padrões Identificados (Referência)

**JavaScript:**
- `querySelector` / `querySelectorAll` para selecionar elementos
- `sessionStorage` para manter estado do usuário logado
- `FormData` para envio de dados
- `fetch()` com `await` para comunicação com backend
- Verificação de `data.ok` ou propriedades específicas
- Tratamento de erros com `try/catch`

**CSS:**
- Mobile-first implícito (base sem media query)
- `@media(min-width:768px) and (orientation: portrait)` para tablets em pé
- `@media(min-width:768px) and (orientation: landscape)` para tablets/notebooks deitados
- `@media(min-width: 1200px)` para desktops
- Uso de `rem`, `%`, `vw`, `vh`, `dvw`
- Flexbox como principal sistema de layout
- Font: Montserrat, Inter, Atkinson Hyperlegible Mono

**Backend:**
- `@RestController` + `@CrossOrigin("*")` no Service
- `JdbcTemplate` direto para queries
- `ResponseEntity<?>` como retorno
- Sem camada Repository separada
- Sem DTO formal

---

## Requisitos Funcionais - Primeira Etapa

### RF01 - Login (EXISTENTE)
A autenticação existente deve ser reutilizada. Nenhuma alteração.

### RF02 - Painel Operacional Principal (NOVO)
Nova tela pós-login que substitui o `menuprincipal.html` como destino após login.
- Sidebar com navegação: Dashboard, Stretchadeiras, Filiais, BOX, Usuários
- Header com informações do usuário logado e logout
- Área principal para conteúdo dinâmico
- Inspiração visual: Cobasi Tower Control

### RF03 - Cadastro de Stretchadeiras (NOVO)
- Campos: nome/código, descrição (opcional), status ativo/inativo
- CRUD completo: listar, criar, editar, ativar/desativar

### RF04 - Cadastro de Filiais (NOVO)
- Campos: código da filial, nome da filial, cidade (opcional)
- CRUD completo: listar, criar, editar

### RF05 - Cadastro de BOX (NOVO)
- Campos: código/nome do BOX, descrição (opcional)
- CRUD completo: listar, criar, editar

### RF06 - Cadastro de Usuários (NOVO)
- Integrar com tabela `users` existente
- Listar, criar, editar usuários
- Usar autenticação existente (BCrypt)

### RF07 - Painel de Status das Stretchadeiras (NOVO)
- Exibir cards com cada stretchadeira
- Status visual: LIVRE (verde), OCUPADA (laranja/amarelo)
- Indicador de ATIVA/INATIVA separado
- Quando OCUPADA: exibir filial + BOX destino

---

## Modelo de Status

> [!IMPORTANT]
> ATIVA/INATIVA e LIVRE/OCUPADA são conceitos **separados**.

| Combinação | Significado |
|-----------|-------------|
| ATIVA + LIVRE | Stretchadeira habilitada e disponível |
| ATIVA + OCUPADA | Stretchadeira habilitada e processando palete |
| INATIVA | Stretchadeira desabilitada (não aparece como LIVRE/OCUPADA) |

- `ativo` → campo booleano na tabela `stretchadeiras` (ATIVA/INATIVA)
- `status_operacional` → campo varchar na tabela `stretchadeiras` ou gerenciado via tabela de operações (LIVRE/OCUPADA)

---

## Critérios de Aceite - Primeira Etapa

1. ✅ Login existente continua funcionando sem alterações
2. ✅ Após login, usuário é direcionado para novo painel operacional
3. ✅ Painel possui sidebar com navegação funcional
4. ✅ Painel exibe informações do usuário logado
5. ✅ Logout funciona e redireciona para login
6. ✅ Interface responsiva (desktop, notebook, tablet, celular)
7. ✅ Identidade visual inspirada no Cobasi Tower Control
8. ✅ Novas tabelas criadas no MySQL para stretchadeiras, filiais e BOX
9. ✅ Backend com endpoints para CRUD básico
10. ✅ Frontend com telas para cada cadastro

---

## Pendências de Negócio

| # | Pendência | Impacto |
|---|-----------|---------|
| P01 | Quantas stretchadeiras existem no CD 2097? | Definição de layout do painel |
| P02 | Quais informações da filial são necessárias? | Campos da tabela `filiais` |
| P03 | Quantos BOX existem? | Estrutura do cadastro |
| P04 | O palete terá identificação (código, etiqueta)? | Modelo futuro de associação |
| P05 | O painel deve atualizar automaticamente ou por refresh manual? | Decisão de polling/WebSocket futuro |

> As pendências acima não bloqueiam a primeira etapa. Serão resolvidas conforme o projeto evoluir.

---

## Arquivos Envolvidos

### NÃO ALTERAR
- `index.html`, `criarConta.html`, `esqueciSenha.html`, `validarToken.html`, `trocarSenha.html`
- `css/style.css`, `css/conta.css`
- `js/javascript.js`, `js/criarConta.js`, `js/esqueciSenha.js`, `js/validarToken.js`, `js/trocarSenha.js`
- `SendlyApplication.java`
- `Controller.java`

### ALTERAR MINIMAMENTE
- `js/javascript.js` — Redirecionar para novo painel (trocar `menuprincipal.html` → `painel.html`)
- `Service.java` — Adicionar novos endpoints (sem alterar os existentes)

### CRIAR
- `painel.html` — Novo painel operacional
- `css/painel.css` — CSS do novo painel
- `js/painel.js` — JavaScript do novo painel
- Novas classes Java para Controllers e Services dos novos módulos
- Novas tabelas MySQL: `stretchadeiras`, `filiais`, `boxes`
