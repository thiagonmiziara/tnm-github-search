(function() {

    const search = document.querySelector('#search');
    const btnPesquisar = document.querySelector('.btn-pesquisar');
    const profile = document.querySelector('#profile');
    const url = "https://api.github.com/users";
    const clientId = "Iv1.605aa82ec869c550";
    const clientSecret = "41ce6590beedb5c0b01b4b0157faf52809858b37";
    const count = 7;
    const sort = "creatd: asc"

    async function getUser(user) {
        try {
            const profileResponse = await fetch(`${url}/${user}?clientI_id=${clientId}&client_secret=${clientSecret}`);
            const repositorioResponse = await fetch(`${url}/${user}/repos?per_page=${count}&${sort}&clientI_id=${clientId}&client_secret=${clientSecret}`);

            const profile = await (await profileResponse.json());
            const repositorios = await (await repositorioResponse.json());

            return { profile, repositorios };
        } catch (erro) {
            console.log(erro)
        }
    }


    function showProfile(user) {
        profile.innerHTML = `
         <div class="container">
        <div class="col">
            <div class="card">
                <img src="${user.avatar_url}" class="card-img">
                <ul class="list-goup">
                    <li class="list-goup-item">Repositórios:<span>${user.public_repos}</span></li>
                    <li class="list-goup-item">Seguidores:<span>${user.followers}</span></li>
                    <li class="list-goup-item">Seguindo:<span>${user.following}</span></li>
                </ul>
                <div class="card-body">
                    <a href="${user.html_url}" target="_blank" class="btn"> Ver perfil</a>
                </div>
            </div>
        </div>
        <div class="repositorio">
            <div id="repos"></div>
        </div>
    </div>`;
    }


    function showRepositorio(repos) {

        let output = " ";
        repos.forEach(repo => {
            output += `
            <div class="card">
           <div class="row">
               <div class="col">
                   <a href="${repo.html_url}" target="_blanck">${repo.name}</a>
               </div>
   
               <div class="container">
                   <span class="stars">Stars: ${repo.stargazers_count}</span>
                   <span class="watch">Watch: ${repo.watchers_count}</span>
                   <span class="forks">Forks: ${repo.forks_count}</span>
               </div>
           </div>
       </div>`
        });
        document.querySelector('#repos').innerHTML = output;
    }

    btnPesquisar.addEventListener('click', (element) => {
        element = search.value;

        getUser(element).then(response => {
            showProfile(response.profile);
            showRepositorio(response.repositorios);
        });
    });

})();