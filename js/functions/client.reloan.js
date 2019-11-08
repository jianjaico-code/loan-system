const user = firebase.database().ref('client');
let myData;
let myKey;

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
                    if(firebase.auth().currentUser.uid == data.key){
                        arr.push(data.key);
                    }
                });
                this.key = arr;
                let myArr = [];
                this.key.forEach(element => {
                    let byRef = firebase.database().ref('loan application/' + element);
                    byRef.on('value', data => {
                        data.forEach(data => {
                            myData = data.val();
                            myKey = data.key;
                        });
                    });
                });
                });
            }
        });
    });
}

function applyLoan(){
    let perc = (myData.Balance*100/myData.TotalLoan);
    var Loan = $('#Loan').val();
    var MonthsToPay = $('#MonthsToPay').val();

    var newLoan = (myData.Balance + Loan);

    var interest = (newLoan * 10 * MonthsToPay / 100);
    var totalLoan = (parseInt(newLoan) + interest);
    var dailyData =( 30 * MonthsToPay);
    var dailyPayment = Math.round(totalLoan / dailyData);


    if(perc <= 50){
        let push = firebase.database().ref('loan application/' + firebase.auth().currentUser.uid + '/' + myKey);
        push.set({
            Name: myData.Name,
            Birthdate: myData.Birthdate,
            Balance: totalLoan,
            Active: myData.Active,
            Branch: myData.Branch,
            Gender: myData.Gender,
            NumberOfDependents: myData.NumberOfDependents,
            SpouseName: myData.SpouseName,
            SpouseAge: myData.SpouseAge,
            Address: myData.Address,
            LengthOfStay: myData.LengthOfStay,
            TypeOfStay: myData.TypeOfStay,
            Employer: myData.Employer,
            EmplpoyerAddress: myData.EmplpoyerAddress,
            LengthOfService: myData.LengthOfService,
            Position: myData.Position,
            EmploymentStatus: myData.EmploymentStatus,
            SalaryPerMonth: myData.SalaryPerMonth,
            NameOfSupervisor: myData.NameOfSupervisor,
            Firm: myData.Firm,
            NatureOfBusiness: myData.NatureOfBusiness,
            Rent: myData.Rent,
            FoodAndClothing: myData.FoodAndClothing,
            Schooling: myData.Schooling,
            Others: myData.Others,
            MonthlyIncome: myData.MonthlyIncome,
            YearlyNetIncome: myData.YearlyNetIncome,
            EmploymentAmmountNumber: myData.EmploymentAmmountNumber,
            EmploymentTotalAmmount: myData.EmploymentTotalAmmount,
            BusinessAmmountNumber: myData.BusinessAmmountNumber,
            BusinessTotalAmmount: myData.BusinessTotalAmmount,
            LessCostOfSalesAmmountNumber: myData.LessCostOfSalesAmmountNumber,
            LessCostOfSalesTotalAmmount: myData.LessCostOfSalesTotalAmmount,
            OtherAmmountNumber: myData.OtherAmmountNumber,
            OtherTotalAmmountNumber: myData.OtherTotalAmmountNumber,
            Loan: myData.Loan,
            MonthsToPay:  myData.MonthsToPay,
            Interest: interest,
            TotalLoan: totalLoan,
            DailyPayment: dailyPayment,
            DateLoanApplied: myData.DateLoanApplied,
            Status: myData.Status,
            AdminStatus: myData.AdminStatus,
            Document: myData.Document
        }).then(() => {
            swal({
                title: "Success",
                icon: "success"
            });
        });
    }
    else{
        alert("You are not applicable to loan");
    }
}