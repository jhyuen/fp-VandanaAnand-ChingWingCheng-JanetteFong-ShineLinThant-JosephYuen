import * as contact from './mods/contact.js'
import * as calendar from './mods/calendar.js'
import * as payment from './mods/payment.js'

contact.hello()
calendar.hello()
payment.hello()

// Nav Buttons
var contactBtn = document.getElementById("contact")
var calendarBtn = document.getElementById("calendar")
var paymentBtn = document.getElementById("payment")

// Content Screens
var contactScreen = document.getElementById("contactScreen")
var calendarScreen = document.getElementById("calendarScreen")
var paymentScreen = document.getElementById("paymentScreen")

window.onload = function () {
    const contactBtn = document.querySelector('#contact')
    contactBtn.onclick = switchToContact
    const calendarBtn = document.querySelector('#calendar')
    calendarBtn.onclick = switchToCalendar
    const paymentBtn = document.querySelector('#payment')
    paymentBtn.onclick = switchToPayment
}

const switchToContact = function(e) {
    e.preventDefault()
    
    contactScreen.style.display = 'block'
    calendarScreen.style.display = 'none'
    paymentScreen.style.display = 'none'

    console.log("Contact")
}

const switchToCalendar = function(e) {
    e.preventDefault()
    
    contactScreen.style.display = 'none'
    calendarScreen.style.display = 'block'
    paymentScreen.style.display = 'none'

    console.log("Calendar")
}

const switchToPayment = function(e) {
    e.preventDefault()
    
    contactScreen.style.display = 'none'
    calendarScreen.style.display = 'none'
    paymentScreen.style.display = 'block'

    console.log("Payment")
}


