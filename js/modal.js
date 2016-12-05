/**
 * Created by admin on 10/18/16.
 */
var header = document.getElementById('modalHeader');
var list1 = document.getElementById("unList1");
var list2 = document.getElementById("unList2");
var list3 = document.getElementById("unList3");
var modalHour = document.getElementById("modalHour");
var inputBoxVal = document.getElementById("modalInputText");
// var inputDiv = document.getElementById("modalInput");  // was used for deleteLocalStorage
var modalList = document.getElementById("modalList");
var modalInfo = null;
localStorage.events = [];

function openModal(text) {
    var textObj=text.childNodes;
    var month=parseInt(text.lastChild.firstChild.nodeValue);
    modalInfo = {
        "month": model.monthsInYear[month],
        "day": parseInt(parseInt(textObj[1].nodeValue)),
        "year": parseInt(textObj[2].firstChild.nodeValue)
    };
    console.log(modalInfo);
    setEvents(modalInfo);
    overlay.classList.remove("is-hidden");
    hoursLoop(list1, 0);
    hoursLoop(list2, 1);
    hoursLoop(list3, 2);
    var br = document.createElement('br');
    //TODO FIX THE PREVIOUS MONTH ON MODAL
    var textHeader = document.createTextNode(model.monthsInYear[month] + " " + textObj[1].nodeValue + ", " + parseInt(textObj[2].firstChild.nodeValue));
    header.appendChild(br);
    header.appendChild(textHeader);
}

function closeModal() {
    overlay.classList.add("is-hidden");
    list1.innerHTML = "";  // delete list1
    list2.innerHTML = "";  // delete list2
    list3.innerHTML = "";  // delete list3
    header.innerHTML = "";
    modalList.innerHTML = "";
    modalHour.innerHTML = "Click on hour to add events";
}
function saveEvent() {
    if (!inputBoxVal.value == "") {
        setEvents(modalInfo);
        var hourSave = modalHour.innerHTML;
        model.events.push({
            "year": modalInfo.year,
            "month": modalInfo.month,
            "day": modalInfo.day,
            "hour": hourSave,
            "event": inputBoxVal.value
        });
        monthH1.removeChild(monthH1.firstChild);
        clearCalendar();
        setCalendar();
        inputBoxVal.value = "";
        modalHour.innerHTML = "Click on hour to add events";
        modalList.innerHTML = "";
        setEvents(modalInfo);
    }
    else
        alert("Event field cannot be blank");
}
function hoursLoop(list, listNum) {
    for (var x = 0; x < 8; x++) {  // because 24/3 is 8 (sum of all the hours in a day divided by the 3 columns)
        var btn = document.createElement("button");
        btn.className = "btn btn-primary";
        var iElem = document.createElement("i");
        iElem.className = "fa fa-plus-square";
        var hour = document.createTextNode(model.hours[listNum][x]);
        var brElem = document.createElement('br');
        btn.appendChild(hour);
        btn.appendChild(iElem);
        btn.onclick = function () {
            modalHour.innerHTML = "";
            inputBoxVal.value = "";
            var hourText = document.createTextNode(this.firstChild.nodeValue + ":");
            modalHour.appendChild(hourText);
        };
        list.appendChild(btn);
        list.appendChild(brElem);
    }
}
function setEvents(event) {
    for (var z = 0; z < model.events.length; z++) {
        var count=0;
        if (model.events[z].day == event.day && model.events[z].month == event.month && model.events[z].year == event.year) {
            var li = document.createElement('li');
            var div=document.createElement('div');
            var btn = document.createElement("button");
            btn.innerHTML="";
            btn.className = "deleteBtn";

            var deleteText = document.createTextNode("Delete ");
            var indexNode=document.createElement("p");
            indexNode.innerHTML=z+1+"";
            indexNode.className="hide";
            // var deleteText2 = document.createTextNode(z+1+"");
            // deleteText2.className="hide";
            btn.appendChild(deleteText);
            btn.appendChild(indexNode);
            // btn.appendChild(deleteText2);
            if (model.events[z].hour == "Click on hour to add events") {
                var textNode=document.createTextNode( model.events[z].event + "");
                div.appendChild(textNode);
                div.appendChild(btn);
            }
            else {
                var textNode2=document.createTextNode(model.events[z].hour + " " + model.events[z].event);
                div.appendChild(textNode2);
                div.appendChild(btn);
            }
            li.appendChild(div);
            modalList.appendChild(li);
            btn.onclick=function () {
                // console.log(this.lastChild.firstChild);
                var indexString= this.lastChild.firstChild.nodeValue;
                var indexInt=(parseInt(indexString)-1);
                    if (indexInt> -1) {
                        model.events.splice(indexInt, 1);
                    }
                modalList.innerHTML = "";
                setEvents(modalInfo);  // delete list to display new events array
                clearCalendar();      // clear calendar delete number badges
                monthH1.removeChild(monthH1 .firstChild);
                setCalendar();        // create new calendar to update the new array of events.

            }
        }
    }

}
