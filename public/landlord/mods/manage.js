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

  console.log("adding apartment")
}

const updateProfile = function (e) {
  e.preventDefault()

  console.log("updating profile")
}

// Export functions and const
export { refresh, loadProfile, loadAddApartment, loadApartment, addApartment, updateProfile }
