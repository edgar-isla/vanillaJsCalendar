This a calendar that events can be added to specific days of the month/year.  This was created to fulfill a project requirement
for a web development course using only plain javascript.  I could added a lot more functionality with AngularJs, but I wasn't
allowed to use any frameworks.


    The first function that onload calls is the httpRequest found in js/getJson.js that uses GET to request
the information in my JSON file under the JSON directory.  Once there is a response, the response is parsed
from JSON to a Javascript object (still in js/getJson.js).  From there the model object from js/model.js  is assigned
values from the response.  Changes should be visible if you change any of the names of the months, but
I suggest changing the month of November in the JSON file to any string/ number since it's currently November.












