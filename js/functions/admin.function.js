const user = firebase.database().ref('user');
let data;

let dateToday = new Date().toISOString();

let dataObj;

let managerKey;
let managerName;

let key;
let name;
let Birthdate; 
let Gender;   
let NumberOfDependents;  
let SpouseName; 
let SpouseAge;   
let Address;   
let LengthOfStay; 
let TypeOfStay;    
let Employer;   
let EmplpoyerAddress;     
let LengthOfService;
let Position;     
let EmploymentStatus; 
let SalaryPerMonth;     
let NameOfSupervisor;     
let Firm;     
let NatureOfBusiness;  
let Rent;     
let FoodAndClothing;  
let Schooling;     
let Others;    
let MonthlyIncome;  
let YearlyNetIncome; 
let EmploymentAmmountNumber;
let BusinessAmmountNumber;
let OtherAmmountNumber;
let EmploymentAmmountNumberSpouse;
let BusinessAmmountNumberSpouse;
let OtherAmmountNumberSpouse;
let Loan;     
let MonthsToPay;
let Interest; 
let TotalLoan;
let DailyPayment;
let DateLoanApplied;
let Status;
let Branch;
let ValidID;
let incomeStatement;
let Active;
let Balance;
let AdminStatus;


$( document ).ready(function() {
    $("#overlay").show();
    $('#loading').show();

    $('#data').hide();

    initializeData();
    initializeUser();
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

                let ref = firebase.database().ref('approved loan');
                ref.on('value', data => {
                let arr = [];
                data.forEach(data => {
                    let strDate = data.val().dateApproved;
                    let date = strDate.substring(0, 10);
                
                    if(data.val().Active != false){
                        arr.push({
                            key: data.key,
                            Active: data.val().Active,
                            keyToPush: data.val().keyToPush,
                            clientName: data.val().clientName,
                            totalLoan: data.val().totalLoan,
                            monthsToPay: data.val().monthsToPay,
                            interest: data.val().interest,
                            status: data.val().status,
                            LoanKey: data.val().LoanKey,
                            comment: data.val().comment,
                            officer: data.val().officer,
                            officerName: data.val().officerName,
                            Loan: (data.val().totalLoan - data.val().interest).toFixed(2),
                            dateApproved: date
                        });
                    }
                });
                data = arr;
                console.log(data);
                LoadCurrentReport(data);
                });
            }
        });
    });
}

function rejectLoan(){
    $("#tb1").dataTable().fnDestroy();
    var promt = prompt("Please enter your Comment");
    let myData = {
        key: key,
        keyToPush: keyToPush,
        ValidID: ValidID,
        incomeStatement: incomeStatement,
        Balance: Balance,
        Name: name,
        Active: false,
        Branch: Branch,
        Birthdate: Birthdate,
        Gender: Gender,
        NumberOfDependents: NumberOfDependents,
        SpouseName: SpouseName,
        SpouseAge: SpouseAge,
        Address: Address,
        LengthOfStay: LengthOfStay,
        TypeOfStay: TypeOfStay,
        Employer: Employer,
        EmplpoyerAddress: EmplpoyerAddress,
        LengthOfService: LengthOfService,
        Position: Position,
        EmploymentStatus: EmploymentStatus,
        SalaryPerMonth: SalaryPerMonth,
        NameOfSupervisor: NameOfSupervisor,
        Firm: Firm,
        NatureOfBusiness: NatureOfBusiness,
        Rent: Rent,
        FoodAndClothing: FoodAndClothing,
        Schooling: Schooling,
        Others: Others,
        MonthlyIncome: MonthlyIncome,
        YearlyNetIncome: YearlyNetIncome,
        EmploymentAmmountNumber: EmploymentAmmountNumber,
        EmploymentTotalAmmount: EmploymentTotalAmmount,
        BusinessAmmountNumber: BusinessAmmountNumber,
        BusinessTotalAmmount: BusinessTotalAmmount,
        LessCostOfSalesAmmountNumber: LessCostOfSalesAmmountNumber,
        LessCostOfSalesTotalAmmount: LessCostOfSalesTotalAmmount,
        OtherAmmountNumber: OtherAmmountNumber,
        OtherTotalAmmountNumber: OtherTotalAmmountNumber,
        Loan: Loan,
        MonthsToPay: MonthsToPay,
        Interest: Interest,
        TotalLoan: TotalLoan,
        DailyPayment: DailyPayment,
        DateLoanApplied: DateLoanApplied,
        Status: Status,
        AdminStatus: "Rejected",
        Reasons: promt,     
    }

    
    if (promt == null || promt == "") {
        txt = "Cancelled";
    } else {
        let ref = firebase.database().ref('loan application/' + myData.keyToPush + '/' + myData.key);
        ref.set(myData).then(() => {
            location.reload();
        });

        var approvedLoan = firebase.database().ref('approved loan/' + dataObj.key);
        approvedLoan.set({
            key: dataObj.key,
            clientName: dataObj.clientName,
            keyToPush: dataObj.keyToPush,
            totalLoan: dataObj.totalLoan,
            monthsToPay: dataObj.monthsToPay,
            interest: dataObj.interest,
            status: dataObj.status,
            LoanKey: dataObj.LoanKey,
            Active: false,
            comment: dataObj.comment,
            officer: dataObj.officer,
            officerName: dataObj.officerName,
            dateApproved: dataObj.dateApproved
        });
    }
    
}

function LoadCurrentReport(data) {
 
    var oTblReport = $("#tb1").DataTable ({
        "data" : data,
        "columns" : [
            { "data" : "dateApproved" },
            { "data" : "clientName" },
            { "data" : "officerName" },
            { "data" : "Loan", render: $.fn.dataTable.render.number( ',', '.', 0, '₱ ' ) , className: "text-right"},
            { "data" : "interest", render: $.fn.dataTable.render.number( ',', '.', 0, '₱ ' ) , className: "text-right"},
            { "data" : "monthsToPay" },
            { "data" : "totalLoan", render: $.fn.dataTable.render.number( ',', '.', 0, '₱ ' ) , className: "text-right"},
            { "data" : "status"},
            {
                "data": null,
                "defaultContent": "<button type='button' class='btn''>View</button>"
            }
        ]
    });

    $('#tb1 tbody').on( 'click', 'button', function () {
        var me = oTblReport.row( $(this).parents('tr') ).data();
        $('#data').show();
        $('#data1').hide();

        let strDate = me.dateApproved;
        let date = strDate.substring(0, 10);

        dataObj = {
            key: me.key,
            keyToPush: me.keyToPush,
            clientName: me.clientName,
            totalLoan: me.totalLoan,
            finalLoan: me.finalLoan,
            monthsToPay: me.monthsToPay,
            interest: me.interest,
            status: "Approved",
            LoanKey: me.LoanKey,
            comment: me.comment,
            officer: me.officer,
            officerName: me.officerName,
            dateApproved: date
        }
        
        let dataRef = firebase.database().ref('loan application/' + me.keyToPush + '/'+ me.LoanKey);
        dataRef.on('value', data => {

            key = data.key;
            keyToPush = me.keyToPush;

            name = data.val().Name;
            Branch = data.val().Branch,
            Balance = data.val().Balance,
            Birthdate = data.val().Birthdate;
            Active = data.val().Active;
            Gender = data.val().Gender;
            NumberOfDependents = data.val().NumberOfDependents;
            SpouseName = data.val().SpouseName;
            SpouseAge = data.val().SpouseAge;
            Address = data.val().Address;
            LengthOfStay = data.val().LengthOfStay;
            TypeOfStay = data.val().TypeOfStay;
            Employer = data.val().Employer;
            EmplpoyerAddress = data.val().EmplpoyerAddress;
            LengthOfService = data.val().LengthOfService;
            Position = data.val().Position;
            EmploymentStatus = data.val().EmploymentStatus;
            SalaryPerMonth = data.val().SalaryPerMonth;
            NameOfSupervisor = data.val().NameOfSupervisor;
            Firm = data.val().Firm;
            NatureOfBusiness = data.val().NatureOfBusiness;
            Rent = data.val().Rent;
            FoodAndClothing = data.val().FoodAndClothing;
            Schooling = data.val().Schooling;
            Others = data.val().Others;
            MonthlyIncome = data.val().MonthlyIncome;
            YearlyNetIncome = data.val().YearlyNetIncome;
            EmploymentAmmountNumber = data.val().EmploymentAmmountNumber;
            BusinessAmmountNumber = data.val().BusinessAmmountNumber;
            OtherAmmountNumber = data.val().OtherAmmountNumber;
            EmploymentAmmountNumberSpouse = data.val().EmploymentAmmountNumberSpouse;
            BusinessAmmountNumberSpouse = data.val().BusinessAmmountNumberSpouse;
            OtherAmmountNumberSpouse = data.val().OtherAmmountNumberSpouse;
            Loan = data.val().Loan;
            MonthsToPay = data.val().MonthsToPay;
            Interest = data.val().Interest;
            TotalLoan = data.val().TotalLoan;
            DailyPayment = data.val().DailyPayment;
            DateLoanApplied = data.val().DateLoanApplied;
            Status = data.val().Status;
            AdminStatus = data.val().AdminStatus;
            ValidID = data.val().ValidID;
            incomeStatement = data.val().incomeStatement;

            $('#Name').text("Name: " + data.val().Name);
            $('#Age').text("Birthdate: " + data.val().Birthdate);
            $('#Gender').text("Gender: " + data.val().Gender);
            $('#NumberOfDependents').text("Number Of Dependents: " + data.val().NumberOfDependents);
            $('#SpouseName').text("Spouse Name: " + data.val().SpouseName);
            $('#SpouseAge').text("Spouse Age: " + data.val().SpouseAge);
            $('#Address').text("Address: " + data.val().Address);
            $('#LengthOfStay').text("Length Of Stay: " + data.val().LengthOfStay);
            $('#TypeOfStay').text("Type Of Stay: " + data.val().TypeOfStay);
            $('#Employer').text("Employer: " + data.val().Employer);
            $('#EmplpoyerAddress').text("Emplpoyer Address: " + data.val().EmplpoyerAddress);
            $('#LengthOfService').text("Length Of Service: " + data.val().LengthOfService);
            $('#Position').text("Position: " + data.val().Position);
            $('#EmploymentStatus').text("Employment Status: " + data.val().EmploymentStatus);
            $('#SalaryPerMonth').text("Salary Per Month: " + data.val().SalaryPerMonth);
            $('#NameOfSupervisor').text("Name Of Supervisor: " + data.val().NameOfSupervisor);
            $('#Firm').text("Firm: " + data.val().Firm);
            $('#NatureOfBusiness').text("Nature Of Business: " + data.val().NatureOfBusiness);
            $('#Rent').text("Rent: " + data.val().Rent);
            $('#FoodAndClothing').text("Food And Clothing: " + data.val().FoodAndClothing);
            $('#Schooling').text("Schooling: " + data.val().Schooling);
            $('#Others').text("Others: " + data.val().Others);
            $('#MonthlyIncome').text("Monthly Income: " + data.val().MonthlyIncome);
            $('#YearlyNetIncome').text("Yearly Net Income: " + data.val().YearlyNetIncome);
            $('#EmploymentAmmountNumber').text("Employment Amount Number: " + data.val().EmploymentAmmountNumber);
            $('#BusinessAmmountNumber').text("Business Amount Number: " + data.val().BusinessAmmountNumber);
            $('#OtherAmmountNumber').text("Other Amount Number: " + data.val().OtherAmmountNumber);
            $('#EmploymentAmmountNumberSpouse').text("Employment Amount Number For Spouse: " + data.val().EmploymentAmmountNumberSpouse);
            $('#BusinessAmmountNumberSpouse').text("Business Amount Number For Spouse: " + data.val().BusinessAmmountNumberSpouse);
            $('#OtherAmmountNumberSpouse').text("Other Amount Number For Spouse: " + data.val().OtherAmmountNumberSpouse);
            $('#Loan').text("Loan: " + data.val().Loan);
            $('#MonthsToPay').text("Months To Pay: " + data.val().MonthsToPay);
            $('#Interest').text("Interest: " + data.val().Interest);
            $('#TotalLoan').text("Total Loan: " + data.val().TotalLoan);
            $('#DailyPayment').text("Daily Payment: " + data.val().DailyPayment);
            $('#DateLoanApplied').text("Date Loan Applied: " + data.val().DateLoanApplied);
            $('#Status').text("Status: " + data.val().Status);    
            $('#AdminStatus').text("Admin: " + data.val().AdminStatus);
            $('#validIDDoc').attr("href", data.val().ValidID);
            $('#incomeStatementDoc').attr("href", data.val().incomeStatement);

            let secondRef = firebase.database().ref('approved loan');
            secondRef.on('value', snapshot => {
                snapshot.forEach(snapshot => {
                    if(snapshot.val().keyToPush == keyToPush){
                        $('#comment').text(snapshot.val().comment);
                    }
                });
            });
            
            if(data.val().AdminStatus == "Approved" || data.val().AdminStatus == "Rejected"){
                $('#rejectBtn').hide();
                $('#approveBtn').hide();
            }
            else{
                $('#rejectBtn').show();
                $('#approveBtn').show();
            }
        });
    });
}

function initializeUser(){
    user.on('value', user => {
        var arr = [];
        user.forEach(user => {
            arr.push({
                name: user.val().name,
                middleName: user.val().middleName,
                lastname: user.val().lastname,
                address: user.val().address,
                position: user.val().position,
                email: user.val().email,
                key: user.key
            })
        });
    });
}

function returnData(){
    $('#data').hide(); 
    $('#data1').show();
}

function approveLoan(){
    $("#tb1").dataTable().fnDestroy();
    let myData = {
        key: key,
        keyToPush: keyToPush,
        ValidID: ValidID,
        incomeStatement: incomeStatement,
        Balance: Balance,
        Name: name,
        Active: Active,
        Branch: Branch,
        Birthdate: Birthdate,
        Gender: Gender,
        NumberOfDependents: NumberOfDependents,
        SpouseName: SpouseName,
        SpouseAge: SpouseAge,
        Address: Address,
        LengthOfStay: LengthOfStay,
        TypeOfStay: TypeOfStay,
        Employer: Employer,
        EmplpoyerAddress: EmplpoyerAddress,
        LengthOfService: LengthOfService,
        Position: Position,
        EmploymentStatus: EmploymentStatus,
        SalaryPerMonth: SalaryPerMonth,
        NameOfSupervisor: NameOfSupervisor,
        Firm: Firm,
        NatureOfBusiness: NatureOfBusiness,
        Rent: Rent,
        FoodAndClothing: FoodAndClothing,
        Schooling: Schooling,
        Others: Others,
        MonthlyIncome: MonthlyIncome,
        YearlyNetIncome: YearlyNetIncome,
        EmploymentAmmountNumber: EmploymentAmmountNumber,
        EmploymentAmmountNumberSpouse: EmploymentAmmountNumberSpouse,
        BusinessAmmountNumberSpouse: BusinessAmmountNumberSpouse,
        OtherAmmountNumberSpouse: OtherAmmountNumberSpouse,
        BusinessAmmountNumber: BusinessAmmountNumber,
        OtherAmmountNumber: OtherAmmountNumber,
        Loan: Loan,
        MonthsToPay: MonthsToPay,
        Interest: Interest,
        TotalLoan: TotalLoan,
        DailyPayment: DailyPayment,
        DateLoanApplied: DateLoanApplied,
        Status: Status,
        AdminStatus: "Approved"        
    }

    let ref = firebase.database().ref('loan application/' + myData.keyToPush + '/' + myData.key);
    ref.set(myData).then(() => {
        var promt = prompt("Please enter your Comment");
        var approvedLoan = firebase.database().ref('admin approved loan');
        if (promt == null || promt == "") {
            txt = "Cancelled";
        } else {
            approvedLoan.push({
                collector: "Not yet assigned",
                keyToPush: myData.keyToPush,
                clientName: myData.Name,
                finalLoan: myData.TotalLoan,
                totalLoan: myData.TotalLoan,
                monthsToPay: myData.MonthsToPay,
                interest: myData.Interest,
                LoanKey: myData.key,
                address: myData.Address,
                DailyPayment: myData.DailyPayment,
                comment: promt,
                managerKey: managerKey,
                managerName: managerName,
                dateApproved: dateToday,
                
            });
            location.reload();
        }
    });

    var approvedLoan = firebase.database().ref('approved loan/' + dataObj.key);
    approvedLoan.set({
        key: dataObj.key,
        clientName: dataObj.clientName,
        keyToPush: dataObj.keyToPush,
        totalLoan: dataObj.totalLoan,
        monthsToPay: dataObj.monthsToPay,
        interest: dataObj.interest,
        status: dataObj.status,
        LoanKey: dataObj.LoanKey,
        comment: dataObj.comment,
        officer: dataObj.officer,
        officerName: dataObj.officerName,
        dateApproved: dataObj.dateApproved
    });
}

function addUser(){
    $("#overlay").show();
    $('#loading').show();

    var email = $('#email').val();
    var firstname = $('#firstname').val();
    var middlename = $('#middlename').val();
    var lastname = $('#lastname').val();
    var address = $('#address').val();
    var type = $('#type').val();
    var pass = $('#pass').val();
    var conPass = $('#conPass').val();

    if(pass != conPass){
        alert("Password dont Match");
        $("#overlay").hide();
        $('#loading').hide();
    }
    else if(email == "" || firstname == "" || middlename == "" || lastname == "" || address == "" || type == ""){
        alert("Please fill out all the forms");
        $("#overlay").hide();
        $('#loading').hide();
    }
    else{
        firebase.auth().createUserWithEmailAndPassword(email, pass).then(data => {
            $("#overlay").hide();
            $('#loading').hide();
            let ref = firebase.database().ref('user/' + data.user.uid);
            ref.set({
                name: firstname,
                middleName: middlename,
                lastname: lastname,
                address: address,
                position: type,
                email: email
            }).then(() => {
                location.replace('users.html');
            });
        }).catch(function(error) {
            var errorMessage = error.message;
            alert(errorMessage);
        });
    }
}