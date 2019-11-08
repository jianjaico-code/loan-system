$(function() {
    $('#result').hide();
    $('#backBtn').hide();
});


function checkLoans(){
    $('#check-loan-modal').modal('show');
}

function initData(){
   

    var name = $('#fullname').val();
    var birthdate = $('#birthdate').val();

    var ref = firebase.database().ref('loan application/' + name);

   if(name == "" || birthdate == ""){
       alert("Empty Data");
   }
   else{
    ref.on('value', snapshot => {
        let arr = [];
        snapshot.forEach(data => {
            let strDate = data.val().DateLoanApplied;
            let date = strDate.substring(0, 10);

           if(data.val().Birthdate == birthdate && data.val().Name == name){
            $('#result').show();
            $('#dataInputs').hide();
            $('#backBtn').show();
            $('#checkBtn').hide();
            arr.push({
                Key: data.key,
                Name: data.val().Name,
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
                DateLoanApplied: date,
                Status: data.val().Status
            });
            LoadCurrentReport(arr);
           }
        });
        if(arr.length == 0){
            alert("Please check the if your inputs are correct.");
        }
    });
   }


}

function LoadCurrentReport(data) {

    var oTblReport = $("#tb1").DataTable ({
        "data" : data,
        "columns" : [
            { "data" : "Name" },
            { "data" : "Loan" },
            { "data" : "Interest" },
            { "data" : "TotalLoan" },
            { "data" : "DateLoanApplied" },
            { "data" : "Status" },
        ],
    });

    $('#tb1 tbody').on( 'click', 'button', function () {
        var me = oTblReport.row( $(this).parents('tr') ).data();
        // alert( me.Key );
        $('#modelWindow').modal('show');
        $('#modalTitle').text(me.Name);

        key = me.Key;
        name = me.Name;

        $('#Name').text("Name: " + me.Name);
        $('#Age').text("Age: " + me.Age);
        $('#Gender').text("Gender: " + me.Gender);
        $('#NumberOfDependents').text("Number Of Dependents: " + me.NumberOfDependents);
        $('#SpouseName').text("Spouse Name: " + me.SpouseName);
        $('#SpouseAge').text("Spouse Age: " + me.SpouseAge);
        $('#Address').text("Address: " + me.Address);
        $('#LengthOfStay').text("Length Of Stay: " + me.LengthOfStay);
        $('#TypeOfStay').text("Type Of Stay: " + me.TypeOfStay);
        $('#Employer').text("Employer: " + me.Employer);
        $('#EmplpoyerAddress').text("Emplpoyer Address: " + me.EmplpoyerAddress);
        $('#LengthOfService').text("Length Of Service: " + me.LengthOfService);
        $('#Position').text("Position: " + me.Position);
        $('#EmploymentStatus').text("Employment Status: " + me.EmploymentStatus);
        $('#SalaryPerMonth').text("Salary Per Month: " + me.SalaryPerMonth);
        $('#NameOfSupervisor').text("Name Of Supervisor: " + me.NameOfSupervisor);
        $('#Firm').text("Firm: " + me.Firm);
        $('#NatureOfBusiness').text("Nature Of Business: " + me.NatureOfBusiness);
        $('#Rent').text("Rent: " + me.Rent);
        $('#FoodAndClothing').text("Food And Clothing: " + me.FoodAndClothing);
        $('#Schooling').text("Schooling: " + me.Schooling);
        $('#Others').text("Others: " + me.Others);
        $('#MonthlyIncome').text("Monthly Income: " + me.MonthlyIncome);
        $('#YearlyNetIncome').text("Yearly Net Income: " + me.YearlyNetIncome);
        $('#EmploymentAmmountNumber').text("Employment Ammount Number: " + me.EmploymentAmmountNumber);
        $('#EmploymentTotalAmmount').text("Employment Total Ammount: " + me.EmploymentTotalAmmount);
        $('#BusinessAmmountNumber').text("Business Ammount Number: " + me.BusinessAmmountNumber);
        $('#BusinessTotalAmmount').text("Business Total Ammount: " + me.BusinessTotalAmmount);
        $('#LessCostOfSalesAmmountNumber').text("Less Cost Of Sales AmmountNumber: " + me.LessCostOfSalesAmmountNumber);
        $('#LessCostOfSalesTotalAmmount').text("Less Cost Of Sales Tota lAmmount: " + me.LessCostOfSalesTotalAmmount);
        $('#OtherAmmountNumber').text("Other Ammount Number: " + me.OtherAmmountNumber);
        $('#OtherTotalAmmountNumber').text("Other Total Ammount Number: " + me.OtherTotalAmmountNumber);
        $('#Loan').text("Loan: " + me.Loan);
        $('#MonthsToPay').text("Months To Pay: " + me.MonthsToPay);
        $('#Interest').text("Interest: " + me.Interest);
        $('#TotalLoan').text("Total Loan: " + me.TotalLoan);
        $('#DailyPayment').text("Daily Payment: " + me.DailyPayment);
        $('#DateLoanApplied').text("Date Loan Applied: " + me.DateLoanApplied);
        $('#Status').text("Status: " + me.Status);        
    });
}

function back(){
    
    location.reload();
}