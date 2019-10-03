// Nav Buttons
var managementBtn = document.getElementById("manage")
var calendarBtn = document.getElementById("calendar")
var scheduleBtn = document.getElementById("schedule")
var inboxBtn = document.getElementById("inbox")

// Content Screens
var managementScreen = document.getElementById("managementScreen")
var calendarScreen = document.getElementById("calendarScreen")
var scheduleScreen = document.getElementById("scheduleScreen")
var inboxScreen = document.getElementById("inboxScreen")

window.onload = function () {
    const managementBtn = document.querySelector('#manage')
    managementBtn.onclick = switchToManagement
    const calendarBtn = document.querySelector('#calendar')
    calendarBtn.onclick = switchToCalendar
    const scheduleBtn = document.querySelector('#schedule')
    scheduleBtn.onclick = switchToSchedule
    const inboxBtn = document.querySelector('#inbox')
    inboxBtn.onclick = switchToInbox
}

const switchToManagement = function(e) {
    e.preventDefault()
    
    managementScreen.style.display = 'block'
    calendarScreen.style.display = 'none'
    scheduleScreen.style.display = 'none'
    inboxScreen.style.display = 'none'

    console.log("Management")
}

const switchToCalendar = function(e) {
    e.preventDefault()
    
    managementScreen.style.display = 'none'
    calendarScreen.style.display = 'block'
    scheduleScreen.style.display = 'none'
    inboxScreen.style.display = 'none'

    console.log("Calendar")
}

const switchToSchedule = function(e) {
    e.preventDefault()
    
    managementScreen.style.display = 'none'
    calendarScreen.style.display = 'none'
    scheduleScreen.style.display = 'block'
    inboxScreen.style.display = 'none'

    console.log("Schedule")
}

const switchToInbox = function(e) {
    e.preventDefault()
    
    managementScreen.style.display = 'none'
    calendarScreen.style.display = 'none'
    scheduleScreen.style.display = 'none'
    inboxScreen.style.display = 'block'

    console.log("Inbox")
}


