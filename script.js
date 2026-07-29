const calendar = document.getElementById("calendar");

const monthTitle = document.getElementById("monthTitle");

const dateInput = document.getElementById("date");

const salesInput = document.getElementById("sales");

const saveButton = document.getElementById("saveButton");

const today = new Date();

const year = today.getFullYear();

const month = today.getMonth();

let salesData = {};

function createCalendar(){

    calendar.innerHTML="";

    monthTitle.textContent =
        `${year}年 ${month+1}月`;

    const lastDay =
        new Date(year,month+1,0).getDate();

    for(let day=1;day<=lastDay;day++){

        const cell=document.createElement("div");

        cell.className="day";

        const dateString=
        `${year}-${String(month+1).padStart(2,"0")}-${String(day).padStart(2,"0")}`;

        cell.innerHTML=`

        <div class="day-number">${day}</div>

        <div class="sales">
        ${salesData[dateString] ? "¥"+salesData[dateString] : ""}
        </div>

        `;

        cell.onclick=function(){

            dateInput.value=dateString;

        }

        calendar.appendChild(cell);

    }

}

saveButton.onclick=function(){

    if(dateInput.value=="" || salesInput.value==""){

        alert("日付と売上を入力してください");

        return;

    }

    salesData[dateInput.value]=salesInput.value;

    salesInput.value="";

    createCalendar();

}

createCalendar();