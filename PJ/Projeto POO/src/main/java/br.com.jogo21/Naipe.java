package br.com.jogo21;

public enum Naipe {

    OUROS("Ouros"),
    PAUS("Paus"),
    COPAS("Copas"),
    ESPADAS("Espadas");

    private final String nome;

    Naipe(String nome) {
        this.nome = nome;
    }

    public String getNome() {
        return nome;
    }
}
