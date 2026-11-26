package br.com.jogo21;

public class Cartas {
    Naipe naipe;
    int valor;

    public Cartas(Naipe naipe, int valor) {
        this.naipe = naipe;
        this.valor = valor;
    }

    public int getPontos() {
        if (valor >= 11) return 10;
        if (valor == 1) return 11;
        return valor;
    }

    public String getImagem() {
        return naipe.getNome() + valor + ".png";
    }
}