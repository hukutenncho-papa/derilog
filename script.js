const calendar = document.getElementById("calendar");

const monthTitle = document.getElementById("monthTitle");

const dateInput = document.getElementById("date");

const salesInput = document.getElementById("sales");

const saveButton = document.getElementById("saveButton");

const monthlySales =
    document.getElementById("monthlySales");

const prevMonthButton = document.getElementById("prevMonth");

const nextMonthButton = document.getElementById("nextMonth");


// 表示中の年月
let currentDate = new Date();

let year = currentDate.getFullYear();

let month = currentDate.getMonth();


// 保存データ読み込み
let salesData = JSON.parse(
    localStorage.getItem("deliLogData")
) || {};

function formatMoney(value){

    const num = Number(value);

    return (num / 1000).toFixed(1) + "K";

}

function updateMonthlySales(){

    let total = 0;


    Object.keys(salesData).forEach(function(date){

        const d = new Date(date);


        if(
            d.getFullYear() === year &&
            d.getMonth() === month
        ){

            total += Number(salesData[date]);

        }

    });


    monthlySales.textContent =
        (total / 1000).toFixed(1) + "K";

}

// カレンダー作成
function createCalendar(){

    calendar.innerHTML="";


    monthTitle.textContent =
        `${year}年 ${month+1}月`;


    const lastDay =
        new Date(year, month+1, 0).getDate();

// 月初の曜日を取得
const firstDay =
    new Date(year, month, 1).getDay();


// 空白セルを追加
for(let i=0; i<firstDay; i++){

    const blank = document.createElement("div");

    blank.className="blank";

    calendar.appendChild(blank);

}

    for(let day=1; day<=lastDay; day++){


        const cell=document.createElement("div");

        cell.className="day";


        const dateString =
        `${year}-${String(month+1).padStart(2,"0")}-${String(day).padStart(2,"0")}`;


        cell.innerHTML=`

        <div class="day-number">
        ${day}
        </div>

        <div class="sales">
       ${salesData[dateString] ? formatMoney(salesData[dateString]) : ""}
        </div>

        `;


        cell.onclick=function(){

            dateInput.value=dateString;

        };


        calendar.appendChild(cell);
        updateMonthlySales();

    }

}


// 登録ボタン
saveButton.onclick=function(){


    if(dateInput.value=="" || salesInput.value==""){

        alert("日付と売上を入力してください");

        return;

    }


    salesData[dateInput.value]
        = salesInput.value;


    // 端末保存
    localStorage.setItem(
        "deliLogData",
        JSON.stringify(salesData)
    );


    salesInput.value="";


    createCalendar();

updateMonthlySales();

};



// 前月
prevMonthButton.onclick=function(){

    month--;

    if(month < 0){

        month = 11;

        year--;

    }

    createCalendar();

updateMonthlySales();

};


// 翌月
nextMonthButton.onclick=function(){

    month++;

    if(month > 11){

        month = 0;

        year++;

    }

    createCalendar();

updateMonthlySales();

};



createCalendar();