
var date = new Date();  // the date object is the current date.


var model= {
    numRows: 6,
    numCols:7,
    todaysDate: date,
    currYear: date.getFullYear(),
    daysOfWeek: null,
    monthsInYear :null,
    currentMonthIndex: date.getMonth(),
    prevMonthTotalDays:null,
    prevMonthIndex: null,
    monthsAbb:null,
    nextMonthIndex: null,
    totalDaysMonth: null,   // can't set the first day  here because I need to use a reusable function.
    firstDayMonthIndex: null,  // same as above
    events: [],// these events would be dynamically created by the user.
    hours: null

};

function setTotalDaysMonth(){
    model.totalDaysMonth=new Date(model.currYear, model.currentMonthIndex+ 1, 0).getDate();
}
function setFirstDayMonth(){
    model.firstDayMonthIndex= new Date(model.currYear, model.currentMonthIndex, 1).getDay();
}
function setTotalDaysPrevMonth() {
    model.prevMonthTotalDays= new Date(model.currYear, model.currentMonthIndex,0).getDate();
}