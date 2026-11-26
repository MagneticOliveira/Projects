# Skill: Deployment

## Objetivo

Preparar a aplicação para execução em produção.

## Processo

1. verificar build;
2. verificar variáveis de ambiente;
3. verificar portas;
4. verificar URLs;
5. verificar CORS;
6. verificar banco;
7. verificar logs;
8. executar deploy quando autorizado.

## Regras

Nunca inventar:

- URL;
- variável;
- credencial.

Não expor secrets.

Se o deploy não puder ser executado, produzir instruções claras.

## Pós-deploy

Verificar:

- aplicação iniciou;
- endpoint principal responde;
- frontend acessa backend;
- banco conecta;
- logs não apresentam erro crítico.
