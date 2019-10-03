// Nav Buttons
var contactBtn = document.getElementById("contact")
var calendarBtn = document.getElementById("calendar")
var inquiryBtn = document.getElementById("inquiry")
var paymentBtn = document.getElementById("payment")

// Content Screens
var contactScreen = document.getElementById("contactScreen")
var calendarScreen = document.getElementById("calendarScreen")
var inquiryScreen = document.getElementById("inquiryScreen")
var paymentScreen = document.getElementById("paymentScreen")

window.onload = function () {
    const contactBtn = document.querySelector('#contact')
    contactBtn.onclick = switchToContact
    const calendarBtn = document.querySelector('#calendar')
    calendarBtn.onclick = switchToCalendar
    const inquiryBtn = document.querySelector('#inquiry')
    inquiryBtn.onclick = switchToInquiry
    const paymentBtn = document.querySelector('#payment')
    paymentBtn.onclick = switchToPayment
}

const switchToContact = function(e) {
    e.preventDefault()
    
    contactScreen.style.display = 'block'
    calendarScreen.style.display = 'none'
    inquiryScreen.style.display = 'none'
    paymentScreen.style.display = 'none'

    console.log("Contact")
}

const switchToCalendar = function(e) {
    e.preventDefault()
    
    contactScreen.style.display = 'none'
    calendarScreen.style.display = 'block'
    inquiryScreen.style.display = 'none'
    paymentScreen.style.display = 'none'

    console.log("Calendar")
}

const switchToInquiry = function(e) {
    e.preventDefault()
    
    contactScreen.style.display = 'none'
    calendarScreen.style.display = 'none'
    inquiryScreen.style.display = 'block'
    paymentScreen.style.display = 'none'

    console.log("Inquiry")
}

const switchToPayment = function(e) {
    e.preventDefault()
    
    contactScreen.style.display = 'none'
    calendarScreen.style.display = 'none'
    inquiryScreen.style.display = 'none'
    paymentScreen.style.display = 'block'

    console.log("Payment")
}


