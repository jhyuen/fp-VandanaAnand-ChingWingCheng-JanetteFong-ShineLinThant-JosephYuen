console.log('calendar.js')

function calendar(element, filteredEvents) {
    let myCalendar = jsCalendar.new({
        target: element,
        monthFormat: "month YYYY"
    });

    myCalendar.onDateClick(function(event, date){
        //selecting a day
        myCalendar.clearSelected();
        myCalendar.select(date);

        //filteredEvents.innerHTML = '<p>Payment</p>' + getPayment() + '<p>Event</p>' + getEvent() + '<p>Service</p>' + getService()
        filteredEvents.innerHTML = '<p>Payment</p>' + toHTML(["hi", "hello", "yo"])
        console.log(date.toString().substring(4, 15));
    });

    myCalendar.onDateRender(function(date, element, info){
        //if theres event on date
        //change color of date and/or bold
    });

}


function getPayment() {
    // fetch('/getEvents', {
    //     method: 'GET'
    // }).then(function(response) {
    //     return response.json()
    // }).then(function (eventList) {
    //
    // })
    //let filteredList = filter(eventList, date)
    //return toHTML(filteredList)
}

function getEvent() {
    //fetch
    //let filteredList = filter(eventList, date)
    //return toHTML(filteredList)
}

function getService() {
    //fetch
    //let filteredList = filter(eventList, date)
    //for(let i = 0; i < filteredList.length; i++) {
        //
    //}
    //return toHTML(filteredList)
}

//convert filtered list to html code
function toHTML(filteredList) {
    let htmlString = '<ul>'
    for(let i = 0; i < filteredList.length; i++) {
        htmlString += '<li>' + filteredList[i] + '</li>'
    }
    htmlString += '</ul>'
    return htmlString
}

function filter(eventList, date) {
    let filteredList = []
    for(let i = 0; i < eventList.length; i++) {
        if(date === eventList[i].date) {
            filteredList.push(eventList[i])
        }
    }
    return filteredList
}

// Export functions and const
export {calendar}
