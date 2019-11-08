

const user = firebase.database().ref('user');
let myData;
$( document ).ready(function() {
    $("#overlay").show();
    $('#loading').show();

    $('#data').hide();

    initializeData();
});


function initializeData(){
    user.on('value', data => {
        data.forEach(data => {
            if(data.key == firebase.auth().currentUser.uid){
                managerKey = data.key;
                managerName = data.val().name;
                $('#username').text(data.val().name);
                $("#overlay").hide();
                $('#loading').hide();
                
                let ref = firebase.database().ref('admin approved loan');
                ref.on('value', data => {
                let arr = [];
                data.forEach(data => {
                    let strDate = data.val().dateApproved;
                    let date = strDate.substring(0, 10);
                
                    arr.push({
                        clientName: data.val().clientName,
                        totalLoan: data.val().totalLoan,
                        finalLoan: data.val().finalLoan,
                        monthsToPay: data.val().monthsToPay,
                        interest: data.val().interest,
                        LoanKey: data.val().LoanKey,
                        keyToPush: data.val().keyToPush,
                        comment: data.val().comment,
                        managerKey: data.val().managerKey,
                        managerName: data.val().managerName,
                        dateApproved: date,
                        
                    });
                    console.log(arr);
                });
                data = arr;
                LoadCurrentReport(data);
                });
            }
        });
    });
}

function LoadCurrentReport(data) {
 
    var oTblReport = $("#tb1").DataTable ({
        "data" : data,
        "columns" : [
            { "data" : "dateApproved" },
            { "data" : "clientName",  },
            { "data" : "managerName" },
            { "data" : "finalLoan", render: $.fn.dataTable.render.number( ',', '.', 0, '₱ ' ) , className: "text-right" },
            { "data" : "monthsToPay" },
            { "data" : "cashStatus" },
            {
                "data": null,
                "defaultContent": "<button type='button' class='btn''>Release Money</button>"
            }
        ]
    });

    $('#tb1 tbody').on( 'click', 'button', function () {
        var me = oTblReport.row( $(this).parents('tr') ).data();
        let ref = firebase.database().ref('loan application/' + me.keyToPush);
        let refToPush = firebase.database().ref('loan application/' + me.keyToPush+ '/' + me.LoanKey);


        var dateToday = new Date().toISOString();
        ref.once('value', snapshot => {
            snapshot.forEach(snapshot => {
                if(snapshot.val().key == me.LoanKey){
                     if(snapshot.val().loanReleased){
                    alert("Payment Already Released");
                }
                else{
                    if(snapshot.val().Active == true){
                        myData = {
                            key: snapshot.key,
                            keyToPush: snapshot.val().keyToPush,
                            ValidID: snapshot.val().ValidID,
                            incomeStatement: snapshot.val().incomeStatement,
                            Balance: snapshot.val().Balance,
                            Name: snapshot.val().Name,
                            Active: snapshot.val().Active,
                            Branch: snapshot.val().Branch,
                            Birthdate: snapshot.val().Birthdate,
                            Gender: snapshot.val().Gender,
                            NumberOfDependents: snapshot.val().NumberOfDependents,
                            SpouseName: snapshot.val().SpouseName,
                            SpouseAge: snapshot.val().SpouseAge,
                            Address: snapshot.val().Address,
                            LengthOfStay: snapshot.val().LengthOfStay,
                            TypeOfStay: snapshot.val().TypeOfStay,
                            Employer: snapshot.val().Employer,
                            EmplpoyerAddress: snapshot.val().EmplpoyerAddress,
                            LengthOfService: snapshot.val().LengthOfService,
                            Position: snapshot.val().Position,
                            EmploymentStatus: snapshot.val().EmploymentStatus,
                            SalaryPerMonth: snapshot.val().SalaryPerMonth,
                            NameOfSupervisor: snapshot.val().NameOfSupervisor,
                            Firm: snapshot.val().Firm,
                            NatureOfBusiness: snapshot.val().NatureOfBusiness,
                            Rent: snapshot.val().Rent,
                            FoodAndClothing: snapshot.val().FoodAndClothing,
                            Schooling: snapshot.val().Schooling,
                            Others: snapshot.val().Others,
                            MonthlyIncome: snapshot.val().MonthlyIncome,
                            YearlyNetIncome: snapshot.val().YearlyNetIncome,
                            EmploymentAmmountNumber: snapshot.val().EmploymentAmmountNumber,
                            EmploymentAmmountNumberSpouse: snapshot.val().EmploymentAmmountNumberSpouse,
                            BusinessAmmountNumberSpouse: snapshot.val().BusinessAmmountNumberSpouse,
                            OtherAmmountNumberSpouse: snapshot.val().OtherAmmountNumberSpouse,
                            BusinessAmmountNumber: snapshot.val().BusinessAmmountNumber,
                            OtherAmmountNumber: snapshot.val().OtherAmmountNumber,
                            Loan: snapshot.val().Loan,
                            MonthsToPay: snapshot.val().MonthsToPay,
                            Interest: snapshot.val().Interest,
                            TotalLoan: snapshot.val().TotalLoan,
                            DailyPayment: snapshot.val().DailyPayment,
                            DateLoanApplied: snapshot.val().DateLoanApplied,
                            Status: snapshot.val().Status,
                            AdminStatus: snapshot.val().AdminStatus,
                            loanReleased: true,
                            dateReleased: dateToday
                        }
                        refToPush.set(myData).then(() => {
                            location.reload();
                        });
                    }
                }
                }
            });
        });
    });
}