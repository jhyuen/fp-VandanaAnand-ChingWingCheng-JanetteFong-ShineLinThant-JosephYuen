import * as mod1 from './module1.js'
import * as mod2 from './module2.js'

mod1.hello()
mod2.hello()

console.log('main.js')

function goToSignUp() {
  window.location.href = '/signup.html';
}

function goToLogin() {
  window.location.href = '/login.html';
}

const tentantReg = function(e){
    e.preventDefault()
    document.getElementById("form").style.display = ""
    document.getElementById("userType").style.display = "none"
}

const landlordReg = function(e){
    e.preventDefault()
    document.getElementById("form").style.display = ""
    document.getElementById("userType").style.display = "none"
    document.getElementById("KeyInput").style.display = "none"
}

const addUser = function(e){
    e.preventDefault()
    let firstName = document.getElementById("FirstName").value
    let lastName = document.getElementById("LastName").value
    let username = document.getElementById("Username").value
    let password = document.getElementById("Password").value
    let phoneNum = document.getElementById("PhoneNumber").value
    let email = document.getElementById("Email").value
    let key = document.getElementById("Key").value

    let user = {
        first: firstName,
        last: lastName,
        username: username,
        password: password,
        phone: phoneNum,
        email: email,
        key: key
    }

    console.log(user)
}


window.onload = function(){
    let tentant = document.getElementById("tentant")
    tentant.onclick = tentantReg
    let landlord = document.getElementById("landlord")
    landlord.onclick = landlordReg
    document.getElementById("signUp").onclick = addUser
}