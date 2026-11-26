# Documento de Implementação - CD 2097 Stretchadeiras

Este documento sintetiza o que foi implementado, decisões técnicas, endpoints criados e integridade do projeto.

---

## 1. O que foi Implementado

1. **Script DDL MySQL (`docs/schema.sql`):**
   - Criação das tabelas `filiais`, `boxes` e `stretchadeiras` com integridade referencial.
   - Separação conceitual estrita entre `ativo` (1=ATIVA, 0=INATIVA) e `status_operacional` ('LIVRE', 'OCUPADA').
2. **Controladores REST Spring Boot:**
   - [`FilialController.java`](file:///c:/Users/matheus.batista/Downloads/My%20Things/Projects/pw_job/COBTI008%20-%20STRECHADEIRA%20CD%202097/sendly/src/main/java/com/netlify/sendlyenvios/sendly/FilialController.java): CRUD de filiais via `JdbcTemplate`.
   - [`BoxController.java`](file:///c:/Users/matheus.batista/Downloads/My%20Things/Projects/pw_job/COBTI008%20-%20STRECHADEIRA%20CD%202097/sendly/src/main/java/com/netlify/sendlyenvios/sendly/BoxController.java): CRUD de boxes de expedição via `JdbcTemplate`.
   - [`StretchadeiraController.java`](file:///c:/Users/matheus.batista/Downloads/My%20Things/Projects/pw_job/COBTI008%20-%20STRECHADEIRA%20CD%202097/sendly/src/main/java/com/netlify/sendlyenvios/sendly/StretchadeiraController.java): CRUD de stretchadeiras, alternância de ativação e atualização de status operacional com vínculo a filial e box.
   - [`UsuarioController.java`](file:///c:/Users/matheus.batista/Downloads/My%20Things/Projects/pw_job/COBTI008%20-%20STRECHADEIRA%20CD%202097/sendly/src/main/java/com/netlify/sendlyenvios/sendly/UsuarioController.java): Gestão de usuários da tabela `users` existente com hash BCrypt e supressão estrita de senhas/tokens nas respostas.
3. **Frontend SPA:**
   - [`painel.html`](file:///c:/Users/matheus.batista/Downloads/My%20Things/Projects/pw_job/COBTI008%20-%20STRECHADEIRA%20CD%202097/sendly/src/main/resources/static/painel.html): Estrutura SPA com Header de usuário, Sidebar colapsável e container dinâmico.
   - [`painel.css`](file:///c:/Users/matheus.batista/Downloads/My%20Things/Projects/pw_job/COBTI008%20-%20STRECHADEIRA%20CD%202097/sendly/src/main/resources/static/css/painel.css): Estilo dark theme inspirado no Cobasi Tower Control e regras de responsividade para celular, tablet e desktop.
   - [`painel.js`](file:///c:/Users/matheus.batista/Downloads/My%20Things/Projects/pw_job/COBTI008%20-%20STRECHADEIRA%20CD%202097/sendly/src/main/resources/static/js/painel.js): Lógica de troca de abas, consumo das APIs REST via `fetch`, modais interativos e toasts.
4. **Integração de Login:**
   - [`javascript.js`](file:///c:/Users/matheus.batista/Downloads/My%20Things/Projects/pw_job/COBTI008%20-%20STRECHADEIRA%20CD%202097/sendly/src/main/resources/static/js/javascript.js): Redirecionamento ajustado de `./menuprincipal.html` para `./painel.html`.

---

## 2. Endpoints Disponíveis

| Módulo | Método | Rota | Descrição |
|:---|:---|:---|:---|
| **Stretchadeiras** | GET | `/api/stretchadeiras` | Lista todas as máquinas com LEFT JOIN em filiais e boxes |
| | GET | `/api/stretchadeiras/{id}` | Busca stretchadeira por ID |
| | POST | `/api/stretchadeiras` | Cadastra nova stretchadeira |
| | PUT | `/api/stretchadeiras/{id}` | Atualiza nome, descrição e ativação |
| | PUT | `/api/stretchadeiras/{id}/status` | Altera status para LIVRE ou OCUPADA (vinculando filial e box) |
| | PUT | `/api/stretchadeiras/{id}/ativar` | Alterna entre ATIVA (1) e INATIVA (0) |
| | DELETE | `/api/stretchadeiras/{id}` | Exclui stretchadeira |
| **Filiais** | GET | `/api/filiais` | Lista filiais |
| | GET | `/api/filiais/{id}` | Busca filial por ID |
| | POST | `/api/filiais` | Cadastra filial |
| | PUT | `/api/filiais/{id}` | Atualiza filial |
| | DELETE | `/api/filiais/{id}` | Exclui filial (valida se não está em uso) |
| **Boxes** | GET | `/api/boxes` | Lista boxes de expedição |
| | GET | `/api/boxes/{id}` | Busca BOX por ID |
| | POST | `/api/boxes` | Cadastra BOX |
| | PUT | `/api/boxes/{id}` | Atualiza BOX |
| | DELETE | `/api/boxes/{id}` | Exclui BOX (valida se não está em uso) |
| **Usuários** | GET | `/api/usuarios` | Lista usuários (sem senhas/tokens) |
| | GET | `/api/usuarios/{id}` | Busca usuário por ID |
| | POST | `/api/usuarios` | Cadastra usuário com senha encriptada em BCrypt |
| | PUT | `/api/usuarios/{id}` | Atualiza usuário (senha opcional com BCrypt) |
| | DELETE | `/api/usuarios/{id}` | Exclui usuário |

---

## 3. Preservação da Autenticação Existente
- `Service.java`, `Controller.java`, `index.html`, `criarConta.html`, `esqueciSenha.html`, `trocarSenha.html`, `validarToken.html` foram 100% preservados.
- A tabela `users` não sofreu nenhuma remoção ou alteração destrutiva de colunas.
