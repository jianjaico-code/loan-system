const user = firebase.database().ref('user');

let myArr = [];
let myVal = [];
let chart = document.getElementById('myChart').getContext('2d');

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
                            let month = dt.getMonth()+1;
                            let dat0e = dt.getDate();
                            let year = dt.getFullYear();    
                            let date = month + " / " + dat0e +" / " + year;

                            if(data.val().Active == false){
                                if(data.val().AdminStatus == "Approved"){
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
                                        dd: dt,
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
                secondDate = myArr.reverse();
                initChart(secondDate);
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
            { "data" : "Name"},
            { "data" : "Loan", render: $.fn.dataTable.render.number( ',', '.', 0, '₱ ' ), className: "text-right" },
            { "data" : "Interest", render: $.fn.dataTable.render.number( ',', '.', 0, '₱ ' ), className: "text-right" },
            { "data" : "TotalLoan", render: $.fn.dataTable.render.number( ',', '.', 0, '₱ ' ), className: "text-right" },
            { "data" : "Interest", render: $.fn.dataTable.render.number( ',', '.', 0, '+₱ ' ) , className: "text-right"},
        ]
    });
}

function viewGraph(){
    let from = $('#from').val();
    let to = $('#to').val();

    let fromDate = new Date(from);
    let toDate = new Date(to);

    var i = 0;

    let myNewArr = [];
    myVal.map(data => {
        if(fromDate <= data.t && toDate >= data.t){
            i++;
            myNewArr.push({
                t: data.t,
                y: data.y
            });
    
            console.log(data.t);
            if(i == myVal.length){

                let growth = new Chart(chart, {
                    type: 'line',
                    data: {
                        labels: myArr,
                        datasets: [{
                            label: 'Gain',
                            data: myNewArr,
                            backgroundColor: [
                                'rgba(255, 99, 132, 0.2)',
                                'rgba(54, 162, 235, 0.2)',
                                'rgba(255, 206, 86, 0.2)',
                                'rgba(75, 192, 192, 0.2)',
                                'rgba(153, 102, 255, 0.2)',
                                'rgba(255, 159, 64, 0.2)'
                            ],
                            borderColor: [
                                'rgba(255,99,132,1)',
                                'rgba(54, 162, 235, 1)',
                                'rgba(255, 206, 86, 1)',
                                'rgba(75, 192, 192, 1)',
                                'rgba(153, 102, 255, 1)',
                                'rgba(255, 159, 64, 1)'
                            ],
                            borderWidth: 1
                        }]
                    },
                    options: {
                        scales: {
                            yAxes: [{
                                ticks: {
                                    beginAtZero:true
                                }
                            }]
                        },
            
                        layout:{
                            padding:{
                            left:50,
                            right:0,
                            bottom:0,
                            top:0
                            }
                        }
                    }
                });
            }
        }
        else{
            let growth = new Chart(chart, {
                type: 'line',
                data: {
                    labels: myNewArr,
                    datasets: [{
                        label: 'Gain',
                        data: myNewArr,
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)'
                        ],
                        borderColor: [
                            'rgba(255,99,132,1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)'
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero:true
                            }
                        }]
                    },
        
                    layout:{
                        padding:{
                        left:50,
                        right:0,
                        bottom:0,
                        top:0
                        }
                    }
                }
            });
        }
    });
}

function initChart(data){

    data.forEach(date =>{
        myArr.push(date.dd.toLocaleString());
        myVal.push({
            t: date.dd,
            y: date.Interest
        });
    });

    let growth = new Chart(chart, {
        type: 'line',
        data: {
            labels: myArr,
            datasets: [{
                label: 'Gain',
                data: myVal,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255,99,132,1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true
                    }
                }]
            },

            layout:{
                padding:{
                  left:50,
                  right:0,
                  bottom:0,
                  top:0
                }
              }
        }
    });
}