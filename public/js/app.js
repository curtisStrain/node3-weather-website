// THIS FILE IS THE CLIENT (browser) SIDE
// FETCH is not part of javascript, part of the browser API, not accessible to NodeJS

console.log('Client side js loaded')   // logged by web browser console


const weatherForm = document.querySelector('form')
const searchTerm = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

//messageOne.textContent = 'From JavaScript'

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()   //here this prevents default behavior, page refresh
    const url = `http://localhost:3000/weather?addr=${searchTerm.value}`

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    fetch(url).then((response) => {
        response.json().then(data => {
            if (data.error) {

                messageOne.textContent = data.error

            } else {

                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
            }
        })
    })
})
