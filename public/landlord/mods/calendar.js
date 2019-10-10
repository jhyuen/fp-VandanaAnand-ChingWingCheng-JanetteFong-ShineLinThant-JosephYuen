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

        //filteredEvents.innerHTML = "<p id='date'</p>" + date.toString().substring(4, 15) +
        // '<p id="pay" class="eventType">Payment</p>' + getPayment() +
        // '<p id="event" class="eventType">Event</p>' + getEvent() +
        // '<p id="service" class="eventType">Service</p>' + getService(date)
        let formatedDate = reformat(date.toString().substring(4, 15));
        filteredEvents.innerHTML = "<p id='date'</p>" + formatedDate +
            '<p id="pay" class="eventType">Payment</p>' + toHTML(["hi", "hello", "yo"]) +
            '<p id="event" class="eventType">Event</p>' + toHTML(["hi", "hello", "yo"]) +
            '<p id="service" class="eventType">Service</p>' + toHTML(["hi", "hello", "yo"])

        console.log(date.toString().substring(4, 15));
    });

    myCalendar.onDateRender(function(date, element, info){
        //if theres event on date
        //change color of date and/or bold
    });

}

function reformat(date){
    let month = date.substring(0, 3)
    if(month === "Jan")
        month = "01"
    else if(month === "Feb")
        month = "02"
    else if(month === "Mar")
        month = "03"
    else if(month === "Apr")
        month = "04"
    else if(month === "May")
        month = "05"
    else if(month === "Jun")
        month = "06"
    else if(month === "Jul")
        month = "07"
    else if(month === "Aug")
        month = "08"
    else if(month === "Sep")
        month = "09"
    else if(month === "Oct")
        month = "10"
    else if(month === "Nov")
        month = "11"
    else if(month === "Dec")
        month = "12"

    let day = date.substring(4, 6)
    let year = date.substring(7)
    return year + "-" + month + "-" + day;
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

function getService(date) {
    //fetch
    fetch('/getServices', {
        method: 'GET'
    }).then(function(response) {
        return response.json()
    }).then(function(eventList) {
        let filteredList = filter(eventList, date)
    })
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
