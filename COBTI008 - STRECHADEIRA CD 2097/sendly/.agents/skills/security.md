# Skill: Security

## Regras obrigatórias

Nunca armazenar senha em texto puro.

Utilizar BCrypt para senhas quando compatível com a aplicação.

Nunca colocar secrets no Git.

Nunca colocar:

- API keys;
- passwords;
- tokens privados;
- credenciais;
- chaves privadas

em código-fonte.

Utilizar variáveis de ambiente.

## Recuperação de senha

Tokens devem ser:

- aleatórios;
- difíceis de adivinhar;
- armazenados de forma segura;
- invalidados após utilização;
- possuir expiração quando o sistema exigir.

## Logs

Nunca registrar:

- senha;
- token;
- API key;
- informações secretas.
