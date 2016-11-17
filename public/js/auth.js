var authButton = document.getElementById('authButton');
var createButton = document.getElementById('createButton');
var logoutButton = document.getElementById('logoutButton');
var authGithub = document.getElementById('authGithub');
var authFacebook = document.getElementById('authFacebook');
var authTwitter = document.getElementById('authTwitter');
var authGoogle = document.getElementById('authGoogle');
var authUser = document.getElementById('authUser');

var emailInput = document.getElementById('emailInput');
var passwordInput = document.getElementById('passwordInput');

var message = document.getElementById('message');

createButton.addEventListener('click', function () {
    firebase
        .auth()
        .createUserWithEmailAndPassword(emailInput.value, passwordInput.value)
        .then(function () {
            alert('Bem vindo ' + emailInput.value)
        })
        .catch(function (error) {
            console.error(error.code);
            console.error(error.message);
            alert('Falhar ao realizar o cadastro. Erro no console!!!')
        });
});

authButton.addEventListener('click', function () {
    firebase
        .auth()
        .signInWithEmailAndPassword(emailInput.value, passwordInput.value)
        .then(function (result) {
            console.log(result);
            message.innerText = 'Bem vindo, ' + emailInput.value;
            alert('Autenticado ' + emailInput.value);
        })
        .catch(function (error) {
            console.error(error.code);
            console.error(error.message);
            alert('Falhar ao realizar o login. Erro no console!!!')
        });
});

logoutButton.addEventListener('click', function () {
    firebase
        .auth()
        .signOut()
        .then(function () {
            message.innerText = 'Você acabou de sair. Até mais!';
            alert('Obrigado e volte sempre!');
        }, function (error) {
            console.log(error);
        });
});

authUser.addEventListener('click', function () {
    firebase
        .auth()
        .signInAnonymously()
        .then(function (result) {
            console.log(result);
            message.innerText = 'Bem vindo, desconhecido';
            alert('Autenticado Anonimamente');
        })
        .catch(function (error) {
            console.error(error.code);
            console.error(error.message);
            alert('Falhar ao realizar o login. Erro no console!!!')
        });
});

authGithub.addEventListener('click', function () {
    var provider = new firebase.auth.GithubAuthProvider();
    signIn(provider);
});

authGoogle.addEventListener('click', function () {
    var provider = new firebase.auth.GoogleAuthProvider();
    signIn(provider);
});

authFacebook.addEventListener('click', function () {
    var provider = new firebase.auth.FacebookAuthProvider();
    signIn(provider);
});

authTwitter.addEventListener('click', function () {
    var provider = new firebase.auth.TwitterAuthProvider();
    signIn(provider);
});

function signIn(provider) {
    firebase
        .auth()
        .signInWithPopup(provider) //or signInWithRedirect
        .then(function (result){
            console.log(result);
            var token = result.credential.accessToken;
            message.innerHTML = 'Bem vindo, ' + result.user.displayName;
        })
        .catch(function (error) {
            console.log(error);
            alert('Falha na autenticaçao!!!');
        });
}