
const usuarioId = sessionStorage.getItem('usuarioId');//Recebe o Cookie
const name = document.querySelector('#name');
const endereco = document.querySelector('#endereco');
const iconPerfil = document.querySelector('#iconPerfil');
const entregasAtivas = document.querySelector('#entregasAtivas');
const statusPedido = document.querySelector('#statusPedido');
const statusTempo = document.querySelector('#statusTempo');
const statusDSM = document.querySelector('#statusDSM');
const statusEndereco = document.querySelector('#statusEndereco');
const statusEntregador = document.querySelector('#statusEntregador');


//ADICIONAR ESTES da telaInicial
const totalEntregas = document.querySelector('#totalEntregas');
const totalEntregasRealizadas = document.querySelector('#totalEntregasRealizadas');
const totalEntregasSolicitadas = document.querySelector('#totalEntregasSolicitadas');

//Todo este registro de HTML em variáveis abaixo morre ao trocar o main, por conta da cascata
//Por isso o Event Listener é no main com condição para os filhos e não neles, além de buscar por id e não referência
const body = document.querySelector('body');//Únicos vivos
const main = document.querySelector('main');//Únicos vivos
const buttonsRealizarEntrega = document.querySelector("#realizarEntrega");
const buttonsRastrearPedido = document.querySelector("#rastrearPedido");
const buttonsTrabalheConosco = document.querySelector("#trabalheConosco");
const buttonsSelecionarServico = document.querySelector("#selecionarServicoButton")

//Deslogando, será necessário carregar isto:
//sessionStorage.removeItem('usuarioId');
//window.location.href = './login.html';

//Apagar todos os cookies: sessionStorage.clear();

async function menuInfo(){ 
const usuarioId = sessionStorage.getItem('usuarioId');//Recebe o Cookie
let data = await fetch(
    `https://sendly-production-8595bcd5.up.railway.app/cadastro?id=${usuarioId}`
);

data = await data.json();

name.innerHTML = data.name;
endereco.innerHTML = data.endereco;
entregasAtivas.innerHTML = data.entregasAtivas;
statusPedido.innerHTML = data.statusEntregaRecente;
statusTempo.innerHTML = data.estimativaER;
statusEndereco.innerHTML = 'Av.Paulo Guilguer Reimberg';
statusEntregador.innerHTML = 'Jorge Tomato Silva';
//iconPerfil?
};

body.addEventListener(`click`, function(click){
    const button = click.target.closest("button");

    if(button || body.contains(button)){
        setup(button);
    }
});

function setup(button){
    switch(button.id){
        case "realizarEntrega":buttonsRealizarEntregaPage();
        break;
        case "selecionarServicoButton":buttonsSelecionarServicoPage();
        break;
        case "trabalheConosco":allButtonsToContact();
        break;
        case "rastrearPedido":rastrearPedido();
        break;
        default: return;
    };
}

async function allButtonsToContact(){ 
    window.location.href = `./contact.html`;
}

async function rastrearPedido(){
    main.innerHTML = ` `;
    window.location.href = `./menuprincipal.html`;
    alert("Indisponível no momento");
}

async function buttonsRealizarEntregaPage(){ 
    main.id = "mainPosHero";
    main.innerHTML = `
        <section class="noCelular">
            <h1>Favor selecionar a opção desejante</h1>
            <p>Caso sua intenção seja solicitar uma entrega aperte em "SOLICITAR SERVIÇO", 
            agora para trabalhar como entregador de algum pacote aperte em "SELECIONAR SERVIÇO".</p>
            <div id="boxDaImgHero2PosHero1">
                <img id="imgHero2PosHero1" src="./imgs/icon_box.png" alt="">
            </div>
            
        </section>
        <section class="boxHero section">
                <div id="buttonsHero">
                    <button id="realizarEntrega">Solicitar Serviço</button>
                    <button id="selecionarServicoButton">Selecionar Serviço</button>
                </div>
        </section>
    `;
}

async function buttonsSelecionarServicoPage(){
    main.innerHTML = `
        <section id="recycleView">
            <h2 class="noCelular">Escolha um serviço</h2>
            <p id="pPrincipal" class="noCelular">Catálogo de serviços em aberto da sendly</p>
            <div class="boxSendly"><!-- SUBSTITUIR OS &nbsp -->
                <!-- <img src="https://s2.glbimg.com/5wDBE-1nvTvhfwRDNP3vmJExWAM=/e.glbimg.com/og/ed/f/original/2020/11/20/televisao-como-e-quando-foi-criado-o-objeto-cotidiano-3.jpg"
                    alt=""> -->
                <div>
                    <h1>Televisão</h1>
                    <p>Quero que a pessoa tenha um carro, ou irei cancelar!!!</p><br>

                    <div>
                        <p>VALOR A RECEBER:&nbsp<p>
                        <p id="valorP">R$13,00</p>
                    </div>
                    <div>
                        <p>KM TOTAIS:&nbsp</p>
                        <p id="kmTotalP">3km</p>
                    </div>
                    <div>
                        <p>RETIRADA:&nbsp</p>
                        <p id="retiradaP">Av. Paulo Guilguer Reimberg, 11000</p>
                    </div>
                    <div>
                        <p>ENTREGA:&nbsp</p>
                        <p id="entregaP">Av. Paulo Guilguer Reimberg, 11155</p>
                    </div><br>
                    <div>
                        <p>TIPO:&nbsp</p>
                        <p id="tipoP">Frágil</p>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
                        <p>A:&nbsp
                            <p id="dimensoesAlturaP">30cm</p>
                        </p>&nbsp&nbsp
                        <p>L:&nbsp
                            <p id="dimensoesLarguraP">5cm</p>
                        </p>&nbsp&nbsp
                        <p></p>
                        <p>C:&nbsp 
                            <p id="dimensoesComprimentoP">3cm</p>
                        </p>
                    </div>
                </div>
            </div>
            <div class="boxSendly"><!-- SUBSTITUIR OS &nbsp -->
                <!-- <img src="https://s2.glbimg.com/5wDBE-1nvTvhfwRDNP3vmJExWAM=/e.glbimg.com/og/ed/f/original/2020/11/20/televisao-como-e-quando-foi-criado-o-objeto-cotidiano-3.jpg"
                    alt=""> -->
                <div>
                    <h1>Televisão</h1>
                    <p>Quero que a pessoa tenha um carro, ou irei cancelar!!!</p><br>

                    <div>
                        <p>VALOR A RECEBER:&nbsp<p>
                        <p id="valorP">R$13,00</p>
                    </div>
                    <div>
                        <p>KM TOTAIS:&nbsp</p>
                        <p id="kmTotalP">3km</p>
                    </div>
                    <div>
                        <p>RETIRADA:&nbsp</p>
                        <p id="retiradaP">Av. Paulo Guilguer Reimberg, 11000</p>
                    </div>
                    <div>
                        <p>ENTREGA:&nbsp</p>
                        <p id="entregaP">Av. Paulo Guilguer Reimberg, 11155</p>
                    </div><br>
                    <div>
                        <p>TIPO:&nbsp</p>
                        <p id="tipoP">Frágil</p>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
                        <p>A:&nbsp
                            <p id="dimensoesAlturaP">30cm</p>
                        </p>&nbsp&nbsp
                        <p>L:&nbsp
                            <p id="dimensoesLarguraP">5cm</p>
                        </p>&nbsp&nbsp
                        <p></p>
                        <p>C:&nbsp 
                            <p id="dimensoesComprimentoP">3cm</p>
                        </p>
                    </div>
                </div>
            </div>
            <div class="boxSendly"><!-- SUBSTITUIR OS &nbsp -->
                <!-- <img src="https://s2.glbimg.com/5wDBE-1nvTvhfwRDNP3vmJExWAM=/e.glbimg.com/og/ed/f/original/2020/11/20/televisao-como-e-quando-foi-criado-o-objeto-cotidiano-3.jpg"
                    alt=""> -->
                <div>
                    <h1>Televisão</h1>
                    <p>Quero que a pessoa tenha um carro, ou irei cancelar!!!</p><br>

                    <div>
                        <p>VALOR A RECEBER:&nbsp<p>
                        <p id="valorP">R$13,00</p>
                    </div>
                    <div>
                        <p>KM TOTAIS:&nbsp</p>
                        <p id="kmTotalP">3km</p>
                    </div>
                    <div>
                        <p>RETIRADA:&nbsp</p>
                        <p id="retiradaP">Av. Paulo Guilguer Reimberg, 11000</p>
                    </div>
                    <div>
                        <p>ENTREGA:&nbsp</p>
                        <p id="entregaP">Av. Paulo Guilguer Reimberg, 11155</p>
                    </div><br>
                    <div>
                        <p>TIPO:&nbsp</p>
                        <p id="tipoP">Frágil</p>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
                        <p>A:&nbsp
                            <p id="dimensoesAlturaP">30cm</p>
                        </p>&nbsp&nbsp
                        <p>L:&nbsp
                            <p id="dimensoesLarguraP">5cm</p>
                        </p>&nbsp&nbsp
                        <p></p>
                        <p>C:&nbsp 
                            <p id="dimensoesComprimentoP">3cm</p>
                        </p>
                    </div>
                </div>
            </div>
            <div class="boxSendly"><!-- SUBSTITUIR OS &nbsp -->
                <!-- <img src="https://s2.glbimg.com/5wDBE-1nvTvhfwRDNP3vmJExWAM=/e.glbimg.com/og/ed/f/original/2020/11/20/televisao-como-e-quando-foi-criado-o-objeto-cotidiano-3.jpg"
                    alt=""> -->
                <div>
                    <h1>Televisão</h1>
                    <p>Quero que a pessoa tenha um carro, ou irei cancelar!!!</p><br>

                    <div>
                        <p>VALOR A RECEBER:&nbsp<p>
                        <p id="valorP">R$13,00</p>
                    </div>
                    <div>
                        <p>KM TOTAIS:&nbsp</p>
                        <p id="kmTotalP">3km</p>
                    </div>
                    <div>
                        <p>RETIRADA:&nbsp</p>
                        <p id="retiradaP">Av. Paulo Guilguer Reimberg, 11000</p>
                    </div>
                    <div>
                        <p>ENTREGA:&nbsp</p>
                        <p id="entregaP">Av. Paulo Guilguer Reimberg, 11155</p>
                    </div><br>
                    <div>
                        <p>TIPO:&nbsp</p>
                        <p id="tipoP">Frágil</p>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
                        <p>A:&nbsp
                            <p id="dimensoesAlturaP">30cm</p>
                        </p>&nbsp&nbsp
                        <p>L:&nbsp
                            <p id="dimensoesLarguraP">5cm</p>
                        </p>&nbsp&nbsp
                        <p></p>
                        <p>C:&nbsp 
                            <p id="dimensoesComprimentoP">3cm</p>
                        </p>
                    </div>
                </div>
            </div>
            <div class="boxSendly"><!-- SUBSTITUIR OS &nbsp -->
                <!-- <img src="https://s2.glbimg.com/5wDBE-1nvTvhfwRDNP3vmJExWAM=/e.glbimg.com/og/ed/f/original/2020/11/20/televisao-como-e-quando-foi-criado-o-objeto-cotidiano-3.jpg"
                    alt=""> -->
                <div>
                    <h1>Televisão</h1>
                    <p>Quero que a pessoa tenha um carro, ou irei cancelar!!!</p><br>

                    <div>
                        <p>VALOR A RECEBER:&nbsp<p>
                        <p id="valorP">R$13,00</p>
                    </div>
                    <div>
                        <p>KM TOTAIS:&nbsp</p>
                        <p id="kmTotalP">3km</p>
                    </div>
                    <div>
                        <p>RETIRADA:&nbsp</p>
                        <p id="retiradaP">Av. Paulo Guilguer Reimberg, 11000</p>
                    </div>
                    <div>
                        <p>ENTREGA:&nbsp</p>
                        <p id="entregaP">Av. Paulo Guilguer Reimberg, 11155</p>
                    </div><br>
                    <div>
                        <p>TIPO:&nbsp</p>
                        <p id="tipoP">Frágil</p>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
                        <p>A:&nbsp
                            <p id="dimensoesAlturaP">30cm</p>
                        </p>&nbsp&nbsp
                        <p>L:&nbsp
                            <p id="dimensoesLarguraP">5cm</p>
                        </p>&nbsp&nbsp
                        <p></p>
                        <p>C:&nbsp 
                            <p id="dimensoesComprimentoP">3cm</p>
                        </p>
                    </div>
                </div>
            </div>
            <div class="boxSendly"><!-- SUBSTITUIR OS &nbsp -->
                <!-- <img src="https://s2.glbimg.com/5wDBE-1nvTvhfwRDNP3vmJExWAM=/e.glbimg.com/og/ed/f/original/2020/11/20/televisao-como-e-quando-foi-criado-o-objeto-cotidiano-3.jpg"
                    alt=""> -->
                <div>
                    <h1>Televisão</h1>
                    <p>Quero que a pessoa tenha um carro, ou irei cancelar!!!</p><br>

                    <div>
                        <p>VALOR A RECEBER:&nbsp<p>
                        <p id="valorP">R$13,00</p>
                    </div>
                    <div>
                        <p>KM TOTAIS:&nbsp</p>
                        <p id="kmTotalP">3km</p>
                    </div>
                    <div>
                        <p>RETIRADA:&nbsp</p>
                        <p id="retiradaP">Av. Paulo Guilguer Reimberg, 11000</p>
                    </div>
                    <div>
                        <p>ENTREGA:&nbsp</p>
                        <p id="entregaP">Av. Paulo Guilguer Reimberg, 11155</p>
                    </div><br>
                    <div>
                        <p>TIPO:&nbsp</p>
                        <p id="tipoP">Frágil</p>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
                        <p>A:&nbsp
                            <p id="dimensoesAlturaP">30cm</p>
                        </p>&nbsp&nbsp
                        <p>L:&nbsp
                            <p id="dimensoesLarguraP">5cm</p>
                        </p>&nbsp&nbsp
                        <p></p>
                        <p>C:&nbsp 
                            <p id="dimensoesComprimentoP">3cm</p>
                        </p>
                    </div>
                </div>
            </div>
            <div class="boxSendly"><!-- SUBSTITUIR OS &nbsp -->
                <!-- <img src="https://s2.glbimg.com/5wDBE-1nvTvhfwRDNP3vmJExWAM=/e.glbimg.com/og/ed/f/original/2020/11/20/televisao-como-e-quando-foi-criado-o-objeto-cotidiano-3.jpg"
                    alt=""> -->
                <div>
                    <h1>Televisão</h1>
                    <p>Quero que a pessoa tenha um carro, ou irei cancelar!!!</p><br>

                    <div>
                        <p>VALOR A RECEBER:&nbsp<p>
                        <p id="valorP">R$13,00</p>
                    </div>
                    <div>
                        <p>KM TOTAIS:&nbsp</p>
                        <p id="kmTotalP">3km</p>
                    </div>
                    <div>
                        <p>RETIRADA:&nbsp</p>
                        <p id="retiradaP">Av. Paulo Guilguer Reimberg, 11000</p>
                    </div>
                    <div>
                        <p>ENTREGA:&nbsp</p>
                        <p id="entregaP">Av. Paulo Guilguer Reimberg, 11155</p>
                    </div><br>
                    <div>
                        <p>TIPO:&nbsp</p>
                        <p id="tipoP">Frágil</p>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
                        <p>A:&nbsp
                            <p id="dimensoesAlturaP">30cm</p>
                        </p>&nbsp&nbsp
                        <p>L:&nbsp
                            <p id="dimensoesLarguraP">5cm</p>
                        </p>&nbsp&nbsp
                        <p></p>
                        <p>C:&nbsp 
                            <p id="dimensoesComprimentoP">3cm</p>
                        </p>
                    </div>
                </div>
            </div>
            <div class="boxSendly"><!-- SUBSTITUIR OS &nbsp -->
                <!-- <img src="https://s2.glbimg.com/5wDBE-1nvTvhfwRDNP3vmJExWAM=/e.glbimg.com/og/ed/f/original/2020/11/20/televisao-como-e-quando-foi-criado-o-objeto-cotidiano-3.jpg"
                    alt=""> -->
                <div>
                    <h1>Televisão</h1>
                    <p>Quero que a pessoa tenha um carro, ou irei cancelar!!!</p><br>

                    <div>
                        <p>VALOR A RECEBER:&nbsp<p>
                        <p id="valorP">R$13,00</p>
                    </div>
                    <div>
                        <p>KM TOTAIS:&nbsp</p>
                        <p id="kmTotalP">3km</p>
                    </div>
                    <div>
                        <p>RETIRADA:&nbsp</p>
                        <p id="retiradaP">Av. Paulo Guilguer Reimberg, 11000</p>
                    </div>
                    <div>
                        <p>ENTREGA:&nbsp</p>
                        <p id="entregaP">Av. Paulo Guilguer Reimberg, 11155</p>
                    </div><br>
                    <div>
                        <p>TIPO:&nbsp</p>
                        <p id="tipoP">Frágil</p>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
                        <p>A:&nbsp
                            <p id="dimensoesAlturaP">30cm</p>
                        </p>&nbsp&nbsp
                        <p>L:&nbsp
                            <p id="dimensoesLarguraP">5cm</p>
                        </p>&nbsp&nbsp
                        <p></p>
                        <p>C:&nbsp 
                            <p id="dimensoesComprimentoP">3cm</p>
                        </p>
                    </div>
                </div>
            </div>
        </section>

        <section id="sectionTrabalheConosco">
            <h3 class="noCelular">Estamos a procura de advogados, publicitários, financeiro e TI em sistemas.</h3>
            <button id="trabalheConosco">Trabalhe Conosco</button>
        </section>
    `;
};
/*
buttonsRastrearPedido.
buttonsTravalheConosco.
*/
menuInfo();
setInterval(menuInfo, 180000);