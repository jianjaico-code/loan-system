const user = firebase.database().ref('user');
let data;

$( document ).ready(function() {
    $("#overlay").show();
    $('#loading').show();

    initializeData();
});


function initializeData(){
    user.on('value', data => {
        data.forEach(data => {
            if(data.key == firebase.auth().currentUser.uid){
                $("#overlay").hide();
                $('#loading').hide();

                let ref = firebase.database().ref('user');
                ref.on('value', data => {
                let arr = [];
                data.forEach(data => {
                
                    arr.push({
                    name: data.val().name,
                    middleName: data.val().middleName,
                    lastname: data.val().lastname,
                    address: data.val().address,
                    position: data.val().position,
                    email: data.val().email,
                     key: user.key
                    });
                });
                data = arr;
                LoadUserReport(data);
                console.log(ref);

                });
            }
        });
    });
}

function LoadUserReport(data){
    var oTblReport = $("#tb1");
 
    oTblReport.DataTable ({
        "data" : data,
        "columns" : [
            { "data" : "name" },
            { "data" : "middleName" },
            { "data" : "lastname" },
            { "data" : "address" },
            { "data" : "email" },
            { "data" : "position" }
        ]
    });
}