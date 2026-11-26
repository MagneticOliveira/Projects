# Skill: Oracle SQL

## REGRA PRINCIPAL

Utilizar sintaxe MySQL.

## Processo

Antes de modificar uma query:

1. identificar tabelas;
2. identificar chaves;
3. identificar relacionamentos;
4. verificar cardinalidade;
5. verificar filtros;
6. verificar duplicações;
7. verificar NULL;
8. verificar desempenho.

## Funções

Ainda assim conhecer e utilizar adequadamente nos projetos que contenham:

- SYSDATE;
- TRUNC;
- TO_CHAR;
- TO_DATE;
- NVL;
- COALESCE;
- CASE;
- DECODE;
- EXISTS;
- IN;
- JOIN;
- GROUP BY;
- HAVING;
- ORDER BY.

## Duplicação

Quando o requisito exigir um registro por entidade, validar se os JOINs não produzem múltiplas linhas.

## Explicação

Para consultas complexas, explicar:

- o que cada CTE faz;
- o que cada JOIN faz;
- quais filtros são aplicados;
- qual resultado final é produzido.

Nunca alterar uma query sem compreender sua lógica.
