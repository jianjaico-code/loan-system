const user = firebase.database().ref('user');

let data;
let obj;

let key;
let keyPush;
let dataKey;

let loanApplicationData;
let adminApprovedLoanData;

$( document ).ready(function() {
    $("#overlay").show();
    $('#loading').show();
    $('#data1').hide();

    initializeData();
});

function initializeData(){
    user.on('value', data => {
        data.forEach(data => {
            if(data.key == firebase.auth().currentUser.uid){
                $('#username').text(data.val().name);
                $("#overlay").hide();
                $('#loading').hide();

                let ref = firebase.database().ref('admin approved loan');
                ref.on('value', data => {
                    let arr = [];
                    data.forEach(data => {
                        let strDate = data.val().dateToPay;
                        console.log(data.val().status);
                        let date = strDate.substring(0, 10);
                        if(data.val().collectorKey == firebase.auth().currentUser.uid){
                            if(data.val().status == undefined){
                                arr.push({
                                    dataKey: data.key,
                                    collector: data.val().collector,
                                    collectorKey: data.val().collectorKey,
                                    LoanKey: data.val().LoanKey,
                                    clientName: data.val().clientName,
                                    comment: data.val().comment,
                                    dateApproved: data.val().dateApproved,
                                    dateToPay: date,
                                    address: data.val().address,
                                    interest: data.val().interest,
                                    keyToPush: data.val().keyToPush,
                                    managerKey: data.val().managerKey,
                                    managerName: data.val().managerName,
                                    DailyPayment: data.val().DailyPayment,
                                    monthsToPay: data.val().monthsToPay,
                                    totalLoan: data.val().totalLoan
                                });        
                            }      
                        }
                    });
                    data = arr
                    LoadCurrentReport(data);
                });
            }
        });
    });
}

function LoadCurrentReport(data){
    var oTblReport = $("#tb1").DataTable ({
        "data" : data,
        "columns" : [
            { "data" : "clientName" },
            { "data" : "address" },
            { "data" : "dateToPay" },
            { "data" : "DailyPayment", render: $.fn.dataTable.render.number( ',', '.', 0, '₱ ' ) },
            { "data" : "totalLoan", render: $.fn.dataTable.render.number( ',', '.', 0, '₱ ' ) },
            {
                "data": null,
                "defaultContent": "<button type='button' class='btn''>Collect</button>"
            }
        ],
    });

    $('#tb1 tbody').on( 'click', 'button', function () {
        var me = oTblReport.row( $(this).parents('tr') ).data();
        $('#data2').hide(); 
        $('#data1').show();

        key =  me.keyToPush;
        dataKey = me.dataKey;
        keyPush = me.LoanKey;

        let ref = firebase.database().ref('loan application/' + key + '/' + keyPush);
        ref.on('value', data => {
            loanApplicationData = data.val();
            console.log(loanApplicationData.EmploymentAmmountNumberSpouse);
        });

        let secondRef = firebase.database().ref('admin approved loan/' + dataKey);
        secondRef.on('value', data => {
            adminApprovedLoanData = data.val();
        });
    });
}

function closeLoan(){
    $("#tb1").dataTable().fnDestroy();
    let ref = firebase.database().ref('loan application/' + key + '/' + keyPush);
    let secondRef = firebase.database().ref('admin approved loan/' + dataKey);
    var currentDate = adminApprovedLoanData.dateToPay = new Date();

    secondRef.set({
        collector: adminApprovedLoanData.collector,
        collectorKey: adminApprovedLoanData.collectorKey,
        LoanKey: adminApprovedLoanData.LoanKey,
        clientName: adminApprovedLoanData.clientName,
        comment: adminApprovedLoanData.comment,
        finalLoan: adminApprovedLoanData.finalLoan,
        dateApproved: adminApprovedLoanData.dateApproved,
        address: adminApprovedLoanData.address,
        DailyPayment: loanApplicationData.DailyPayment,
        dateToPay: currentDate.toISOString(),
        interest: adminApprovedLoanData.interest,
        keyToPush: adminApprovedLoanData.keyToPush,
        managerKey: adminApprovedLoanData.managerKey,
        managerName: adminApprovedLoanData.managerName,
        monthsToPay: adminApprovedLoanData.monthsToPay,
        totalLoan: adminApprovedLoanData.totalLoan,
        status: false
    });

    ref.set({
        Name: loanApplicationData.Name,
        Branch: loanApplicationData.Branch,
        Active: false,
        Birthdate: loanApplicationData.Birthdate,
        Gender: loanApplicationData.Gender,
        NumberOfDependents: loanApplicationData.NumberOfDependents,
        SpouseName: loanApplicationData.SpouseName,
        SpouseAge: loanApplicationData.SpouseAge,
        Address: loanApplicationData.Address,
        LengthOfStay: loanApplicationData.LengthOfStay,
        TypeOfStay: loanApplicationData.TypeOfStay,
        Employer: loanApplicationData.Employer,
        EmplpoyerAddress: loanApplicationData.EmplpoyerAddress,
        LengthOfService: loanApplicationData.LengthOfService,
        Position: loanApplicationData.Position,
        EmploymentStatus: loanApplicationData.EmploymentStatus,
        SalaryPerMonth: loanApplicationData.SalaryPerMonth,
        NameOfSupervisor: loanApplicationData.NameOfSupervisor,
        Firm: loanApplicationData.Firm,
        NatureOfBusiness: loanApplicationData.NatureOfBusiness,
        Rent: loanApplicationData.Rent,
        FoodAndClothing: loanApplicationData.FoodAndClothing,
        Schooling: loanApplicationData.Schooling,
        Others: loanApplicationData.Others,
        MonthlyIncome: loanApplicationData.MonthlyIncome,
        YearlyNetIncome: loanApplicationData.YearlyNetIncome,
        EmploymentAmmountNumber: loanApplicationData.EmploymentAmmountNumber,
        EmploymentAmmountNumberSpouse: loanApplicationData.EmploymentAmmountNumberSpouse,
        BusinessAmmountNumberSpouse: loanApplicationData.BusinessAmmountNumberSpouse,
        OtherAmmountNumberSpouse: loanApplicationData.OtherAmmountNumberSpouse,
        BusinessAmmountNumber: loanApplicationData.BusinessAmmountNumber,
        OtherAmmountNumber: loanApplicationData.OtherAmmountNumber,
        Loan: loanApplicationData.Loan,
        MonthsToPay:  loanApplicationData.MonthsToPay,
        Interest: loanApplicationData.Interest,
        TotalLoan: loanApplicationData.TotalLoan,
        DailyPayment: loanApplicationData.DailyPayment,
        DateLoanApplied: loanApplicationData.DateLoanApplied,
        Status: loanApplicationData.Status,
        AdminStatus: loanApplicationData.AdminStatus,
        ValidID: loanApplicationData.ValidID,
        incomeStatement: loanApplicationData.incomeStatement,
        loanReleased: loanApplicationData.loanReleased,
        dateReleased: loanApplicationData.dateReleased,
        Balance: loanApplicationData.Balance,
        Reasons: "Fully Paid"
    });

    console.log("Close Loan");
}

function collectPayment(){
    $("#tb1").dataTable().fnDestroy();
    var myDate = new Date().toISOString();
    var currentDate = adminApprovedLoanData.dateToPay = new Date();
    currentDate.setDate(currentDate.getDate() + 1);
    
    let myPayment = $('#payment').val();
    
    var remainingBalance = (loanApplicationData.Balance - myPayment);
    var dailyData =( 30 * loanApplicationData.MonthsToPay);
    var dailyPayment = (remainingBalance / dailyData).toFixed(2)

    let ref = firebase.database().ref('loan application/' + key + '/' + keyPush);
    ref.set({
        Name: loanApplicationData.Name,
        Branch: loanApplicationData.Branch,
        Active: loanApplicationData.Active,
        Birthdate: loanApplicationData.Birthdate,
        Gender: loanApplicationData.Gender,
        NumberOfDependents: loanApplicationData.NumberOfDependents,
        SpouseName: loanApplicationData.SpouseName,
        SpouseAge: loanApplicationData.SpouseAge,
        Address: loanApplicationData.Address,
        LengthOfStay: loanApplicationData.LengthOfStay,
        TypeOfStay: loanApplicationData.TypeOfStay,
        Employer: loanApplicationData.Employer,
        EmplpoyerAddress: loanApplicationData.EmplpoyerAddress,
        LengthOfService: loanApplicationData.LengthOfService,
        Position: loanApplicationData.Position,
        EmploymentStatus: loanApplicationData.EmploymentStatus,
        SalaryPerMonth: loanApplicationData.SalaryPerMonth,
        NameOfSupervisor: loanApplicationData.NameOfSupervisor,
        Firm: loanApplicationData.Firm,
        NatureOfBusiness: loanApplicationData.NatureOfBusiness,
        Rent: loanApplicationData.Rent,
        FoodAndClothing: loanApplicationData.FoodAndClothing,
        Schooling: loanApplicationData.Schooling,
        Others: loanApplicationData.Others,
        MonthlyIncome: loanApplicationData.MonthlyIncome,
        YearlyNetIncome: loanApplicationData.YearlyNetIncome,
        EmploymentAmmountNumber: loanApplicationData.EmploymentAmmountNumber,
        EmploymentAmmountNumberSpouse: loanApplicationData.EmploymentAmmountNumberSpouse,
        BusinessAmmountNumberSpouse: loanApplicationData.BusinessAmmountNumberSpouse,
        OtherAmmountNumberSpouse: loanApplicationData.OtherAmmountNumberSpouse,
        BusinessAmmountNumber: loanApplicationData.BusinessAmmountNumber,
        OtherAmmountNumber: loanApplicationData.OtherAmmountNumber,
        Loan: loanApplicationData.Loan,
        MonthsToPay:  loanApplicationData.MonthsToPay,
        Interest: loanApplicationData.Interest,
        TotalLoan: loanApplicationData.TotalLoan,
        DailyPayment: loanApplicationData.DailyPayment,
        DateLoanApplied: loanApplicationData.DateLoanApplied,
        Status: loanApplicationData.Status,
        AdminStatus: loanApplicationData.AdminStatus,
        ValidID: loanApplicationData.ValidID,
        incomeStatement: loanApplicationData.incomeStatement,
        loanReleased: loanApplicationData.loanReleased,
        dateReleased: loanApplicationData.dateReleased,
        Balance: remainingBalance,
    }).then(() => {
        alert("Success");
    });

    let secondRef = firebase.database().ref('admin approved loan/' + dataKey);
    secondRef.set({
        collector: adminApprovedLoanData.collector,
        collectorKey: adminApprovedLoanData.collectorKey,
        LoanKey: adminApprovedLoanData.LoanKey,
        clientName: adminApprovedLoanData.clientName,
        finalLoan: adminApprovedLoanData.finalLoan,
        comment: adminApprovedLoanData.comment,
        dateApproved: adminApprovedLoanData.dateApproved,
        address: adminApprovedLoanData.address,
        DailyPayment: loanApplicationData.DailyPayment,
        dateToPay: currentDate.toISOString(),
        interest: adminApprovedLoanData.interest,
        keyToPush: adminApprovedLoanData.keyToPush,
        managerKey: adminApprovedLoanData.managerKey,
        managerName: adminApprovedLoanData.managerName,
        monthsToPay: adminApprovedLoanData.monthsToPay,
        totalLoan: remainingBalance
    });

    let thirdRef = firebase.database().ref('payment/' + key);
    thirdRef.push({
        collectionDate: myDate,
        ammount: myPayment,
        dataKey: key,
        nextPayment: loanApplicationData.DailyPayment,
        penalty: "",
        balance: remainingBalance
    }).then(() => {
        if(loanApplicationData.Balance <= 0){
            closeLoan();
            console.log("LESS THAN");
        }
        location.reload();
    });
}

function penalty(){
    $("#tb1").dataTable().fnDestroy();
    var alertCtrl = confirm("Are you sure to give penalty? ");

        if (alertCtrl == true) {
            var myDate = new Date().toISOString();
            var currentDate = adminApprovedLoanData.dateToPay = new Date();
            currentDate.setDate(currentDate.getDate() + 1);
            let ref = firebase.database().ref('loan application/' + key + '/' + keyPush);
            let newLoan = loanApplicationData.Loan.substr(1);
            let finalNewLoan = newLoan.replace(/,/g, '');
            console.log(newLoan);
            let penalty = (parseInt(finalNewLoan) * .01).toFixed(2);
            let totalPenalty = (parseInt(loanApplicationData.Balance) + parseInt(penalty));
            let totalBal = (parseInt(penalty) + parseInt(adminApprovedLoanData.totalLoan));
            console.log("Total Balance is: " + totalBal);

            var dailyData =( 30 * loanApplicationData.MonthsToPay);
            var dailyPayment = (parseInt(loanApplicationData.DailyPayment) + parseInt(adminApprovedLoanData.DailyPayment) + parseInt(penalty));
    
            console.log("The 1% of " + loanApplicationData.Loan + " is " + penalty + " and added to your next payment for " + dailyPayment);
            ref.set({
                Name: loanApplicationData.Name,
                Branch: loanApplicationData.Branch,
                Active: loanApplicationData.Active,
                Birthdate: loanApplicationData.Birthdate,
                Gender: loanApplicationData.Gender,
                NumberOfDependents: loanApplicationData.NumberOfDependents,
                SpouseName: loanApplicationData.SpouseName,
                SpouseAge: loanApplicationData.SpouseAge,
                Address: loanApplicationData.Address,
                LengthOfStay: loanApplicationData.LengthOfStay,
                TypeOfStay: loanApplicationData.TypeOfStay,
                Employer: loanApplicationData.Employer,
                EmplpoyerAddress: loanApplicationData.EmplpoyerAddress,
                LengthOfService: loanApplicationData.LengthOfService,
                Position: loanApplicationData.Position,
                EmploymentStatus: loanApplicationData.EmploymentStatus,
                SalaryPerMonth: loanApplicationData.SalaryPerMonth,
                NameOfSupervisor: loanApplicationData.NameOfSupervisor,
                Firm: loanApplicationData.Firm,
                NatureOfBusiness: loanApplicationData.NatureOfBusiness,
                Rent: loanApplicationData.Rent,
                FoodAndClothing: loanApplicationData.FoodAndClothing,
                Schooling: loanApplicationData.Schooling,
                Others: loanApplicationData.Others,
                MonthlyIncome: loanApplicationData.MonthlyIncome,
                YearlyNetIncome: loanApplicationData.YearlyNetIncome,
                EmploymentAmmountNumber: loanApplicationData.EmploymentAmmountNumber,
                EmploymentAmmountNumberSpouse: loanApplicationData.EmploymentAmmountNumberSpouse,
                BusinessAmmountNumberSpouse: loanApplicationData.BusinessAmmountNumberSpouse,
                OtherAmmountNumberSpouse: loanApplicationData.OtherAmmountNumberSpouse,
                BusinessAmmountNumber: loanApplicationData.BusinessAmmountNumber,
                OtherAmmountNumber: loanApplicationData.OtherAmmountNumber,
                Loan: loanApplicationData.Loan,
                MonthsToPay:  loanApplicationData.MonthsToPay,
                Interest: loanApplicationData.Interest,
                TotalLoan: loanApplicationData.TotalLoan,
                DailyPayment: loanApplicationData.DailyPayment,
                DateLoanApplied: loanApplicationData.DateLoanApplied,
                Status: loanApplicationData.Status,
                AdminStatus: loanApplicationData.AdminStatus,
                ValidID: loanApplicationData.ValidID,
                incomeStatement: loanApplicationData.incomeStatement,
                loanReleased: loanApplicationData.loanReleased,
                dateReleased: loanApplicationData.dateReleased,
                Balance: totalBal,
            });

            let secondRef = firebase.database().ref('admin approved loan/' + dataKey);
            secondRef.set({
                collector: adminApprovedLoanData.collector,
                collectorKey: adminApprovedLoanData.collectorKey,
                LoanKey: adminApprovedLoanData.LoanKey,
                clientName: adminApprovedLoanData.clientName,
                finalLoan: adminApprovedLoanData.finalLoan,
                comment: adminApprovedLoanData.comment,
                dateApproved: adminApprovedLoanData.dateApproved,
                address: adminApprovedLoanData.address,
                DailyPayment: dailyPayment,
                dateToPay: currentDate.toISOString(),
                interest: adminApprovedLoanData.interest,
                keyToPush: adminApprovedLoanData.keyToPush,
                managerKey: adminApprovedLoanData.managerKey,
                managerName: adminApprovedLoanData.managerName,
                monthsToPay: adminApprovedLoanData.monthsToPay,
                totalLoan: totalBal
            });

            let thirdRef = firebase.database().ref('payment/' + key);
            thirdRef.push({
                collectionDate: myDate,
                ammount: "Penalty",
                dataKey: key,
                nextPayment: dailyPayment,
                penalty: penalty,
                balance: totalBal
            }).then(() => {
                location.reload();
            });
        }
}

function returnData(){
    location.reload();
    $('#data1').hide(); 
    $('#data2').show();
}
