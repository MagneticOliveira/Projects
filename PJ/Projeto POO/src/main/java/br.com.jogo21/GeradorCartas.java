package br.com.jogo21;

import java.util.Random;

public class GeradorCartas {
    Random random = new Random();

    public Cartas gerar() {
        Naipe[] naipes = Naipe.values();
        Naipe naipe = naipes[random.nextInt(4)];
        int valor = random.nextInt(13) + 1;
        return new Cartas(naipe, valor);
    }
}