package br.com.jogo21;

import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class Controller {

    GeradorCartas gerador = new GeradorCartas();
    int totalJogador = 0;
    int totalDealer = 0;
    boolean jogoAtivo = false;

    @PostMapping("/iniciar")
    public Map<String, Object> iniciar() {
        totalJogador = 0;
        totalDealer = 0;
        jogoAtivo = true;
        Map<String, Object> resposta = new HashMap<>();
        resposta.put("totalJogador", 0);
        return resposta;
    }

    @PostMapping("/pedir")
    public Map<String, Object> pedir() {
        Map<String, Object> resposta = new HashMap<>();
        if (!jogoAtivo) {
            resposta.put("mensagem", "F5 para reiniciar o jogo");
            return resposta;
        }

        Cartas carta = gerador.gerar();
        totalJogador += carta.getPontos();
        resposta.put("imagem", carta.getImagem());
        resposta.put("totalJogador", totalJogador);

        if (totalJogador > 21) {
            jogoAtivo = false;
            resposta.put("mensagem", "Passou de 21, você perdeu!!!");
        }

        return resposta;
    }

    @PostMapping("/parar")
    public Map<String, Object> parar() {
        Map<String, Object> resposta = new HashMap<>();
        if (!jogoAtivo) {
            resposta.put("mensagem", "Recarregue a página!");
            return resposta;
        }
        jogoAtivo = false;

        while (totalDealer < 17) {
            Cartas carta = gerador.gerar();
            totalDealer += carta.getPontos();
        }

        resposta.put("totalDealer", totalDealer);

        if (totalDealer > 21) {
            resposta.put("mensagem", "Dealer estourou você venceu!");
        } else if (totalJogador > totalDealer) {
            resposta.put("mensagem", "Você venceu!!! " + totalJogador + " x " + totalDealer);
        } else {
            resposta.put("mensagem", "Você perdeu!!! " + totalDealer + " x " + totalJogador);
        }

        return resposta;
    }
}
