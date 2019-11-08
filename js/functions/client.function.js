const user = firebase.database().ref('client');
const storage = firebase.storage();

let data;
let secondData;
let selectedFile;
let key;
let loanData;
let loanActive;

$( document ).ready(function() {
    $('#documents').change(function(e){
        detectFiles(e);
    });
    $("#overlay").show();
    $('#loading').show();
    $('#data1').hide();

    initializeData();
});


function initializeData(){
    user.on('value', data => {
        data.forEach(data => {
            if(data.key == firebase.auth().currentUser.uid){
                $('#username').text(data.val().Name);
                document.title = data.val().Name + " " + data.val().Lastname;
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
                    byRef.once('value', data => {
                        data.forEach(data => {
                            let strDate = data.val().DateLoanApplied;
                            let dt = new Date(strDate);
                            let month = dt.getMonth() +1;
                            let dat0e = dt.getDate();
                            let year = dt.getFullYear();    
                            let date = month + "/" + dat0e +"/" + year;

                            if(element == firebase.auth().currentUser.uid){
                                if(data.val().Active == true){
                                    if(data.val().Balance != 0){
                                        loanActive = true;
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
                                        });
                                    }
                                }
                            }
                        });
                    });
                });
                data = myArr;
                loadPayment();
                loadedData(data);
                });
            }
        });  
    });
}

function loadPayment(){
    let ref = firebase.database().ref('payment/');
    ref.on('value', data => {
    let arr = [];
    data.forEach(data => {
        arr.push(data.key);
    });
    this.key = arr;
    let i = 1;
    let myArr = [];
    this.key.forEach(element => {
        let byRef = firebase.database().ref('payment/' + element);
        byRef.on('value', data => {
            data.forEach(data => {
                let strDate = data.val().collectionDate;
                let dt = new Date(strDate);
                let month = dt.getMonth() +1;
                let dat0e = dt.getDate();
                let dat1e = dt.getDate() +1;
                let year = dt.getFullYear();    
                let date = strDate.substring(0, 10);
                let next = month + "/" + dat1e +"/" + year;
               if(data.val().dataKey == firebase.auth().currentUser.uid){
                    if(loanActive){
                        console.log(i);
                        $('#nextPaymentLabel').text("Your next payment is: "+ next);
                        console.log(data.key);
                        myArr.push({
                            collectionDate: date,
                            ammount: data.val().ammount,
                            dataKey: data.val().dataKey,
                            nextPayment: data.val().nextPayment,
                            penalty: data.val().penalty,
                            balance: data.val().balance,
                            Day: i++
                        });
                    }
               }
            })
        })
    });
    secondData = myArr;
    loadedSecondData(secondData);
    });

}

function loadedData(data){
    var oTblReport = $("#tb1").DataTable ({
        "order": [[ 0, "desc" ]],
        "data" : data,
        "columns" : [
            { "data" : "dateString" },
            { "data" : "Loan", render: $.fn.dataTable.render.number( ',', '.', 0, '₱ ' ) , className: "text-right", decimal: ","},
            { "data" : "Interest", render: $.fn.dataTable.render.number( ',', '.', 2, '₱ ' ) , className: "text-right"},
            { "data" : "TotalLoan", render: $.fn.dataTable.render.number( ',', '.', 2, '₱ ' ) , className: "text-right"},
            { "data" : "Status" },
            { "data" : "AdminStatus" },
            { "data" : "Balance", render: $.fn.dataTable.render.number( ',', '.', 2, '₱ ' ) , className: "text-right"},
            
            {
                "data": null,
                "defaultContent": "<button type='button' class='btn''>View Loan Ledger</button>"
            }
            
        ]
    });
    

    $('#tb1 tbody').on( 'click', 'button', function () {
        var me = oTblReport.row( $(this).parents('tr') ).data();
        if(me.loanReleased == true){
            key = me.Key;
            loanData = me;
            let newData = [];
            let counter = me.MonthsToPay * 30;
            let interestPaid =  (me.Interest / counter).toFixed(2);
            
            

            $('#data1').show();
            $('#data2').hide();
            var result = new Date(me.dateReleased);
            
            var i = 1;

            while (i  <=  counter) {
                me.TotalLoan -= me.DailyPayment;
                //console.log("Day: " + i + " | " + "Daily Payment: " + me.DailyPayment + " | " + "Remaining Balance: " + me.TotalLoan + " | " + "Interest Paid: " + interestPaid);
                result.setDate(result.getDate() + 1);
    
                newData.push(
                    {
                        Day: i,
                        Date: result.getMonth()+1 + "/" + result.getDate() + "/" + result.getFullYear(),
                        DailyPayment: me.DailyPayment,
                        InterestPaid: interestPaid,
                        RemainingBalance: Math.round(me.TotalLoan).toFixed(2),
                        principal: me.DailyPayment - interestPaid //paul
                    }
                    
                )
                i++;
                if(newData.length == counter){
                    loadLedger(newData);
                }
            }
        }
        else{
            alert("Transaction is still on process");
        }
        
    });
}

function loadLedger(newData){
    $("#tb3").DataTable ({
        dom: 'Bfrtip',
        buttons: [
            'print'
        ],
        "order": [[ 0, "asc" ]],
        "data" : newData,
        "columns" : [
            { "data" : "Day" },
            { "data" : "Date"},
            { "data" : "principal", render: $.fn.dataTable.render.number( ',', '.', 2, '₱ ' ) , className: "text-right"}, //paul
            { "data" : "InterestPaid", render: $.fn.dataTable.render.number( ',', '.', 2, '₱ ' ) , className: "text-right"},
            { "data" : "DailyPayment", render: $.fn.dataTable.render.number( ',', '.', 2, '₱ ' ) , className: "text-right"},
            { "data" : "RemainingBalance", render: $.fn.dataTable.render.number( ',', '.', 2, '₱ ' ) , className: "text-right"} 
            
        ],
    });
}

function loadedSecondData(data){
    let ammountArr = [];
    var oTblReport = $("#tb2").DataTable ({
        "order": [[ 0, "desc" ]],
        "data" : data,
        "columns" : [
            { "data" : "Day"},
            { "data" : "collectionDate" },
            { "data" : "balance", render: $.fn.dataTable.render.number( ',', '.', 2, '₱ ') , className: "text-right"},
            { "data" : "nextPayment", render: $.fn.dataTable.render.number( ',', '.', 2, '₱ ') , className: "text-right"},
            { "data" : "ammount", render: $.fn.dataTable.render.number( ',', '.', 2, '₱ ' ) , className: "text-right"},
            { "data" : "penalty", render: $.fn.dataTable.render.number( ',', '.', 2, '₱ ' ), className: "text-right"}
        ]
    });

    data.map(data => {
        ammountArr.push(parseInt(data.ammount));
    });

    let sum = ammountArr.reduce((partial_sum, a) => partial_sum + a);
    console.log(sum);
}

function detectFiles(e) {
  selectedFile = e.target.files[0];
  console.log(selectedFile);
}

function returnData(){
    location.reload();
    $('#data1').hide(); 
    $('#data2').show();
}

function submitDocuments(){
    $("#tb1").dataTable().fnDestroy();
    var storageRef = storage.ref('Documents/' + key);
    var loanDatabase = firebase.database().ref('loan application/' + firebase.auth().currentUser.uid + '/' + loanData.Key);
    storageRef.put(selectedFile).then(snapshot => {
        return snapshot.ref.getDownloadURL();
    }).then(downloadURL => {
        console.log(`Successfully uploaded file and got download link - ${downloadURL}`);
        loanDatabase.set({
            Name: loanData.Name,
            Birthdate: loanData.Birthdate,
            Balance: loanData.Balance,
            Active: loanData.Active,
            Branch: loanData.Branch,
            Gender: loanData.Gender,
            NumberOfDependents: loanData.NumberOfDependents,
            SpouseName: loanData.SpouseName,
            SpouseAge: loanData.SpouseAge,
            Address: loanData.Address,
            LengthOfStay: loanData.LengthOfStay,
            TypeOfStay: loanData.TypeOfStay,
            Employer: loanData.Employer,
            EmplpoyerAddress: loanData.EmplpoyerAddress,
            LengthOfService: loanData.LengthOfService,
            Position: loanData.Position,
            EmploymentStatus: loanData.EmploymentStatus,
            SalaryPerMonth: loanData.SalaryPerMonth,
            NameOfSupervisor: loanData.NameOfSupervisor,
            Firm: loanData.Firm,
            NatureOfBusiness: loanData.NatureOfBusiness,
            Rent: loanData.Rent,
            FoodAndClothing: loanData.FoodAndClothing,
            Schooling: loanData.Schooling,
            Others: loanData.Others,
            MonthlyIncome: loanData.MonthlyIncome,
            YearlyNetIncome: loanData.YearlyNetIncome,
            EmploymentAmmountNumber: loanData.EmploymentAmmountNumber,
            EmploymentTotalAmmount: loanData.EmploymentTotalAmmount,
            BusinessAmmountNumber: loanData.BusinessAmmountNumber,
            BusinessTotalAmmount: loanData.BusinessTotalAmmount,
            LessCostOfSalesAmmountNumber: loanData.LessCostOfSalesAmmountNumber,
            LessCostOfSalesTotalAmmount: loanData.LessCostOfSalesTotalAmmount,
            OtherAmmountNumber: loanData.OtherAmmountNumber,
            OtherTotalAmmountNumber: loanData.OtherTotalAmmountNumber,
            Loan: loanData.Loan,
            MonthsToPay:  loanData.MonthsToPay,
            Interest: loanData.Interest,
            TotalLoan: loanData.TotalLoan,
            DailyPayment: loanData.DailyPayment,
            DateLoanApplied: loanData.DateLoanApplied,
            Status: loanData.Status,
            AdminStatus: loanData.AdminStatus,
            Document: downloadURL
        });
        return downloadURL;
    }).catch(error => {
        console.log(`Failed to upload file and get link - ${error}`);
    });
    console.log(loanData);
}