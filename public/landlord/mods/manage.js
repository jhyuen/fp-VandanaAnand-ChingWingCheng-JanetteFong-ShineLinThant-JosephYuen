console.log('manage.js')

// Screen Assets
var landlordProfileScreen = document.getElementById("landlordProfile");
var addApartmentScreen = document.getElementById("addApartment")
var apartmentInfoScreen = document.getElementById("apartmentInfo")

// Landlord Profile
var landlordName = document.getElementById("profileName")
var userinfoPhone = document.getElementById("userPhone")
var userinfoEmail = document.getElementById('userEmail')


var firstNameForm = document.getElementById("FirstName")
var lastNameForm = document.getElementById("LastName")
var phoneNumberForm = document.getElementById("PhoneNumber")
var emailForm = document.getElementById("Email")

var updateProfileBtn = document.getElementsByClassName("updateBtnFun")

// Add Apartment
var apartmentAddressForm = document.getElementById("Address")
var addApartmentBtn = document.getElementsByClassName("addApartmentBtnFun")

// Apartment Info

// reset fields and refresh page
const reset = function () {

  // reset 
  fetch('/currentUser', {
    method: 'GET'
  }).then(function (response) {
    return response.json()
  }).then(function (data) {

    const welcomeTxt = document.querySelector('.welcome')
    welcomeTxt.innerText = "Welcome " + data.first + " " + data.last

    var firstName = data.first
    var lastName = data.last
    var phone = data.phone
    var email = data.email

    landlordName.innerText = firstName + " " + lastName
    userinfoPhone.innerText = phone
    userinfoEmail.innerText = email

    firstNameForm.value = firstName
    lastNameForm.value = lastName
    phoneNumberForm.value = phone
    emailForm.value = email

    firstNameForm.placeholder = firstName
    lastNameForm.placeholder = lastName
    phoneNumberForm.placeholder = phone
    emailForm.placeholder = email

    apartmentAddressForm.value = ""
    apartmentAddressForm.placeholder = "100 Institute Road"

    // load apartments

    console.log("loading apartments")

  })

}

// Load Right Screens 
const loadProfile = function (e) {
  e.preventDefault()

  // main button screens
  landlordProfileScreen.style.display = "block"
  addApartmentScreen.style.display = "none"
  apartmentInfoScreen.style.display = "none"

  console.log("loading Profile")
}

const loadAddApartment = function (e) {
  e.preventDefault()

  landlordProfileScreen.style.display = "none"
  addApartmentScreen.style.display = "block"
  apartmentInfoScreen.style.display = "none"

  console.log("loading Add Apartment")
}

const loadApartment = function (e) {
  e.preventDefault()

  landlordProfileScreen.style.display = "none"
  addApartmentScreen.style.display = "none"
  apartmentInfoScreen.style.display = "block"

  console.log("loading Apartment")
}

// Add Apartment Screen
const addApartment = function (e) {
  e.preventDefault()

  var username;

  fetch('/currentUser', {
    method: 'GET'
  }).then(function (response) {
    return response.json()
  }).then(function (data) {
    username = data.username;

    const address = document.querySelector('#Address'),
      landlord = username;

    const json = { address: address.value, landlord: landlord },
      body = JSON.stringify(json)

    // order sent to server
    fetch('/addApartment', {
      method: 'POST',
      body
    })

      .then(function (response) {
        console.log(response)

        reset()
        console.log("adding apartment")
        return false
      })
  })


}

// Landlord Profile Screen
const updateProfile = function (e) {
  e.preventDefault()

  fetch('/currentUser', {
    method: 'GET'
  }).then(function (response) {
    return response.json()
  }).then(function (data) {

    const firstNameForm = document.querySelector('#FirstName'),
      lastNameForm = document.querySelector('#LastName'),
      phoneNumberForm = document.querySelector('#PhoneNumber'),
      emailForm = document.querySelector('#Email')

    const json = { firstName: firstNameForm.value, lastName: lastNameForm.value, phone: phoneNumberForm.value, email: emailForm.value, username: data.username },
      body = JSON.stringify(json)

    // order sent to server
    fetch('/updateProfile', {
      method: 'POST',
      body
    })

      .then(function (response) {
        console.log(response)

        // load data into queue table
        reset()
        console.log("updating profile")

        return false;

      })
  })
}

// Export functions and const
export { reset, loadProfile, loadAddApartment, loadApartment, addApartment, updateProfile }
