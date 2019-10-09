console.log('manage.js')

// Screen Assets
var landlordProfileScreen = document.getElementById("landlordProfile");
var addApartmentScreen = document.getElementById("addApartment")
var apartmentInfoScreen = document.getElementById("apartmentInfo")

// when you press the management button
const refresh = function (e) {
  e.preventDefault()

  // start on profile
  loadProfile

  // load apartments
  console.log("loading apartments")
}

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

const updateProfile = function (e) {
  e.preventDefault()

  console.log("updating profile")
}

// Export functions and const
export { refresh, loadProfile, loadAddApartment, loadApartment, addApartment, updateProfile }
