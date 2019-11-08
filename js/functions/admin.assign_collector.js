const user = firebase.database().ref('user');
$( document ).ready(function() {
    $("#overlay").show();
    $('#loading').show();

    $('#data2').hide();

    initializeData();
});

let data;
let assignData;
let name;
let nameKey;

function initializeData(){
    user.on('value', data => {
        let arr = [];
        data.forEach(data => {
            if(data.key == firebase.auth().currentUser.uid){
                $('#username').text(data.val().name);
                $("#overlay").hide();
                $('#loading').hide();
            }

            if(data.val().position == "Collector"){
                arr.push({
                    name: data.val().name,
                    middleName: data.val().middleName,
                    lastname: data.val().lastname,
                    address: data.val().address,
                    position: data.val().position,
                    email: data.val().email,
                    key: data.key
                });
            }
        });
        data = arr;
        LoadCurrentReport(data);
    });
}

function LoadCurrentReport(data){
    var oTblReport = $("#tb1").DataTable ({
        "data" : data,
        "columns" : [
            { "data" : "name" },
            { "data" : "middleName" },
            { "data" : "lastname" },
            { "data" : "address" },
            { "data" : "position" },
            { "data" : "email" },
            {
                "data": null,
                "defaultContent": "<button type='button' class='btn''>View Unassigned Client</button>"
            }
        ]
    });

    $('#tb1 tbody').on( 'click', 'button', function () {
        var me = oTblReport.row( $(this).parents('tr') ).data();
        name = me.name;
        nameKey = me.key;
        var approvedTransaction = firebase.database().ref('admin approved loan');
        approvedTransaction.on('value', snapshot => {
            let ATarr = [];
            snapshot.forEach(snapshot => {
                let strDate = snapshot.val().dateApproved;
                let date = strDate.substring(0, 10);
                
                if(snapshot.val().totalLoan > 0){
                    ATarr.push({
                        key: snapshot.key,
                        collector: snapshot.val().collector,
                        LoanKey: snapshot.val().LoanKey,
                        clientName: snapshot.val().clientName,
                        comment: snapshot.val().comment,
                        dateApproved: date,
                        finalLoan: snapshot.val().finalLoan,
                        address: snapshot.val().address,
                        interest: snapshot.val().interest,
                        keyToPush: snapshot.val().keyToPush,
                        managerKey: snapshot.val().managerKey,
                        managerName: snapshot.val().managerName,
                        monthsToPay: snapshot.val().monthsToPay,
                        DailyPayment: snapshot.val().DailyPayment,
                        totalLoan: snapshot.val().totalLoan
                    });
                }
                
            });
            assignData = ATarr
            assignLoanTransaction(assignData);
        });
    });
} 

function assignLoanTransaction(data){
    $('#data2').show();
    $('#data1').hide();
    $("#tb2").dataTable().fnDestroy();
    $("#tb1").dataTable().fnDestroy();
    var oTblReport = $("#tb2").DataTable ({
        "data" : data,
        "columns" : [
            {"data" : "dateApproved" },
            {"data" : "clientName" },
            {"data" : "managerName" },
            {"data" : "monthsToPay" },
            {"data" : "totalLoan" , render: $.fn.dataTable.render.number( ',', '.', 0, '₱ ' ) , className: "text-right"},
            {"data" : "collector" },
            {
                "data": null,
                "defaultContent": "<button type='button' class='btn''>Assign</button>"
            }
        ]
    });

    $('#tb2 tbody').on( 'click', 'button', function () {
        var me = oTblReport.row( $(this).parents('tr') ).data();

        var currentDate = new Date();
        currentDate.setDate(currentDate.getDate() + 1);

        var approvedLoan = firebase.database().ref('admin approved loan/' + me.key);
        approvedLoan.set({
            collector: name,
            collectorKey: nameKey,
            LoanKey: me.LoanKey,
            clientName: me.clientName,
            comment: me.comment,
            finalLoan: me.finalLoan,
            dateApproved: me.dateApproved,
            address: me.address,
            DailyPayment: me.DailyPayment,
            dateToPay: currentDate.toISOString(),
            interest: me.interest,
            keyToPush: me.keyToPush,
            managerKey: me.managerKey,
            managerName: me.managerName,
            monthsToPay: me.monthsToPay,
            totalLoan: me.totalLoan
        }).then(() => {
            location.reload();
        });
    });
}

function backBtn(){
    $("#tb2").dataTable().fnDestroy();
    $('#data2').hide();
    $('#data1').show();
}