const form = document.querySelector('form');
const p = document.querySelectorAll('p');
const bodyH = document.querySelector('body');
const header = document.querySelector('header');

form.addEventListener('submit', async (e) => {
    
  
    const dados = new FormData(form);

    let data = await fetch('https://pwjob-production-1606.up.railway.app/cadastroNew',{method: 'POST', body: dados});
    data = await data.json();
});

