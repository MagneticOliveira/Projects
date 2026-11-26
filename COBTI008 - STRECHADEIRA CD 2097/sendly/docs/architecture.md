# Arquitetura - Painel de Stretchadeiras CD 2097

## Visão Geral

O sistema segue a arquitetura já existente no projeto:

```
HTML (static/) → JavaScript (fetch) → Spring Boot (RestController + JdbcTemplate) → MySQL
```

Nenhuma nova tecnologia será introduzida. O padrão existente será estendido.

---

## Fluxo Frontend → Backend → Banco

```
┌─────────────────────────────────────────────────────────────┐
│  FRONTEND (static/)                                         │
│                                                             │
│  painel.html ─── css/painel.css                            │
│       │                                                     │
│       └── js/painel.js                                      │
│              │                                              │
│              ├── fetch GET/POST /api/stretchadeiras         │
│              ├── fetch GET/POST /api/filiais                │
│              ├── fetch GET/POST /api/boxes                  │
│              └── fetch GET /cadastro?id=X (existente)       │
│                                                             │
└────────────────────┬────────────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────────────┐
│  BACKEND (Spring Boot)                                      │
│                                                             │
│  Service.java (EXISTENTE - NÃO ALTERAR endpoints atuais)    │
│                                                             │
│  StretchadeiraController.java (NOVO)                        │
│     └── CRUD /api/stretchadeiras                            │
│                                                             │
│  FilialController.java (NOVO)                               │
│     └── CRUD /api/filiais                                   │
│                                                             │
│  BoxController.java (NOVO)                                  │
│     └── CRUD /api/boxes                                     │
│                                                             │
│  Todos usam JdbcTemplate (padrão existente)                 │
│                                                             │
└────────────────────┬────────────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────────────┐
│  BANCO DE DADOS (MySQL - Railway)                           │
│                                                             │
│  users (EXISTENTE - NÃO ALTERAR)                            │
│  stretchadeiras (NOVO)                                      │
│  filiais (NOVO)                                             │
│  boxes (NOVO)                                               │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## Modelo de Dados - Novas Tabelas

### Tabela `stretchadeiras`

```sql
CREATE TABLE `stretchadeiras` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  `descricao` varchar(255) DEFAULT NULL,
  `ativo` tinyint(1) NOT NULL DEFAULT 1,
  `status_operacional` varchar(20) NOT NULL DEFAULT 'LIVRE',
  `filial_id` int DEFAULT NULL,
  `box_id` int DEFAULT NULL,
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_stretchadeira_filial` FOREIGN KEY (`filial_id`) REFERENCES `filiais`(`id`),
  CONSTRAINT `fk_stretchadeira_box` FOREIGN KEY (`box_id`) REFERENCES `boxes`(`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
```

**Campos:**
- `nome` — Identificação da stretchadeira (ex: "Stretchadeira 01")
- `ativo` — 1=ATIVA, 0=INATIVA (habilitação no sistema)
- `status_operacional` — 'LIVRE' ou 'OCUPADA' (estado de operação)
- `filial_id` — FK para filial relacionada ao palete (quando OCUPADA)
- `box_id` — FK para BOX de destino (quando OCUPADA)

> [!IMPORTANT]
> `ativo` e `status_operacional` são conceitos separados conforme definido nos requisitos.
> Uma stretchadeira INATIVA não tem status operacional LIVRE/OCUPADA exibido.

### Tabela `filiais`

```sql
CREATE TABLE `filiais` (
  `id` int NOT NULL AUTO_INCREMENT,
  `codigo` varchar(20) NOT NULL,
  `nome` varchar(150) NOT NULL,
  `cidade` varchar(100) DEFAULT NULL,
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_filial_codigo` (`codigo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
```

### Tabela `boxes`

```sql
CREATE TABLE `boxes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  `descricao` varchar(255) DEFAULT NULL,
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
```

### Relacionamentos

```
stretchadeiras.filial_id → filiais.id (N:1) — Quando OCUPADA
stretchadeiras.box_id    → boxes.id   (N:1) — Quando OCUPADA
```

Quando a stretchadeira está LIVRE, `filial_id` e `box_id` são NULL.

---

## Estrutura de Arquivos

### Arquivos a CRIAR

```
src/main/resources/static/
├── painel.html                          ← Novo painel operacional
├── css/
│   └── painel.css                       ← CSS do painel (identidade visual nova)
└── js/
    └── painel.js                        ← JavaScript do painel

src/main/java/com/netlify/sendlyenvios/sendly/
├── StretchadeiraController.java         ← REST Controller para stretchadeiras
├── FilialController.java                ← REST Controller para filiais
└── BoxController.java                   ← REST Controller para boxes
```

### Arquivos a ALTERAR (mínimo)

| Arquivo | Alteração | Justificativa |
|---------|-----------|---------------|
| `js/javascript.js` | Trocar `menuprincipal.html` → `painel.html` na linha 19 | Redirecionar login para o novo painel |

### Arquivos INTACTOS

Todos os demais arquivos permanecem inalterados.

---

## Endpoints REST - Novos

### Stretchadeiras

| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/api/stretchadeiras` | Listar todas |
| GET | `/api/stretchadeiras/{id}` | Buscar por id |
| POST | `/api/stretchadeiras` | Criar nova |
| PUT | `/api/stretchadeiras/{id}` | Atualizar |
| PUT | `/api/stretchadeiras/{id}/status` | Atualizar status operacional |
| PUT | `/api/stretchadeiras/{id}/ativar` | Ativar/Desativar |

### Filiais

| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/api/filiais` | Listar todas |
| GET | `/api/filiais/{id}` | Buscar por id |
| POST | `/api/filiais` | Criar nova |
| PUT | `/api/filiais/{id}` | Atualizar |

### Boxes

| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/api/boxes` | Listar todos |
| GET | `/api/boxes/{id}` | Buscar por id |
| POST | `/api/boxes` | Criar novo |
| PUT | `/api/boxes/{id}` | Atualizar |

---

## Arquitetura do Frontend - Painel

### Estrutura da Página

```
┌────────────────────────────────────────────────────────────────┐
│ HEADER                                                          │
│ [Logo Cobasi]  [CD 2097 - Stretchadeiras]  [Usuário ▼] [Sair] │
├───────────┬────────────────────────────────────────────────────┤
│           │                                                     │
│  SIDEBAR  │  CONTEÚDO PRINCIPAL                                │
│           │                                                     │
│ Dashboard │  (renderizado via JS conforme item do menu)         │
│ Stretch.  │                                                     │
│ Filiais   │  - Dashboard: Cards das stretchadeiras              │
│ BOX       │  - Stretchadeiras: Tabela CRUD                     │
│ Usuários  │  - Filiais: Tabela CRUD                            │
│           │  - BOX: Tabela CRUD                                │
│           │  - Usuários: Tabela CRUD                           │
│           │                                                     │
└───────────┴────────────────────────────────────────────────────┘
```

### Navegação
- SPA-like: conteúdo renderizado via JavaScript no mesmo HTML
- Cada seção do menu renderiza seu conteúdo no container principal
- Sem recarregamento de página

### Responsividade

| Breakpoint | Comportamento |
|------------|---------------|
| < 768px (celular) | Sidebar colapsada (hamburger), conteúdo 100% |
| 768px-1199px (tablet) | Sidebar compacta (ícones), conteúdo expande |
| ≥ 1200px (desktop) | Sidebar completa + conteúdo lado a lado |

---

## Identidade Visual

Inspirada no Cobasi Tower Control:
- **Tema:** Dark theme com acentos azuis/verdes para logística
- **Background:** Tons escuros (#1a1a2e, #16213e, #0f3460)
- **Cards:** Fundo semi-transparente com bordas sutis
- **Status LIVRE:** Verde (#00c853 / #4caf50)
- **Status OCUPADA:** Laranja/Amarelo (#ff9800 / #ffc107)
- **Status INATIVA:** Cinza (#9e9e9e)
- **Acentos:** Azul (#1976d2 / #42a5f5)
- **Texto:** Branco/Cinza claro sobre fundo escuro
- **Fontes:** Inter (corpo), Montserrat (títulos)
- **Cards:** border-radius, box-shadow sutil, padding generoso
- **Transições:** ease-in-out suaves em hover

---

## Riscos

| Risco | Mitigação |
|-------|-----------|
| Alterar `js/javascript.js` pode quebrar o login existente | Alteração mínima (apenas trocar URL de destino na linha 19) |
| Novos controllers podem conflitar com `Service.java` | Prefixo `/api/` nos novos endpoints para evitar colisão |
| Tabelas novas no Railway podem falhar | Scripts SQL verificados antes de execução |
| Responsividade diferente do menuPrincipal | Seguir mesmos breakpoints e padrão de @media |

---

## Estratégia de Implementação

### Ordem de execução:

1. **Banco de dados:** Criar tabelas `filiais`, `boxes`, `stretchadeiras` (nesta ordem por FK)
2. **Backend:** Criar controllers com CRUD básico via JdbcTemplate
3. **Frontend:** Criar `painel.html` + `painel.css` + `painel.js`
4. **Integração:** Conectar frontend com backend via fetch
5. **Ajuste de login:** Alterar redirecionamento em `javascript.js`
6. **Teste:** Verificar fluxo completo login → painel → CRUD
7. **Revisão:** Code review e ajustes finais
