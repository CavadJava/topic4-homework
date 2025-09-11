var bankAccount = {
    balance: 2000,
    transactions: [],
    getBalance: function () {
        return this.balance;
    },
    getCurrentDate: (currentDate) => {
        return currentDate.getDate() + "- $" + (currentDate.getMonth() + 1) + "-" + currentDate.getFullYear()
    },
    deposit: function (amount) {
        this.balance += amount;
        this.transactions.push({amount: "+ $" + amount, type: "deposit", date: this.getCurrentDate(new Date())});
    },
    withdraw: function (amount) {
        this.balance -= amount;
        this.transactions.push({amount: " - $" + amount, type: "withdraw", date: this.getCurrentDate(new Date())});
    },
    checkBalance: function () {
        return this.balance > 0;
    },
    history: function () {
        return this.transactions;
    }
}

var htmlTags = {
    lastTransaction: document.querySelector("tbody#transaction-history"),
    lastTransactions: document.querySelector("tbody#last-transaction"),
}

var structure = {

    createRow: function (type, inputAmount = 0, _style = 'green') {
        let row = document.createElement("tr");
        let date = new Date();
        row.innerHTML = "<td>" + date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear() +
            "</td><td class='text-amount' style='color: " + _style + "'>" + type +
            "</td><td>" + inputAmount +
            "</td>";
        return row;
    }
}

function viewTransaction() {
    let viewTransactionHistory = bankAccount.history();
    document.querySelector("tbody#transaction-table").innerHTML = "";
    viewTransactionHistory.forEach(transaction => {
        document.querySelector("tbody#transaction-table")
            .appendChild(
                structure.createRow(transaction.type, transaction.amount, transaction.type === "withdraw" ? "red" : "green"));
    });
}

function isInsufficientBalance(balance = 0,amount=0,type) {

    let total = 0;
    if(type==="withdraw"){
        total = balance - amount;
    }else{
        total = balance + amount;
    }

    if(total<0){
        document.querySelector(".error-message").textContent = "Wrong amount";
        document.querySelector(".error-message").style.color = "red";
        document.querySelector('.btn-withdraw').disabled = true;
        return true;
    }else if(total==0){
        let status = confirm("Are you sure you want to withdraw?");
        if(status) {
            document.querySelector(".error-message").textContent = "Your balance is zero";
            document.querySelector(".error-message").style.color = "red";
            document.querySelector('.btn-withdraw').disabled = true;
            return false
        }else{
            document.querySelector(".error-message").textContent = "Deposit or Withdraw ";
            document.querySelector(".error-message").style.color = "red";
            document.querySelector('.btn-withdraw').disabled = false;
            return true
        }
        document.querySelector(".error-message").textContent = "Your balance is zero";
        document.querySelector(".error-message").style.color = "red";
        document.querySelector('.btn-withdraw').disabled = true;
        return true;
    }else if(total>0){
        document.querySelector(".error-message").textContent = "Congratulations";
        document.querySelector(".error-message").style.color = "green";
        document.querySelector('.btn-withdraw').disabled = false;
        return false;
    } else {
        document.querySelector(".error-message").textContent = "Insufficient balance";
        document.querySelector(".error-message").style.color = "red";
        document.querySelector('.btn-withdraw').disabled = true;
        return true;
    }
}

function withDrawOperation() {
    var amount = document.querySelector("#amount").value;
    if (amount <= 0) {
        return
    }
    var balance = document.querySelector("span#current-balance").textContent;
    if (balance <= 0) {
        return
    }
    if (isInsufficientBalance(Number(balance),Number(amount),'withdraw')) {
        return;
    }

    document.querySelector("#current-balance").textContent = Number(balance) - Number(amount);
    bankAccount.withdraw(amount);
    htmlTags.lastTransactions.innerHTML = "";
    htmlTags.lastTransactions.appendChild(structure.createRow("withdraw", amount, "red"));
}

function depositOperation() {
    var amount = document.querySelector("#amount").value;
    if (amount <= 0) {
        return
    }
    if (balance <= 0) {
        return
    }

    if (isInsufficientBalance(Number(balance),Number(amount),'deposit'))
        return;

    if (amount == 0) {
        return
    }
    if (balance == 0 && amount == 0) {
        return
    }

    document.querySelector("#current-balance").textContent = Number(balance) + Number(amount);
    bankAccount.deposit(amount);
    htmlTags.lastTransactions.innerHTML = "";
    htmlTags.lastTransactions.appendChild(structure.createRow("deposit", amount, "green"));
    document.querySelector('.btn-withdraw').disabled = false;
}


function reset() {
    data = [];
    document.querySelector("#amount").value = "";
    document.querySelector("span#current-balance").textContent = 2000;
    document.querySelector("tbody#last-transaction").innerHTML = "";
    document.querySelector(".error-message").textContent = "---";
    document.querySelector(".error-message").style.color = "black";
    document.querySelector(".error-message").style.backgroundColor = "white";
    document.querySelector('.btn-withdraw').disabled = false;
}