var data = (localStorage.getItem("bmiData")) ? JSON.parse(localStorage.getItem("bmiData")) : {
    bmiInfo: []
};


function dataObjectUpdated() {
    localStorage.setItem("bmiData", JSON.stringify(data));
}

function checkInput() {
    username = document.getElementById("name").value;
    return username != "";
}

function checkBMI() {
    var radios = document.getElementsByName("gender");
    for (var i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
            gender = radios[i].value;
        }
    }
    if (gender == "male") {
        if (bmi >= 20 && bmi <= 25) {
            return "Normalgewicht";
        } else if (bmi > 25) {
            return "Übergewicht";
        } else {
            return "Untergewicht";
        }
    } else {
        if (bmi >= 19 && bmi <= 24) {
            return "Normalgewicht";
        } else if (bmi > 24) {
            return "Übergewicht";
        } else {
            return "Untergewicht";
        }
    }
}

function calcBMI() {
    if (checkInput()) {
        document.getElementById("error").style.display = "none";
        document.getElementById("yourBMI").style.display = "block";
        document.getElementById("yourBMI").style.display = "block";
        weight = document.getElementById("weightSelect").value;
        height = document.getElementById("heightSelect").value / 100;
        bmi = (weight / (height * height)).toFixed(2);
        document.getElementById("yourBMI").innerHTML = "Hallo " + username + ", dein BMI: " + bmi;
        document.getElementById("status").innerHTML = "(" + checkBMI() + ")";
    } else {
        document.getElementById("error").style.display = "block";
        document.getElementById("yourBMI").style.display = "none";
        document.getElementById("status").style.display = "none";
    }
}

function addBMI() {
    var url = "http://localhost:3000/api/addBMI";
    var params = "gender=" + gender + "&weight=" + weight + "&bmi=" + bmi + "&height=" + height;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var myObj = JSON.parse(this.responseText);

            data.bmiInfo.push(myObj);
            dataObjectUpdated();

            document.getElementById("averageBMI").innerHTML = "Average BMI: " + myObj.averageBMI;
            //document.getElementById("requestsCounter").innerHTML = myObj.requests;
            

            var addToTable = document.getElementById("addToTable");
            var tableRow = document.createElement("tr");

            var genderToAdd = document.createElement("td");
            genderToAdd.innerHTML = myObj.gender;
            tableRow.appendChild(genderToAdd);

            var weightToAdd = document.createElement("td");
            weightToAdd.innerHTML = myObj.weight;
            tableRow.appendChild(weightToAdd);

            var heightToAdd = document.createElement("td");
            heightToAdd.innerHTML = myObj.height;
            tableRow.appendChild(heightToAdd);

            var BMIToAdd = document.createElement("td");
            BMIToAdd.innerHTML = myObj.bmi;
            tableRow.appendChild(BMIToAdd);

            addToTable.appendChild(tableRow);

		    document.getElementById("requestsCounter").innerHTML = document.getElementById("addToTable").childElementCount;

        }
    };
    xhttp.open("GET", url + "?" + params, true);
    xhttp.send();
}