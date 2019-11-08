let clientRef = firebase.database().ref('client');
const storage = firebase.storage();
let myKey;
let selectedFile;
let selectedFileIS;
let incomeStatementFile;
let activeStatus;

$(function() {
  $('#validID').change(function(e){
    detectValidId(e);
  });

  $('#incomeStatement').change(function(e){
    detectIncomeStatement(e)
  });
  activeStatus = false;
  initData();


  $('#loading').hide();
  // setInterval(() => {
  //   var MonthlyIncome = $('MonthlyIncome').autoNumeric('get');
    
  //   var EmploymentAmmountNumber = $('#EmploymentAmmountNumber').val();
  //   var BusinessAmmountNumber = $('#BusinessAmmountNumber').val();
  //   var LessCostOfSalesAmmountNumber = $('#LessCostOfSalesAmmountNumber').val();
  //   var OtherAmmountNumber = $('#OtherAmmountNumber').val();
  //   let loanApp = MonthlyIncome - 1;
  //   let yearly = MonthlyIncome * 12;
  //   let total = parseInt(EmploymentAmmountNumber) + parseInt(BusinessAmmountNumber) + parseInt(LessCostOfSalesAmmountNumber) + parseInt(OtherAmmountNumber);
    
  //   console.log(total);
  //   $('#OtherTotalAmmountNumber').val(total);
  //   $('#YearlyNetIncome').val(yearly);
  //   $()
  //   if(loanApp != -1){
  //     $('#loanRange').text("You can only loan up to ₱" + loanApp);   
  //   } 
  // },1000);

  let totalIncome;
  let totalExpense;
  let totalResult;
  $("#MonthlyIncome").keyup(function(e) {
    let data = $('#MonthlyIncome').autoNumeric('get');
    let yearly = data * 12;
    $('#YearlyNetIncome').autoNumeric('set', yearly); 
  });

  $("#EmploymentAmmountNumber").keyup(function(e) {
    let data1 = $('#EmploymentAmmountNumber').autoNumeric('get');
    let data2 = $('#BusinessAmmountNumber').autoNumeric('get');
    let data3 = $('#OtherAmmountNumber').autoNumeric('get');
    let data4 = $('#EmploymentAmmountNumberSpouse').autoNumeric('get');
    let data5 = $('#BusinessAmmountNumberSpouse').autoNumeric('get');
    let data6 = $('#OtherAmmountNumberSpouse').autoNumeric('get');
    let data7 =$('#Rent').autoNumeric('get');
    let data8 =$('#FoodAndClothing').autoNumeric('get');
    let data9 =$('#Schooling').autoNumeric('get');
    let data0 =$('#Others').autoNumeric('get');
    
    totalIncome = parseInt(data1) + parseInt(data2) + parseInt(data3) + parseInt(data4) + parseInt(data5) + parseInt(data6);
    totalExpense = parseInt(data7) + parseInt(data8) + parseInt(data9) + parseInt(data0);

    totalResult = totalIncome - totalExpense;

    $('#MonthlyIncome').autoNumeric('set', totalResult);
    let data = $('#MonthlyIncome').autoNumeric('get');
    let yearly = data * 12;
    $('#YearlyNetIncome').autoNumeric('set', yearly); 
  });

  $("#BusinessAmmountNumber").keyup(function(e) {
    let data1 = $('#EmploymentAmmountNumber').autoNumeric('get');
    let data2 = $('#BusinessAmmountNumber').autoNumeric('get');
    let data3 = $('#OtherAmmountNumber').autoNumeric('get');
    let data4 = $('#EmploymentAmmountNumberSpouse').autoNumeric('get');
    let data5 = $('#BusinessAmmountNumberSpouse').autoNumeric('get');
    let data6 = $('#OtherAmmountNumberSpouse').autoNumeric('get');
    let data7 =$('#Rent').autoNumeric('get');
    let data8 =$('#FoodAndClothing').autoNumeric('get');
    let data9 =$('#Schooling').autoNumeric('get');
    let data0 =$('#Others').autoNumeric('get');
    
    totalIncome = parseInt(data1) + parseInt(data2) + parseInt(data3) + parseInt(data4) + parseInt(data5) + parseInt(data6);
    totalExpense = parseInt(data7) + parseInt(data8) + parseInt(data9) + parseInt(data0);

    totalResult = totalIncome - totalExpense;

    $('#MonthlyIncome').autoNumeric('set', totalResult);
    let data = $('#MonthlyIncome').autoNumeric('get');
    let yearly = data * 12;
    $('#YearlyNetIncome').autoNumeric('set', yearly); 
  });

  $("#OtherAmmountNumber").keyup(function(e) {
    let data1 = $('#EmploymentAmmountNumber').autoNumeric('get');
    let data2 = $('#BusinessAmmountNumber').autoNumeric('get');
    let data3 = $('#OtherAmmountNumber').autoNumeric('get');
    let data4 = $('#EmploymentAmmountNumberSpouse').autoNumeric('get');
    let data5 = $('#BusinessAmmountNumberSpouse').autoNumeric('get');
    let data6 = $('#OtherAmmountNumberSpouse').autoNumeric('get');
    let data7 =$('#Rent').autoNumeric('get');
    let data8 =$('#FoodAndClothing').autoNumeric('get');
    let data9 =$('#Schooling').autoNumeric('get');
    let data0 =$('#Others').autoNumeric('get');
    
    totalIncome = parseInt(data1) + parseInt(data2) + parseInt(data3) + parseInt(data4) + parseInt(data5) + parseInt(data6);
    totalExpense = parseInt(data7) + parseInt(data8) + parseInt(data9) + parseInt(data0);

    totalResult = totalIncome - totalExpense;

    $('#MonthlyIncome').autoNumeric('set', totalResult);
    let data = $('#MonthlyIncome').autoNumeric('get');
    let yearly = data * 12;
    $('#YearlyNetIncome').autoNumeric('set', yearly); 
  });

  $("#EmploymentAmmountNumberSpouse").keyup(function(e) {
    let data1 = $('#EmploymentAmmountNumber').autoNumeric('get');
    let data2 = $('#BusinessAmmountNumber').autoNumeric('get');
    let data3 = $('#OtherAmmountNumber').autoNumeric('get');
    let data4 = $('#EmploymentAmmountNumberSpouse').autoNumeric('get');
    let data5 = $('#BusinessAmmountNumberSpouse').autoNumeric('get');
    let data6 = $('#OtherAmmountNumberSpouse').autoNumeric('get');
    let data7 =$('#Rent').autoNumeric('get');
    let data8 =$('#FoodAndClothing').autoNumeric('get');
    let data9 =$('#Schooling').autoNumeric('get');
    let data0 =$('#Others').autoNumeric('get');
    
    totalIncome = parseInt(data1) + parseInt(data2) + parseInt(data3) + parseInt(data4) + parseInt(data5) + parseInt(data6);
    totalExpense = parseInt(data7) + parseInt(data8) + parseInt(data9) + parseInt(data0);

    totalResult = totalIncome - totalExpense;

    $('#MonthlyIncome').autoNumeric('set', totalResult);
    let data = $('#MonthlyIncome').autoNumeric('get');
    let yearly = data * 12;
    $('#YearlyNetIncome').autoNumeric('set', yearly);  
  });

  $("#BusinessAmmountNumberSpouse").keyup(function(e) {
    let data1 = $('#EmploymentAmmountNumber').autoNumeric('get');
    let data2 = $('#BusinessAmmountNumber').autoNumeric('get');
    let data3 = $('#OtherAmmountNumber').autoNumeric('get');
    let data4 = $('#EmploymentAmmountNumberSpouse').autoNumeric('get');
    let data5 = $('#BusinessAmmountNumberSpouse').autoNumeric('get');
    let data6 = $('#OtherAmmountNumberSpouse').autoNumeric('get');
    let data7 =$('#Rent').autoNumeric('get');
    let data8 =$('#FoodAndClothing').autoNumeric('get');
    let data9 =$('#Schooling').autoNumeric('get');
    let data0 =$('#Others').autoNumeric('get');
    
    totalIncome = parseInt(data1) + parseInt(data2) + parseInt(data3) + parseInt(data4) + parseInt(data5) + parseInt(data6);
    totalExpense = parseInt(data7) + parseInt(data8) + parseInt(data9) + parseInt(data0);

    totalResult = totalIncome - totalExpense;

    $('#MonthlyIncome').autoNumeric('set', totalResult);
    let data = $('#MonthlyIncome').autoNumeric('get');
    let yearly = data * 12;
    $('#YearlyNetIncome').autoNumeric('set', yearly);  
  });

  $("#OtherAmmountNumberSpouse").keyup(function(e) {
    let data1 = $('#EmploymentAmmountNumber').autoNumeric('get');
    let data2 = $('#BusinessAmmountNumber').autoNumeric('get');
    let data3 = $('#OtherAmmountNumber').autoNumeric('get');
    let data4 = $('#EmploymentAmmountNumberSpouse').autoNumeric('get');
    let data5 = $('#BusinessAmmountNumberSpouse').autoNumeric('get');
    let data6 = $('#OtherAmmountNumberSpouse').autoNumeric('get');
    let data7 =$('#Rent').autoNumeric('get');
    let data8 =$('#FoodAndClothing').autoNumeric('get');
    let data9 =$('#Schooling').autoNumeric('get');
    let data0 =$('#Others').autoNumeric('get');
    
    totalIncome = parseInt(data1) + parseInt(data2) + parseInt(data3) + parseInt(data4) + parseInt(data5) + parseInt(data6);
    totalExpense = parseInt(data7) + parseInt(data8) + parseInt(data9) + parseInt(data0);

    totalResult = totalIncome - totalExpense;

    $('#MonthlyIncome').autoNumeric('set', totalResult);
    let data = $('#MonthlyIncome').autoNumeric('get');
    let yearly = data * 12;
    $('#YearlyNetIncome').autoNumeric('set', yearly); 

  });

  $("#Rent").keyup(function(e) {
    let data1 = $('#EmploymentAmmountNumber').autoNumeric('get');
    let data2 = $('#BusinessAmmountNumber').autoNumeric('get');
    let data3 = $('#OtherAmmountNumber').autoNumeric('get');
    let data4 = $('#EmploymentAmmountNumberSpouse').autoNumeric('get');
    let data5 = $('#BusinessAmmountNumberSpouse').autoNumeric('get');
    let data6 = $('#OtherAmmountNumberSpouse').autoNumeric('get');
    let data7 =$('#Rent').autoNumeric('get');
    let data8 =$('#FoodAndClothing').autoNumeric('get');
    let data9 =$('#Schooling').autoNumeric('get');
    let data0 =$('#Others').autoNumeric('get');
    
    totalIncome = parseInt(data1) + parseInt(data2) + parseInt(data3) + parseInt(data4) + parseInt(data5) + parseInt(data6);
    totalExpense = parseInt(data7) + parseInt(data8) + parseInt(data9) + parseInt(data0);

    totalResult = totalIncome - totalExpense;

    $('#MonthlyIncome').autoNumeric('set', totalResult);
    let data = $('#MonthlyIncome').autoNumeric('get');
    let yearly = data * 12;
    $('#YearlyNetIncome').autoNumeric('set', yearly); 

  });

  $("#FoodAndClothing").keyup(function(e) {
    let data1 = $('#EmploymentAmmountNumber').autoNumeric('get');
    let data2 = $('#BusinessAmmountNumber').autoNumeric('get');
    let data3 = $('#OtherAmmountNumber').autoNumeric('get');
    let data4 = $('#EmploymentAmmountNumberSpouse').autoNumeric('get');
    let data5 = $('#BusinessAmmountNumberSpouse').autoNumeric('get');
    let data6 = $('#OtherAmmountNumberSpouse').autoNumeric('get');
    let data7 =$('#Rent').autoNumeric('get');
    let data8 =$('#FoodAndClothing').autoNumeric('get');
    let data9 =$('#Schooling').autoNumeric('get');
    let data0 =$('#Others').autoNumeric('get');
    
    totalIncome = parseInt(data1) + parseInt(data2) + parseInt(data3) + parseInt(data4) + parseInt(data5) + parseInt(data6);
    totalExpense = parseInt(data7) + parseInt(data8) + parseInt(data9) + parseInt(data0);

    totalResult = totalIncome - totalExpense;

    $('#MonthlyIncome').autoNumeric('set', totalResult);
    let data = $('#MonthlyIncome').autoNumeric('get');
    let yearly = data * 12;
    $('#YearlyNetIncome').autoNumeric('set', yearly); 

  });

  $("#Schooling").keyup(function(e) {
    let data1 = $('#EmploymentAmmountNumber').autoNumeric('get');
    let data2 = $('#BusinessAmmountNumber').autoNumeric('get');
    let data3 = $('#OtherAmmountNumber').autoNumeric('get');
    let data4 = $('#EmploymentAmmountNumberSpouse').autoNumeric('get');
    let data5 = $('#BusinessAmmountNumberSpouse').autoNumeric('get');
    let data6 = $('#OtherAmmountNumberSpouse').autoNumeric('get');
    let data7 =$('#Rent').autoNumeric('get');
    let data8 =$('#FoodAndClothing').autoNumeric('get');
    let data9 =$('#Schooling').autoNumeric('get');
    let data0 =$('#Others').autoNumeric('get');
    
    totalIncome = parseInt(data1) + parseInt(data2) + parseInt(data3) + parseInt(data4) + parseInt(data5) + parseInt(data6);
    totalExpense = parseInt(data7) + parseInt(data8) + parseInt(data9) + parseInt(data0);

    totalResult = totalIncome - totalExpense;

    $('#MonthlyIncome').autoNumeric('set', totalResult);
    let data = $('#MonthlyIncome').autoNumeric('get');
    let yearly = data * 12;
    $('#YearlyNetIncome').autoNumeric('set', yearly); 

  });

  $("#Others").keyup(function(e) {
    let data1 = $('#EmploymentAmmountNumber').autoNumeric('get');
    let data2 = $('#BusinessAmmountNumber').autoNumeric('get');
    let data3 = $('#OtherAmmountNumber').autoNumeric('get');
    let data4 = $('#EmploymentAmmountNumberSpouse').autoNumeric('get');
    let data5 = $('#BusinessAmmountNumberSpouse').autoNumeric('get');
    let data6 = $('#OtherAmmountNumberSpouse').autoNumeric('get');
    let data7 =$('#Rent').autoNumeric('get');
    let data8 =$('#FoodAndClothing').autoNumeric('get');
    let data9 =$('#Schooling').autoNumeric('get');
    let data0 =$('#Others').autoNumeric('get');
    
    totalIncome = parseInt(data1) + parseInt(data2) + parseInt(data3) + parseInt(data4) + parseInt(data5) + parseInt(data6);
    totalExpense = parseInt(data7) + parseInt(data8) + parseInt(data9) + parseInt(data0);

    totalResult = totalIncome - totalExpense;

    $('#MonthlyIncome').autoNumeric('set', totalResult);
    let data = $('#MonthlyIncome').autoNumeric('get');
    let yearly = data * 12;
    $('#YearlyNetIncome').autoNumeric('set', yearly); 

  });

  $("#SalaryPerMonth").keyup(function(e) {
    let asd = $('#SalaryPerMonth').autoNumeric('get');
    $('#EmploymentAmmountNumber').autoNumeric('set', asd);
  });

  $('#Loan').autoNumeric('init',{
    vMax: '999999999.99',
    vMin: '-9999999999.99'
  });  
  $('#SalaryPerMonth').autoNumeric('init',{
    vMax: '999999999.99',
    vMin: '-9999999999.99'
  });

  $('#Rent').autoNumeric('init',{
    vMax: '999999999.99',
    vMin: '-9999999999.99'
  });
  $('#FoodAndClothing').autoNumeric('init',{
    vMax: '999999999.99',
    vMin: '-9999999999.99'
  });
  $('#Schooling').autoNumeric('init',{
    vMax: '999999999.99',
    vMin: '-9999999999.99'
  });
  $('#Others').autoNumeric('init',{
    vMax: '999999999.99',
    vMin: '-9999999999.99'
  });

  $('#MonthlyIncome').autoNumeric('init',{
    vMax: '999999999.99',
    vMin: '-9999999999.99'
  });
  $('#YearlyNetIncome').autoNumeric('init',{
    vMax: '999999999.99',
    vMin: '-9999999999.99'
  });

  $('#EmploymentAmmountNumber').autoNumeric('init',{
    vMax: '999999999.99',
    vMin: '-9999999999.99'
  });
  $('#BusinessAmmountNumber').autoNumeric('init',{
    vMax: '999999999.99',
    vMin: '-9999999999.99'
  });
  $('#OtherAmmountNumber').autoNumeric('init',{
    vMax: '999999999.99',
    vMin: '-9999999999.99'
  });
  $('#EmploymentAmmountNumberSpouse').autoNumeric('init',{
    vMax: '999999999.99',
    vMin: '-9999999999.99'
  });
  $('#BusinessAmmountNumberSpouse').autoNumeric('init',{
    vMax: '999999999.99',
    vMin: '-9999999999.99'
  });
  $('#OtherAmmountNumberSpouse').autoNumeric('init',{
    vMax: '999999999.99',
    vMin: '-9999999999.99'
  });
});

function detectValidId(e) {
  selectedFile = e.target.files[0];
  console.log(selectedFile);
}

function detectIncomeStatement(e) {
  selectedFileIS = e.target.files[0];
}

function initData(){
  clientRef.on('value', data => {
    data.forEach(data => {
      if(data.key == firebase.auth().currentUser.uid){
        myKey = data.key;
        $('#Name').val(data.val().Name);
        $('#Middlename').val(data.val().Middlename);
        $('#Lastname').val(data.val().Lastname);
        $('#Birthdate').val(data.val().Birthdate);
        $('#Gender').val(data.val().Gender);
      }
    });
  });

  let ref = firebase.database().ref('loan application/');
  ref.on('value', data => {
    let arr = [];
    data.forEach(data => {
        if(data.key == myKey){
          let byRef = firebase.database().ref('loan application/' + myKey);
          byRef.on('value', data => {
              data.forEach(data => {
                console.log(data.val())
                  if(data.val().Active == true){
                    activeStatus = true;
                  }
                  else{
                    activeStatus = false;
                  }
              });
            });
        }
    });

  });
}

function applyLoan(){
  $('#loading').show();
  let Name = $('#Name').val();
  let Middlename = $('#Middlename').val();
  let Lastname = $('#Lastname').val();
  let Birthdate = $('#Birthdate').val();
  let Gender = $('#Gender').val();
  let NumberOfDependents = $('#NumberOfDependents').val();
  let SpouseName = $('#SpouseName').val();
  let SpouseAge = $('#SpouseAge').val();
  let Address = $('#Address').val();
  let LengthOfStay = $('#LengthOfStay').val();
  let TypeOfStay = $('#TypeOfStay').val();
  let Employer = $('#Employer').val();
  let EmplpoyerAddress = $('#EmplpoyerAddress').val();
  let LengthOfService = $('#LengthOfService').val();
  let Position = $('#Position').val();
  let EmploymentStatus = $('#EmploymentStatus').val();
  let SalaryPerMonth = $('#SalaryPerMonth').val();
  let NameOfSupervisor = $('#NameOfSupervisor').val();
  let Firm = $('#Firm').val();
  let NatureOfBusiness = $('#NatureOfBusiness').val();
  let EmploymentAmmountNumber = $('#EmploymentAmmountNumber').val();
  let EmploymentAmmountNumberSpouse = $('#EmploymentAmmountNumberSpouse').val();
  let BusinessAmmountNumber = $('#BusinessAmmountNumber').val();
  let BusinessAmmountNumberSpouse = $('#BusinessAmmountNumberSpouse').val();
  let OtherAmmountNumber = $('#OtherAmmountNumber').val();
  let OtherAmmountNumberSpouse = $('#OtherAmmountNumberSpouse').val();
  let Rent = $('#Rent').val();
  let FoodAndClothing = $('#FoodAndClothing').val();
  let Schooling = $('#Schooling').val();
  let Others = $('#Others').val();
  let MonthlyIncome = $('#MonthlyIncome').val();
  let YearlyNetIncome = $('#YearlyNetIncome').val();
  let branch = $('#branch').val();
  let CoMaker = $('#CoMaker').val();
  let Loan = $('#Loan').val();
  let MonthsToPay = $('#MonthsToPay').val();

    var dateToday = new Date().toISOString();

    var ref = firebase.database().ref('loan application/' + myKey);

    let loanData = $('#Loan').autoNumeric('get');
    let monthlyData = $('#MonthlyIncome').autoNumeric('get');
    
     
    var interest = (loanData * 10 * MonthsToPay / 100); 
    var totalLoan = (parseInt(loanData) + interest);
    interest = parseFloat(interest).toFixed(2);
    totalLoan = parseFloat(totalLoan).toFixed(2);
    var dailyData = ( 30 * MonthsToPay);
    var dailyPayment = (totalLoan / dailyData).toFixed(2);
    var amortization = Math.round(totalLoan / MonthsToPay);
    console.log(interest, totalLoan, dailyData, dailyPayment);

    if(SpouseName == "" || SpouseAge == ""){
      SpouseName = "N/A";
      SpouseAge = "N/A";
    }
    else if(NumberOfDependents == ""){
      NumberOfDependents = "N/A";
    }
    if(CoMaker == ""){
      CoMaker = "No Co-Maker";
    }
    if(activeStatus == false){
      if(Math.round(monthlyData) > Math.round(loanData)){
        console.log(true);
        var validIdRef = storage.ref('Documents/' + 'ValidID');
        var incomeStatementRef = storage.ref('Documents/' + 'IncomeStatement');

        incomeStatementRef.put(selectedFileIS).then(snapshot => {
          return snapshot.ref.getDownloadURL();
        }).then(downloadURL => {
          console.log(`Successfully uploaded file and got download link for Income Statement - ${downloadURL}`);
          incomeStatementFile = downloadURL;

          validIdRef.put(selectedFile).then(snapshot => {
            return snapshot.ref.getDownloadURL();
          }).then(downloadURL => {
              console.log(`Successfully uploaded file and got download link for Valid ID- ${downloadURL}`);
              ref.push({
                Name: Name,
                Middlename: Middlename,
                Lastname: Lastname,
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
                EmploymentAmmountNumberSpouse: EmploymentAmmountNumberSpouse,
                BusinessAmmountNumberSpouse: BusinessAmmountNumberSpouse,
                OtherAmmountNumberSpouse: OtherAmmountNumberSpouse,
                EmploymentAmmountNumber: EmploymentAmmountNumber,
                BusinessAmmountNumber: BusinessAmmountNumber,
                OtherAmmountNumber: OtherAmmountNumber,
                Loan: Loan,
                MonthsToPay: MonthsToPay,
                Interest: interest,
                TotalLoan: totalLoan,
                DailyPayment: dailyPayment,
                DateLoanApplied: dateToday,
                Branch: branch,
                CoMaker: CoMaker,
                Balance: totalLoan, 
                Status: "Pending",
                AdminStatus: "Pending",
                Active: true,
                ValidID: downloadURL,
                incomeStatement: incomeStatementFile
              });
              swal({
                title: "Success",
                type: "warning",
                icon: "success"
              });
              $('#loading').hide();
              location.replace('client/index.html');
              return downloadURL;
          }).catch(error => {
            swal({
              title: "There is something wrong",
              type: "warning",
              icon: "error"
            });
            $('#loading').hide();
          });
          return downloadURL;
        }).catch(error => {
          swal({
            title: "There is something wrong",
            type: "warning",
            icon: "error"
          });
          $('#loading').hide();
        });

      }
      else{
        swal({
          title: "Your desired amount to loan should not be greater than your monthly income.",
          type: "warning",
          icon: "error"
        });
        $('#loading').hide();
      }
    }
    else{ 
      swal({
        title: "You Still have an existing Loan",
        type: "warning",
        icon: "error"
      });
      $('#loading').hide();
  }
}