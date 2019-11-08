let ref = firebase.database().ref('user');
let clientRef = firebase.database().ref('client');
$( document ).ready(function() {
    $('#loading').hide();
});


function signIn(){
    var pass = $("#pass").val();
    var email = $("#email").val();
    $("#overlay").show();
    $('#loading').show();
    
    firebase.auth().signInWithEmailAndPassword(email, pass).then(data => {
        ref.on('value', data => {
            data.forEach(data => {
                if(data.key == firebase.auth().currentUser.uid){
                    if(data.val().position == "Manager"){
                        location.replace('pages/admin/index.html?param='+data.val().name+'');
                        $("#overlay").hide();
                        $('#loading').hide();
                    }
                    else if(data.val().position == "CI Officer"){
                        location.replace('pages/ci-officer/index.html?param='+data.val().name+'');
                        $("#overlay").hide();
                        $('#loading').hide();
                    }
                    else if(data.val().position == "Treasurer"){
                        location.replace('pages/treasurer/index.html?param='+data.val().name+'');
                        $("#overlay").hide();
                        $('#loading').hide();
                    }
                    else if(data.val().position == "Collector"){
                        location.replace('pages/collector/index.html?param='+data.val().name+'');
                        $("#overlay").hide();
                        $('#loading').hide();
                    }
                    
                }
            });

            clientRef.on('value', data2 => {
                data2.forEach(data2 => {
                    if(data2.key == firebase.auth().currentUser.uid){ 
                        location.replace('pages/client/index.html?param='+data2.val().Name+'');
                        $("#overlay").hide();
                        $('#loading').hide();
                    }
                });
            });
        });
    }).catch(function(error) {
        
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorMessage);
        $("#overlay").hide();
        $('#loading').hide();
    });
}

function signUp(){
  let Name = $('#Name').val();
  let Middlename = $('#Middlename').val();
  let Lastname = $('#Lastname').val();
  let Birthdate = $('#Birthdate').val();
  let Gender = $('#Gender').val();
  let Address = $('#Address').val();
  let Email = $('#Email').val();
  let pass = $('#pass').val();
  let conPass = $('#conPass').val();

  if(pass != conPass){
    alert("Password dont Match");
    }
    else if(Name == "" || Middlename == "" || Lastname == "" || Birthdate == "" || Gender == "" || Address == "" || Email == "" || pass == "" || conPass == ""){
        alert("Please fill out all the forms");
    }
    else{
        firebase.auth().createUserWithEmailAndPassword(Email, pass).then(data => {
            let ref = firebase.database().ref('client/' + data.user.uid);
            ref.set({
                Name: Name,
                Middlename: Middlename,
                Lastname: Lastname,
                Birthdate: Birthdate,
                Gender: Gender,
                Address: Address,
                Email: Email
            }).then(() => {
                location.replace('../index.html');
            });
        }).catch(function(error) {
            var errorMessage = error.message;
            alert(errorMessage);
        });
    }
}