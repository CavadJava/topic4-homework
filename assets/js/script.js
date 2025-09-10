var data = [];

function viewTransactionHistoryBtn () {
    let display = document.querySelector("div.transaction-history");
    if(display.style.display!="none"){
        document.querySelector("div.transaction-history").style.display = "none";
    } else {
        document.querySelector("div.transaction-history").style.display = "block";
    }
}

function isInsufficientBalance(balance=0) {
    if(balance>9){
        document.querySelector(".error-message").textContent = "";
        document.querySelector('.btn-withdraw').disabled = false;
        return false;
    }else{
        document.querySelector(".error-message").textContent = "Insufficient balance";
        document.querySelector(".error-message").style.color = "red";
        document.querySelector('.btn-withdraw').disabled = true;
        return true;
    }
}

function withDraw(){
    var inputAmount = document.querySelector("#current-balance").value;
    if(inputAmount<=0){
        return
    }
    var balance = document.querySelector("span#span-current-balance").textContent;
    if(balance<=0){
        return
    }
    if(isInsufficientBalance(Number(balance)-Number(inputAmount))){
        return;
    }

    document.querySelector("#span-current-balance").textContent = Number(balance)-Number(inputAmount);
    var type = "withdraw";
    data.push({amount: inputAmount, type: type, date: new Date()});
    document.querySelector("tbody#transaction-history-rows").appendChild(createRow(type, inputAmount, "red"));
}

function deposit(){
    var inputAmount = document.querySelector("#current-balance").value;
    var balance = document.querySelector("span#span-current-balance").textContent;
    if(inputAmount==0){
        return
    }
    if(balance==0 && inputAmount==0){
        return
    }

    document.querySelector("#span-current-balance").textContent = Number(balance)+Number(inputAmount);
    var type = "deposit";
    data.push({amount: inputAmount, type: type, date: new Date()});
    document.querySelector("tbody#transaction-history-rows").appendChild(createRow(type, inputAmount));
    document.querySelector(".error-message").textContent = "";
    document.querySelector('.btn-withdraw').disabled = false;
}

function createRow(type, inputAmount=0, _style='green'){
    let row = document.createElement("tr");
    let date = new Date();
    row.innerHTML = "<td>" + date.getDate() + "-" + (date.getMonth()+1) + "-" + date.getFullYear() +
        "</td><td class='text-amount' style='color: " + _style + "'>" + type +
        "</td><td>" + inputAmount +
        "</td>";
    return row;
}

function clear(){
    data = [];
    document.querySelector("span#span-current-balance").textContent = 2000;
    document.querySelector("tbody#transaction-history-rows").innerHTML = "";
    document.querySelector(".error-message").textContent = "";
    document.querySelector(".error-message").style.color = "black";
    document.querySelector(".error-message").style.backgroundColor = "white";
    document.querySelector('.btn-withdraw').disabled = false;
}