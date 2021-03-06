// THIS FILE IS THE CLIENT (browser) SIDE
// FETCH is not part of javascript, part of the browser API, not accessible to NodeJS

const weatherForm = document.querySelector('form')
const searchTerm = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

//messageOne.textContent = 'From JavaScript'

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()   //here this prevents default behavior, page refresh
    const url = `/weather?addr=${searchTerm.value}`   //removed localhost, this way request made to current domain

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
