const APIURL = 'https://api.github.com/users/'

const main = document.querySelector('#main');
const form = document.querySelector('#form');
const search = document.querySelector('#search');

form.addEventListener('submit', e => {
    e.preventDefault();
    const user = search.value;
    if (user) {
        getUsre(user);
        search.value = '';
    };
});
getUsre('Abdullo92');

//for getting info about person like name, bio, img.
async function getUsre(username) {
    const respo = await fetch(APIURL + username);
    const respoData = await respo.json();

    createUserData(respoData);
    getRepos(username);
}

//for getting repositories
async function getRepos(username) {
    const respo = await fetch(APIURL + username + '/repos');
    const respoData = await respo.json();

    addReposToCard(respoData);
}

function createUserData(user) {
    const cardHTML = `
    <div class="card">
        <div>
            <img class="avatar" src="${user.avatar_url}"  alt="${user.name}" />
        </div>
        <div class="user_info">
            <h2>${user.name}</h2>
            <p>${user.bio}</p>
            <ul class="info">
                <li>${user.followers}<strong>Followers</strong></li>
                <li>${user.following}<strong>Following</strong></li>
                <li>${user.public_repos}<strong>Repos</strong></li>
            </ul>
         
            <!--Tag div for repositories-->
            <div id="repos"></div>
        </div>
    </div>  
    `;

    main.innerHTML = cardHTML;
};

function addReposToCard(repos) {
    const reposElm = document.querySelector('#repos');
    //Method sort and slice -->> sorting and showing 10 repos that has more stars at the first...
    repos.sort((a, b) => b.stargazers_count - a.stargazers_count)
         .slice(0,10).forEach(repo => {
        //create a link tag
        const repoElm = document.createElement('a');
        repoElm.classList.add('repo');
        repoElm.href = repo.html_url;
        reposElm.target = "_blanck";
        repoElm.innerText = repo.name;
        
        reposElm.appendChild(repoElm);
    });
}

// form.addEventListener('submit', e => {
//     e.preventDefault();
//     const user = search.value;
//     if (user) {
//         getUsre(user);
//         search.value = '';
//     };
// });