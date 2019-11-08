const user = firebase.database().ref('user');

let dateToday = new Date().toISOString();

let CIKEy;
let officerName;
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
let AdminStatus;
let Branch;
let Active;
let Balance;
let keyToPush;
let lastname;
let middlename;
let ValidID;
let incomeStatement;

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
                CIKEy = data.key;
                officerName = data.val().name;
                $('#username').text(data.val().name);
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
                            let date = strDate.substring(0, 10);

                            if(data.val().Active == true){
                                myArr.push({
                                    keyToPush: element,
                                    Key: data.key,
                                    Name: data.val().Name,
                                    Lastname: data.val().Lastname,
                                    Middlename: data.val().Middlename,
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
                                    EmploymentAmmountNumberSpouse: data.val().EmploymentAmmountNumberSpouse,
                                    BusinessAmmountNumberSpouse: data.val().BusinessAmmountNumberSpouse,
                                    OtherAmmountNumberSpouse: data.val().OtherAmmountNumberSpouse,
                                    EmploymentAmmountNumber: data.val().EmploymentAmmountNumber,
                                    BusinessAmmountNumber: data.val().BusinessAmmountNumber,
                                    OtherAmmountNumber: data.val().OtherAmmountNumber,
                                    Loan: data.val().Loan,
                                    MonthsToPay:  data.val().MonthsToPay,
                                    Interest: data.val().Interest,
                                    TotalLoan: data.val().TotalLoan,
                                    DailyPayment: data.val().DailyPayment,
                                    DateLoanApplied: date,
                                    Status: data.val().Status,
                                    AdminStatus: data.val().AdminStatus,
                                    Branch: data.val().Branch,
                                    Balance: data.val().Balance,
                                    ValidID: data.val().ValidID,
                                    incomeStatement: data.val().incomeStatement,
                                });
                            }
                        });
                    });
                });
                data = myArr;
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
            { "data" : "Name" },
            { "data" : "Loan", render: $.fn.dataTable.render.number( ',', '.', 0, '₱ ' ) , className: "text-right"},
            { "data" : "Interest", render: $.fn.dataTable.render.number( ',', '.', 0, '₱ ' ) , className: "text-right"},
            { "data" : "TotalLoan", render: $.fn.dataTable.render.number( ',', '.', 0, '₱ ' ) , className: "text-right"},
            { "data" : "DateLoanApplied" },
            { "data" : "Status" },
            {
                "data": null,
                "defaultContent": "<button type='button' class='btn''>View</button>"
            }
        ],
    });

    $('#tb1 tbody').on( 'click', 'button', function () {
        var me = oTblReport.row( $(this).parents('tr') ).data();
        // alert( me.Key );
        $('#data').show();
        $('#data2').hide();

        key = me.Key;
        name = me.Name;
        middlename = me.Middlename;
        lastname = me.Lastname;
        Balance = me.Balance;
        Birthdate = me.Birthdate;
        Gender = me.Gender;
        NumberOfDependents = me.NumberOfDependents;
        SpouseName = me.SpouseName;
        SpouseAge = me.SpouseAge;
        Address = me.Address;
        LengthOfStay = me.LengthOfStay;
        TypeOfStay = me.TypeOfStay;
        Employer = me.Employer;
        EmplpoyerAddress = me.EmplpoyerAddress;
        LengthOfService = me.LengthOfService;
        Position = me.Position;
        EmploymentStatus = me.EmploymentStatus;
        SalaryPerMonth = me.SalaryPerMonth;
        NameOfSupervisor = me.NameOfSupervisor;
        Firm = me.Firm;
        NatureOfBusiness = me.NatureOfBusiness;
        Rent = me.Rent;
        FoodAndClothing = me.FoodAndClothing;
        Schooling = me.Schooling;
        Others = me.Others;
        MonthlyIncome = me.MonthlyIncome;
        YearlyNetIncome = me.YearlyNetIncome;
        EmploymentAmmountNumber = me.EmploymentAmmountNumber;
        BusinessAmmountNumber = me.BusinessAmmountNumber;
        OtherAmmountNumber = me.OtherAmmountNumber;
        EmploymentAmmountNumberSpouse = me.EmploymentAmmountNumberSpouse;
        BusinessAmmountNumberSpouse = me.BusinessAmmountNumberSpouse;
        OtherAmmountNumberSpouse = me.OtherAmmountNumberSpouse;
        Loan = me.Loan;
        MonthsToPay = me.MonthsToPay;
        Interest = me.Interest;
        TotalLoan = me.TotalLoan;
        DailyPayment = me.DailyPayment;
        DateLoanApplied = me.DateLoanApplied;
        Status = me.Status;
        AdminStatus = me.AdminStatus;
        Branch = me.Branch;
        Active = me.Active;
        ValidID = me.ValidID;
        incomeStatement = me.incomeStatement;
        
        keyToPush = me.keyToPush

        $('#Name').text("Name: " + me.Name + " " + me.Middlename + " " + me.Lastname);
        $('#Birthdate').text("Birthdate: " + me.Birthdate);
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
        $('#EmploymentAmmountNumberSpouse').text("Employment Amount Number For Spouse: " + me.EmploymentAmmountNumberSpouse);
        $('#BusinessAmmountNumberSpouse').text("Business Amount Number For Spouse: " + me.BusinessAmmountNumberSpouse);
        $('#OtherAmmountNumberSpouse').text("Other Amount Number For Spouse: " + me.OtherAmmountNumberSpouse);       
        $('#EmploymentAmmountNumber').text("Employment Amount Number: " + me.EmploymentAmmountNumber);
        $('#BusinessAmmountNumber').text("Business Amount Number: " + me.BusinessAmmountNumber);
        $('#OtherAmmountNumber').text("Other Amount Number: " + me.OtherAmmountNumber);
        $('#Loan').text("Loan: " + me.Loan);
        $('#MonthsToPay').text("Months To Pay: " + me.MonthsToPay);
        $('#Interest').text("Interest: " + me.Interest);
        $('#TotalLoan').text("Total Loan: " + me.TotalLoan);
        $('#DailyPayment').text("Daily Payment: " + me.DailyPayment);
        $('#DateLoanApplied').text("Date Loan Applied: " + me.DateLoanApplied);
        $('#Status').text("Status: " + me.Status);      
        $('#AdminStatus').text("Admin: " + me.AdminStatus);  
        $('#validIDDoc').attr("href", me.ValidID);
        $('#incomeStatementDoc').attr("href", me.incomeStatement);

        if(me.Status == "Approved"){
            $('#rejectBtn').hide();
            $('#approveBtn').hide();
            $('#remarksBtn').hide();
        }
        else{
            $('#rejectBtn').show();
            $('#approveBtn').show();
        }
    });
}

function rejectLoan(){
    $("#tb1").dataTable().fnDestroy();
    var alertCtrl = confirm("Are you sure to reject the loan of " + name);
    var remarks = $('#comment').val();
    let ref = firebase.database().ref('loan application/' + keyToPush + '/' + key);

    if(remarks == ""){
        swal({
            title: "Please add Remarks",
            type: "warning",
            icon: "error"
        });
    }else{
        if (alertCtrl == true) {
            ref.set({
                Name: name,
                Middlename: middlename,
                Lastname: lastname,
                Birthdate: Birthdate,
                Branch: Branch,
                Active: false,
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
                Status: "Rejected",
                Reasons: remarks,
                Balance: Balance,
                AdminStatus: AdminStatus,
                ValidID: ValidID,
                incomeStatement: incomeStatement
            }).then(() => {
                swal({
                    title: "Success",
                    icon: "success"
                }).then(() => {
                    location.reload(); 
                });
            });
        }
    } 
}

function approveLoan(){
    $("#tb1").dataTable().fnDestroy();
    let ref = firebase.database().ref('loan application/' + keyToPush + '/' + key);
    var remarks = $('#comment').val();
    if(remarks == ""){
        alert("Please add remarks")
    }else{
        var alertCtrl = confirm("Approve the loan of " + name);

        if (alertCtrl == true) {
            ref.set({
                Name: name,
                Middlename: middlename,
                Lastname: lastname,
                Birthdate: Birthdate,
                Branch: Branch,
                Active: Active,
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
                Status: "Approved",
                Balance: Balance,
                AdminStatus: AdminStatus,
                ValidID: ValidID,
                incomeStatement: incomeStatement
            }).then(() => {
                var approvedLoan = firebase.database().ref('approved loan');
            
                approvedLoan.push({
                    keyToPush: keyToPush,
                    finalLoan: TotalLoan,
                    clientName: name,
                    Active: Active,
                    totalLoan: TotalLoan,
                    monthsToPay: MonthsToPay,
                    interest: Interest,
                    LoanKey: key,
                    comment: remarks,
                    status: AdminStatus,
                    officer: CIKEy,
                    officerName: officerName,
                    dateApproved: dateToday
                });
                location.reload();
            });
            
        }                        
    }                                                                                                                                           
}

function returnData(){
    $('#data').hide();
    $('#data2').show();
}