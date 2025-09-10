var data = [];

function viewTransactionHistoryBtn () {
    let display = document.querySelector("div.transaction-history");
    if(display.style.display!="none"){
        document.querySelector("div.transaction-history").style.display = "none";
    } else {
        document.querySelector("div.transaction-history").style.display = "block";
    }
}

function btnWithDraw(){
    var inputAmount = document.querySelector("#current-balance").value;
    if(inputAmount==0){
        return
    }
    var spanAmount = document.querySelector("span#span-current-balance").textContent;
    if(spanAmount==0){
        return
    }

    document.querySelector("#span-current-balance").textContent = Number(spanAmount)-Number(inputAmount);
    var type = "withdraw";
    data.push({amount: inputAmount, type: type, date: new Date()});
    document.querySelector("tbody#transaction-history-rows").appendChild(createRow(type, inputAmount, "red"));
}

function btnDeposit(){
    var inputAmount = document.querySelector("#current-balance").value;
    var spanAmount = document.querySelector("span#span-current-balance").textContent;
    if(inputAmount==0){
        return
    }
    if(spanAmount==0 && inputAmount==0){
        return
    }

    document.querySelector("#span-current-balance").textContent = Number(spanAmount)+Number(inputAmount);
    var type = "deposit";
    data.push({amount: inputAmount, type: type, date: new Date()});
    document.querySelector("tbody#transaction-history-rows").appendChild(createRow(type, inputAmount));
}

function createRow(type, inputAmount=0, _style='green'){
    let row = document.createElement("tr");
    let date = new Date();
    row.innerHTML = "<td>" + date.getDate() + "-" + (date.getMonth()+1) + "-" + date.getFullYear() +
        "</td><td class='text-amount' style='background-color: " + _style + "'>" + type +
        "</td><td>" + inputAmount +
        "</td>";
    return row;
}

function btnClear(){
    data = [];
    document.querySelector("span#span-current-balance").textContent = 2000;
    document.querySelector("tbody#transaction-history-rows").innerHTML = "";
}