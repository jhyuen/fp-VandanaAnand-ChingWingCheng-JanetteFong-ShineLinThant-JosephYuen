console.log('contact.js')

// Tenant Profile
var tenantName = document.getElementById("profileName")
var userinfoPhone = document.getElementById("userPhone")
var userinfoEmail = document.getElementById('userEmail')


var firstNameForm = document.getElementById("FirstName")
var lastNameForm = document.getElementById("LastName")
var phoneNumberForm = document.getElementById("PhoneNumber")
var emailForm = document.getElementById("Email")

var landlordName = document.getElementById("landlordName")
var landlordPhone = document.getElementById("landlordPhone")
var landlordEmail = document.getElementById("landlordEmail")

var updateProfileBtn = document.getElementsByClassName("updateBtnFun")

const reset = function () {

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

    tenantName.innerText = firstName + " " + lastName
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

    fetch('/getAdmin', {
      method: 'GET'
    }).then(function (response) {
      return response.json()
    }).then(function (data) {
      
      landlordName.innerText = data.firstName + " " + data.lastName
      landlordPhone.innerText = data.phone
      landlordEmail.innerText = data.email
    })
    console.log("reset")
  })
}

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
export { reset, updateProfile }
