---
description: Inicia o ciclo completo de desenvolvimento multiagente
---

# /startcycle

Executar o ciclo completo de desenvolvimento.

## ETAPA 1 - ANÁLISE

Atue como Product Manager / Analista.

Leia o requisito fornecido pelo usuário.

Analise o workspace.

Não altere código ainda.

Produza:

`docs/requirements.md`

O documento deve conter:

- objetivo;
- fluxo;
- regras;
- critérios de aceite;
- arquivos envolvidos;
- pendências.

---

## ETAPA 2 - ARQUITETURA

Atue como Arquiteto / Tech Lead.

Leia:

- `agents.md`
- `docs/requirements.md`
- `skills/architecture.md`

Analise o projeto existente.

Produza:

`docs/architecture.md`

Defina:

- fluxo frontend → backend → banco;
- arquivos que serão alterados;
- arquivos que serão criados;
- riscos;
- estratégia de implementação.

Não implemente ainda.

---

## ETAPA 3 - IMPLEMENTAÇÃO

Escolha os agentes necessários.

Utilize as skills correspondentes.

Backend:

`skills/backend-java.md`

Frontend:

`skills/frontend.md`

Banco:

`skills/oracle-sql.md`

Segurança:

`skills/security.md`

Implemente somente o necessário.

Não reescreva código que não esteja relacionado ao requisito.

---

## ETAPA 4 - TESTES

Atue como QA.

Leia:

`skills/testing.md`

Execute os testes possíveis.

Crie:

`docs/test-plan.md`

Registrar:

- teste;
- entrada;
- resultado esperado;
- resultado obtido;
- status.

Se houver erro:

NÃO avançar para revisão.

Voltar para implementação.

Corrigir.

Testar novamente.

---

## ETAPA 5 - CODE REVIEW

Atue como Code Reviewer.

Leia:

`skills/code-review.md`

Revise as alterações.

Procure principalmente:

- bugs;
- regressões;
- SQL incorreto;
- problemas de segurança;
- tratamento de erros;
- duplicação;
- problemas de responsividade.

Se houver problemas críticos ou altos:

voltar para implementação.

Se não houver:

avançar.

---

## ETAPA 6 - DOCUMENTAÇÃO

Atualizar:

`docs/implementation.md`

Registrar:

- o que foi implementado;
- arquivos modificados;
- decisões importantes;
- endpoints;
- consultas;
- dependências;
- limitações.

---

## ETAPA 7 - DEPLOY

Atue como DevOps.

Leia:

`skills/deployment.md`

Verifique se o projeto está pronto para deploy.

Não realizar deploy destrutivo.

Não alterar produção sem autorização explícita quando houver risco.

Se o ambiente permitir deploy seguro e o usuário tiver solicitado o ciclo completo, realizar o deploy.

Depois verificar a aplicação.

---

# REGRA DE LOOP

O ciclo NÃO é linear obrigatoriamente.

Pode ocorrer:

ANÁLISE
↓
ARQUITETURA
↓
IMPLEMENTAÇÃO
↓
TESTE
↓
ERRO
↓
IMPLEMENTAÇÃO
↓
TESTE
↓
REVISÃO
↓
PROBLEMA
↓
IMPLEMENTAÇÃO
↓
TESTE
↓
REVISÃO
↓
CONCLUSÃO

Continuar até que os critérios de aceite sejam atendidos.

---

# REGRA DE INTERVENÇÃO DO USUÁRIO

Se o usuário editar:

- `docs/requirements.md`
- `docs/architecture.md`
- `docs/test-plan.md`
- qualquer outro artefato Markdown

antes da conclusão:

1. reler o arquivo;
2. identificar mudanças;
3. atualizar o plano;
4. respeitar as alterações do usuário.

Nunca sobrescrever uma decisão feita manualmente pelo usuário.

---

# REGRA FINAL

Ao concluir, apresentar:

## Implementado

Lista objetiva.

## Arquivos alterados

Lista objetiva.

## Testes

Informar exatamente quais foram executados.

## Deploy

Informar se foi realizado ou não.

## Pendências

Informar somente o que realmente ficou pendente.

Nunca declarar "funcionando" sem validação.
