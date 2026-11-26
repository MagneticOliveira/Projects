# Skill: Backend Java

## Tecnologias preferenciais

- Java;
- Spring Boot;
- REST;
- JdbcTemplate quando existente.

## Regras

Antes de alterar código:

- localizar endpoint;
- localizar service;
- localizar consulta;
- localizar chamadas frontend.

Preservar padrões existentes.

## Tratamento de erros

Não esconder exceções.

Erros devem gerar resposta HTTP apropriada.

Não retornar stack trace para usuário final.

## Segurança

Nunca retornar:

- senha;
- hash de senha;
- API key;
- token secreto;
- credenciais.

## Alterações

Preferir alterações pequenas.

Depois da implementação:

- compilar;
- executar testes disponíveis;
- verificar logs;
- validar endpoint.
