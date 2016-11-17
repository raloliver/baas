var uploader = document.getElementById('uploader');
var fileButton = document.getElementById('fileButton');

fileButton.addEventListener('change', function(e){
    var file = e.target.files[0];

    var storageRef = firebase.storage().ref('files/' + file.name);

    var task = storageRef.put(file);

    task.on('state_changed', 
        function progress (snapshot){
            var percent = (snapshot.bytesTransferred / snapshot.totalBytes * 100);
            uploader.value = percent;
        },
        function error (err){
            console.log(err);
        },
        function complete(){
            alert('Arquivo enviado com sucesso.');
        })
});