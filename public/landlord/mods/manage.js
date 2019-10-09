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
    var firstName = data.first
    var lastName = data.last
    var phone = data.phone
    var email = data.email

    landlordName.innerText = firstName + " " + lastName
    userinfoPhone.innerText = phone
    userinfoEmail.innerText = email


    firstNameForm.placeholder = firstName
    lastNameForm.placeholder = lastName
    phoneNumberForm.placeholder = phone
    emailForm.placeholder = email

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

        // load data into queue table
        //refreshTable();
      })

    console.log("adding apartment")

    // resetForm()

    return false
  })


}

// Landlord Profile Screen
const updateProfile = function (e) {
  e.preventDefault()

  console.log("updating profile")
}

// Export functions and const
export { reset, loadProfile, loadAddApartment, loadApartment, addApartment, updateProfile }
