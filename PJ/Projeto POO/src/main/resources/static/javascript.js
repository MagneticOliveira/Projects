const totalN1 = document.querySelector("h2");
const section = document.querySelector("section");
const mensagem = document.getElementById("mensagem");
const btnPedir = document.getElementById("pedir");
const btnParar = document.getElementById("parar");

fetch("/api/iniciar", {
 method: "POST"
 });

btnPedir.addEventListener("click", async function() {
    let resposta = await fetch("/api/pedir", {
     method: "POST"
     });
    let data = await resposta.json();

    if (data.imagem) {
        let img = document.createElement("img");
        img.src = "imgs/" + data.imagem;
        section.appendChild(img);
    }
    if (data.totalJogador != null) {
        totalN1.textContent = data.totalJogador;
    }
    if (data.mensagem) {
        mensagem.textContent = data.mensagem;
    }
});

btnParar.addEventListener("click", async function() {
    let resposta = await fetch("/api/parar", {
     method: "POST"
     });
    let data = await resposta.json();

    if (data.mensagem) {
        mensagem.textContent = data.mensagem;
    }
});