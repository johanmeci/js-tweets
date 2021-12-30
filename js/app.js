//Variables
const form = document.querySelector('#formulario');
const listTweets = document.querySelector('#lista-tweets');
let arrayTweets = [];

//Event Listeners
eventListeners();

function eventListeners() {

    //Cuando el usuario agrega un nuevo tweet
    form.addEventListener('submit', addTweet);

    //Cuando el document esta listo
    document.addEventListener('DOMContentLoaded', () => {
        arrayTweets = JSON.parse(localStorage.getItem('tweets')) || [];
        createHTML();
    });
}

//Functions
function addTweet(e) {
    e.preventDefault();

    //Textarea
    const tweet = document.querySelector('#tweet').value;

    if (tweet === '') {
        showError('El mensaje no puede ir vacío');

        return; //Evita que se ejecuten más lineas de código
    }

    const tweetObj = {
        id: Date.now(),
        tweet
    }

    arrayTweets = [...arrayTweets, tweetObj];

    createHTML();

    form.reset();
}

function showError(error) {
    const msgError = document.createElement('p');
    msgError.textContent = error;
    msgError.classList.add('error');

    const content = document.querySelector('#contenido');
    content.appendChild(msgError);

    setTimeout(() => {
        msgError.remove();
    }, 3000);
}

function createHTML() {

    cleanHTML();

    if (arrayTweets.length > 0) {

        arrayTweets.forEach(tw => {

            const { tweet, id } = tw;
            const txtDate = new Date(id);

            const btnDelete = document.createElement('a');
            btnDelete.classList.add('borrar-tweet');
            btnDelete.innerHTML = `<span class='material-icon material-icons-outlined'>close</span>`;

            //Add function delete
            btnDelete.onclick = () => {
                deleteTweet(id);
            }

            const li = document.createElement('li');
            li.innerHTML = `
            <p class='username'>
                <span class='span-name'>Jon Smith</span>
                <span class="material-icon material-icons-outlined">verified</span>
                <span class='span-user'>@jonsmith</span>
            </p>
            <p class='tweet'>${tweet}</p>
            <span class='span-date'>
                <span class='material-icon material-icons-outlined'>schedule</span>
                ${txtDate.toLocaleDateString()}
            </span>`;
            li.appendChild(btnDelete);

            listTweets.appendChild(li);

        });
    }

    sincronizarStorage();

}

function sincronizarStorage() {
    localStorage.setItem('tweets', JSON.stringify(arrayTweets));
    // console.log(arrayTweets);
}

function deleteTweet(id) {
    arrayTweets = arrayTweets.filter( tweet => tweet.id !== id );
    createHTML();
}

function cleanHTML() {
    while (listTweets.firstChild) {
        listTweets.removeChild(listTweets.firstChild);
    }
}