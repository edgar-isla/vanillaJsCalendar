/**
 * Created by admin on 9/21/16.
 */
var monthH1 = document.getElementById("monthId");
var tableDiv = document.getElementById("tableDiv");
var tbl = document.createElement("table");
var tblBody = document.createElement("tbody");
var tblHead = document.createElement("thead");
var clickedOnBadge = false;
function createCalendar(model) {
    clickedOnBadge = false;
    setTotalDaysPrevMonth();
    var cellText = null;
    var daysText = null;
    var one = 1;
    var prevMonthStart = (model.prevMonthTotalDays - (model.firstDayMonthIndex - 1));  // this gets the total days in prev month and subtracts the first day index
    tbl.className = "table";
    //create elements in table head
    for (var x = 0; x < model.numCols; x++) {
        var thRow = document.createElement("th");
        thRow.className = "tableHead";
        var cellHead = document.createElement("th");
        var cellTextHead = document.createTextNode(model.daysOfWeek[x]);
        cellHead.appendChild(cellTextHead);
        thRow.appendChild(cellHead);
        tblHead.appendChild(thRow);
    }
    //create model.numRows and columns of model.numRows table
    for (var j = 0; j < model.numRows; j++) {
        var row = document.createElement("tr");
        for (var i = 0; i < model.numCols; i++) {
            var spanElem2 = document.createElement("div");
            var monthElem = document.createElement("p");
            var yearElem = document.createElement("p");
            daysText = (((7 * j) + i) - model.firstDayMonthIndex) + 1; // 7 is the row and you add i (the column).
            var cell = document.createElement("td");
            cell.className = "daysBox";
            if (daysText < 1) {   //  gets prev month's last day and subtracts the index (of day) of current month.  Then it adds one until the current month starts
                var badgeCount = 0;
                monthElem.className = "hide";
                yearElem.className="hide";
                var prevMonthIndex = model.currentMonthIndex;
                var tempYear=model.currYear;
                if (prevMonthIndex == 0) {  //if it's january then the previous month index should be 11 (december)          //next month
                    prevMonthIndex = 11;
                    tempYear=--tempYear;
                }
                else --prevMonthIndex;
                monthElem.innerHTML = prevMonthIndex;
                yearElem.innerHTML=tempYear;
                daysText = prevMonthStart;
                cellText = document.createTextNode(daysText + "");
                prevMonthStart++;
                for (var q = 0; q < model.events.length; q++) {
                    if (model.events[q].day == daysText && model.events[q].month == model.monthsInYear[prevMonthIndex] && model.events[q].year == tempYear) {
                        spanElem2.className = "badge";
                        spanElem2.innerHTML = ++badgeCount;
                    }
                }
            }
            else if (daysText > model.totalDaysMonth) {  // starts counting from one after the last day of current month
                monthElem.className = "hide";
                yearElem.className="hide";
                var badgeCount2 = 0;
                var tempMonthIndex = model.currentMonthIndex;
                var tempYear2=model.currYear;
                if (model.currentMonthIndex == 11) {  // if it's December then index should be 1 for January          //next month
                    tempMonthIndex = 0;
                    tempYear2=++tempYear2;
                }
                else tempMonthIndex = tempMonthIndex + 1;
                monthElem.innerHTML = tempMonthIndex;
                yearElem.innerHTML=tempYear2;

                daysText = one;
                cellText = document.createTextNode(daysText + "");
                for (var a = 0; a < model.events.length; a++) {
                    if (model.events[a].day == daysText && model.events[a].month == model.monthsInYear[tempMonthIndex] && model.events[a].year == tempYear2) {
                        spanElem2.className = "badge";
                        spanElem2.innerHTML = ++badgeCount2;
                    }
                }
                ++one;
            }
            else {    // puts the currents months days starting from all the way to last day of the month         // this month
                monthElem.className = "hide";
                yearElem.className="hide";
                monthElem.innerHTML = model.currentMonthIndex;
                yearElem.innerHTML=model.currYear;
                var badgeCount3 = 0;
                if (daysText == date.getDate() && (date.getMonth() == model.currentMonthIndex && model.currYear == date.getFullYear())) {
                    cell.className = "currDay";
                }
                cellText = document.createTextNode(" " + daysText + "");
                for (var z = 0; z < model.events.length; z++) {
                    if (model.events[z].day == daysText && model.events[z].month == model.monthsInYear[model.currentMonthIndex] && model.events[z].year == model.currYear) {
                        spanElem2.className = "badge";
                        spanElem2.innerHTML = ++badgeCount3;
                    }
                }
            }
            cell.appendChild(spanElem2);  // badge elem that shows up in the calendar (number of events next to day number)
            cell.appendChild(cellText);    // contains day (number)
            cell.appendChild(yearElem);     // contains the year ( had to do this because if its december then the next month's is the next year)
            cell.appendChild(monthElem);    // contains the month ( had to to this _ look above, but with the months)
            cell.onclick = function () {
                openModal(this);          // open modal with the contents of the cell in the table
            };
            row.appendChild(cell);
        }
        tblBody.appendChild(row);
    }
    tbl.appendChild(tblHead);
    tbl.appendChild(tblBody);
    tableDiv.appendChild(tbl);
}

function setMonthText() {
    var monthText = document.createTextNode(model.monthsInYear[model.currentMonthIndex] + " " + model.currYear);
    monthH1.appendChild(monthText);
}

function nextMonth() {
    if (model.currentMonthIndex < 11) {
        clearCalendar();
        ++model.currentMonthIndex;
        monthH1.removeChild(monthH1.firstChild);
        setCalendar()
    }
    else if (model.currentMonthIndex == 11) {
        clearCalendar();
        model.currentMonthIndex = 0;
        model.currYear = model.currYear + 1;
        monthH1.removeChild(monthH1.firstChild);
        setCalendar()
    }

}
function prevMonth() {
    if (model.currentMonthIndex > 0) {
        clearCalendar();
        --model.currentMonthIndex;
        monthH1.removeChild(monthH1.firstChild);
        setCalendar()
    }
    else if (model.currentMonthIndex == 0) {
        clearCalendar();
        model.currentMonthIndex = 11;
        model.currYear = model.currYear - 1;
        monthH1.removeChild(monthH1.firstChild);
        setCalendar()
    }
}
window.onload = function () {
    init();  // init() is in js/getJSON.js file
};
function setCalendar() {
    setMonthText();
    setTotalDaysMonth();
    setFirstDayMonth();
    createCalendar(model);
}
function clearCalendar() {
    tblHead.innerHTML = null;
    tblBody.innerHTML = null;
}
