const user = firebase.database().ref('client');

$( document ).ready(function() {
    $("#overlay").show();
    $('#loading').show();
    
    initializeData();
});

function initializeData(){
    user.on('value', data => {
        data.forEach(data => { 
            if(data.key == firebase.auth().currentUser.uid){
                $('#username').text(data.val().Name);
                $("#overlay").hide();
                $('#loading').hide();

                let ref = firebase.database().ref('loan application/');
                ref.on('value', data => {
                let arr = [];
                data.forEach(data => {
                    arr.push(data.key);
                });
                this.key = arr;
                let myArr = [];
                this.key.forEach(element => {
                    let byRef = firebase.database().ref('loan application/' + element);
                    byRef.on('value', data => {
                        data.forEach(data => {
                            let strDate = data.val().DateLoanApplied;
                            let dt = new Date(strDate);
                            let month = dt.getMonth();
                            let dat0e = dt.getDate();
                            let year = dt.getFullYear();    
                            let date = month + " / " + dat0e +" / " + year;

                            if(element == firebase.auth().currentUser.uid){
                                if(data.val().Active == false){
                                    myArr.push({
                                        Key: data.key,
                                        Name: data.val().Name,
                                        Branch: data.val().Branch,
                                        Active: data.val().Active,
                                        Birthdate: data.val().Birthdate,
                                        Gender: data.val().Gender,
                                        NumberOfDependents: data.val().NumberOfDependents,
                                        SpouseName: data.val().SpouseName,
                                        SpouseAge: data.val().SpouseAge,
                                        Address: data.val().Address,
                                        LengthOfStay: data.val().LengthOfStay,
                                        TypeOfStay: data.val().TypeOfStay,
                                        Employer: data.val().Employer,
                                        EmplpoyerAddress: data.val().EmplpoyerAddress,
                                        LengthOfService: data.val().LengthOfService,
                                        Position: data.val().Position,
                                        EmploymentStatus: data.val().EmploymentStatus,
                                        SalaryPerMonth: data.val().SalaryPerMonth,
                                        NameOfSupervisor: data.val().NameOfSupervisor,
                                        Firm: data.val().Firm,
                                        NatureOfBusiness: data.val().NatureOfBusiness,
                                        Rent: data.val().Rent,
                                        FoodAndClothing: data.val().FoodAndClothing,
                                        Schooling: data.val().Schooling,
                                        Others: data.val().Others,
                                        MonthlyIncome: data.val().MonthlyIncome,
                                        YearlyNetIncome: data.val().YearlyNetIncome,
                                        EmploymentAmmountNumber: data.val().EmploymentAmmountNumber,
                                        EmploymentTotalAmmount: data.val().EmploymentTotalAmmount,
                                        BusinessAmmountNumber: data.val().BusinessAmmountNumber,
                                        BusinessTotalAmmount: data.val().BusinessTotalAmmount,
                                        LessCostOfSalesAmmountNumber: data.val().LessCostOfSalesAmmountNumber,
                                        LessCostOfSalesTotalAmmount: data.val().LessCostOfSalesTotalAmmount,
                                        OtherAmmountNumber: data.val().OtherAmmountNumber,
                                        OtherTotalAmmountNumber: data.val().OtherTotalAmmountNumber,
                                        Loan: data.val().Loan,
                                        MonthsToPay:  data.val().MonthsToPay,
                                        Interest: data.val().Interest,
                                        TotalLoan: data.val().TotalLoan,
                                        DailyPayment: data.val().DailyPayment,
                                        DateLoanApplied: data.val().DateLoanApplied,
                                        dateString: date,
                                        Status: data.val().Status,
                                        AdminStatus: data.val().AdminStatus,
                                        Document: data.val().Document,
                                        Balance: data.val().Balance,
                                        loanReleased: data.val().loanReleased,
                                        dateReleased: data.val().dateReleased,
                                        Reasons: data.val().Reasons
                                    });
                                    
                                }
                            }
                        });
                    });
                });
                data = myArr;
                loadedData(data);
                });
            }
        });
    });
}

function loadedData(data){
    var oTblReport = $("#tb1").DataTable ({
        "order": [[ 0, "desc" ]],
        "data" : data,
        "columns" : [
            { "data" : "dateString" },
            { "data" : "TotalLoan", render: $.fn.dataTable.render.number( ',', '.', 0, '₱ ' ) },
            { "data" : "Reasons"},
        ]
    });
}