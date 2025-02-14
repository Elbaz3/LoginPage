const fname = document.querySelector('.fname')
const lname = document.querySelector('.lname')
const userName = document.querySelector('.userName')
const email = document.querySelector('.email')
const pass = document.querySelector('.pass')
const button = document.querySelector('.subUP')
const signUpForm = document.querySelector('#sign-up')
const terms = document.querySelector('#terms')
const signUp = document.querySelector('.sign-up')
const logIn = document.querySelector('.log-in')
const linkToLogIn = document.querySelector('#log-in')
const linkToSignUp = document.querySelector('#signUp')
const logEmail = document.querySelector('.log-email')
const logPass = document.querySelector('.log-pass')
const logButton = document.querySelector('.subIn')
const logInForm = document.querySelector('#log-form')




// the state
let userInfo = {
      fname: '',
      lname: '',
      username: '',
      fullName: function () {
            return `${this.fname} ${this.lname}`
      },
      email: '',
      password: '',
      
}


function updateSession(key, value) {            // function to add item to session storage
      sessionStorage.setItem(key, value);
}

function setLocalStorage() {        // function to set a new user in local storage
      let users = localStorage.getItem('users');
      if (users) {
            let listUsers = JSON.parse(users)
            listUsers.push(userInfo)
            let prepare = JSON.stringify(listUsers)
            localStorage.setItem('users', prepare)
      } else {
            let firstUser = [userInfo]
            let prepare = JSON.stringify(firstUser)
            localStorage.setItem('users', prepare)
      }  
}

function checkUser (email, username) {        // function to check if the user not exist
      let users = localStorage.getItem('users')
      let listUsers = JSON.parse(users) || []
      let user = listUsers.find((user) => user.email === email || user.username === username ) || {}
      if (!listUsers.length  || !user.length) {
            return {
                  available: true,
                  message: 'user is available'
            }
      }
      if (user) {
            if (user.email === email) {
                  return {
                        available: false,
                        message: 'email already exist'
                  }
            } else {
                  return {
                        available: false,
                        message: 'username already exist'
                  }
            }

      }
      
      
}

function resetInputs() {    // function to reset fileds
      fname.value = ""
      lname.value = ""
      userName.value = ""
      email.value = ""
      pass.value = ""
      terms.checked = false
}


function putChangeEvent(element) {              // function to add an onchange event
      element ? element.addEventListener('change', (e) => {
            const val = e.target.value;
            const name = e.target.dataset.name;
            userInfo[name] = val // assign the value to the state
            updateSession(name, val)
      }) : null
}

putChangeEvent(fname)
putChangeEvent(lname)
putChangeEvent(userName)
putChangeEvent(email)
putChangeEvent(pass)

window.addEventListener("load", () => {       // retrieve fields values in the session
      let sfname = sessionStorage.getItem('fname')
      let slname = sessionStorage.getItem('lname')
      let semail = sessionStorage.getItem('email')
      let susername = sessionStorage.getItem('userName')
      let suserInfo = {
            fname: sfname,
            lname: slname,
            username: susername,
            fullName: function () {
                  return `${this.fname} ${this.lname}`
            },
            email: semail,
            password: '',  
      }
      userInfo = suserInfo    // update the state from session storage

      // put the values in the fields after reload
      sfname? fname.value = sfname : null
      slname ? lname.value = slname : null
      semail ? email.value = semail : null
      susername ? userName.value = susername : null
})

signUpForm ? signUpForm.addEventListener('submit', (e) => { 
      e.preventDefault();
      for (const key in userInfo) {
            if (!userInfo[key] || !terms.checked) {
                  return alert('all the field are required!')
            }
      }
      let userNotExist = checkUser(userInfo.email, userInfo.username)
      if(userNotExist.available) {
            setLocalStorage()
            resetInputs()
            sessionStorage.clear()
            sessionStorage.setItem('user', JSON.stringify(userInfo))
            alert("register successful!")
            window.location.pathname = '/profile.html'
            
      }else {
            alert(userNotExist.message)
      }
}) : null






// handle moveing between signup an login forms
function toggleClass(className, element1, element2) {
      element1.classList.toggle(className)
      element2.classList.toggle(className)
}

linkToLogIn ? linkToLogIn.addEventListener('click', (e) => {
      toggleClass('hidden', signUp, logIn)
}) : null

linkToSignUp ?
linkToSignUp.addEventListener('click', (e) => {
      toggleClass('hidden', signUp, logIn)
}) : null

// log in logic 

function checkLogIn(email, password) {
      let users = localStorage.getItem('users')
      let listUsers = JSON.parse(users) || []
      let user = listUsers.find((user) => user.email === email) || {}

      if (!user) {
            return {
                  correct: false,
                  message: `User doesn't exist`
            }
      }
      if (user.password !== password) {
            return {
                  correct: false,
                  message: `Wrong email or password`
            }
      }
      return {
            correct: true,
            message: `Login successful`,
            element: user
      }

}

logInForm ? logInForm.addEventListener('submit', (e) => {
      e.preventDefault()
      let email = logEmail.value
      let pass = logPass.value
      let verification = checkLogIn(email, pass)

      if (verification.correct) {
            sessionStorage.setItem('user', JSON.stringify(verification.element))
            window.location.pathname = "/profile.html"

      } else {
            alert(verification.message)
      }

      logEmail.value = ""
      logPass.value = ""
}) : null

document.addEventListener("DOMContentLoaded", () => {
      if (window.location.pathname === "/profile.html") {
          let profileName = document.querySelector("#profile .name");
          let profileUserName = document.querySelector("#profile .username");
          let profileEmail = document.querySelector("#profile .email");
          let logOut = document.querySelector("#log-out");
            if (logOut) {
            logOut.addEventListener("click", (e) => {
                  e.preventDefault()
                  sessionStorage.clear()
                  window.location.pathname = '/index.html'
            });
            }
          if (profileName && profileUserName && profileEmail) {
              let userInfo = JSON.parse(sessionStorage.getItem("user"));
              if (userInfo) {
                  profileName.textContent = `${userInfo.fname} ${userInfo.lname}`;
                  profileUserName.textContent = userInfo.username;
                  profileEmail.textContent = userInfo.email;
              }
          }
      }
  });
  
