const usuarioId = sessionStorage.getItem('usuarioId');//Recebe o Cookie
const name = document.querySelector('#name');
const endereco = document.querySelector('#endereco');
const iconPerfil = document.querySelector('#iconPerfil');
const entregasAtivas = document.querySelector('#entregasAtivas');
const statusPedido = document.querySelector('#statusPedido');
const statusTempo = document.querySelector('#statusTempo');
const statusEndereco = document.querySelector('#statusEndereco');
const statusEntregador = document.querySelector('#statusEntregador');

//Deslogando, será necessário carregar isto:
//sessionStorage.removeItem('usuarioId');
//window.location.href = './login.html';

//Apagar todos os cookies: sessionStorage.clear();

async function a(){ 
let data = await fetch(
    `https://pwjob-production-1606.up.railway.app/cadastro?id=${usuarioId}`
);

data = await data.json();

console.log(data);

name.innerHTML = 1;
endereco.innerHTML = 1;
entregasAtivas.innerHTML = 1;
statusPedido.innerHTML = 1;
statusTempo.innerHTML = 1;
statusEndereco.innerHTML = 1;
statusEntregador.innerHTML = 1;
//iconPerfil?
};

a();
