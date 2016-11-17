var usersList = document.getElementById('usersList');
var nameInput = document.getElementById('nameInput');
var ageInput = document.getElementById('ageInput');
var addButton = document.getElementById('addButton');

addButton.addEventListener('click', function () {
    addUser(nameInput.value, ageInput.value);
});

function addUser (name, age) {
    var data = {
        name: name,
        age: age
    };

    return firebase.database().ref().child('user').push(data);
}

firebase.database().ref('user').on('value', function (snapshot) {
    usersList.innerHTML = '';
    snapshot.forEach(function (item) {
        var row = document.createElement('li');
        row.appendChild(document.createTextNode(item.val().name + ' : ' + item.val().age));
        usersList.appendChild(row);
    })
});