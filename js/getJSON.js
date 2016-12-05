

function loadJSON(callback) {
    var xobj = new XMLHttpRequest();
    xobj.open('GET', 'JSON/model.json', true);
    xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == "200") {
            callback(xobj.responseText);
        }
    };
    xobj.send(null);
}
function init() {
    loadJSON(function(response) {
        var jsonResponse = JSON.parse(response); // json object parsed into js object
        model.daysOfWeek=jsonResponse.model.days;
        model.monthsInYear=jsonResponse.model.months;
        model.hours=jsonResponse.model.hours;
        model.monthsAbb=jsonResponse.model.monthsAbbr;
        setCalendar();
    });
}