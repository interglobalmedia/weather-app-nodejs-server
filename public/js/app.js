const weatherForm = document.querySelector('form')
const search = document.querySelector('input')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const errorData = document.querySelector('.error-output')
    errorData.innerHTML = `<div class="error-result"><span>Loading ...</span></div>`
    const location = search.value
    fetch(`/weather?address=${location}`).then((res) => {
        res.json().then((data) => {
            if (data.error) {
                const errorData = document.querySelector('.error-output')
                errorData.innerHTML = `<div class="error-result"><span>Error:</span> ${data.error}</div>`
            } else {
                const weatherData = document.querySelector('.weather-output')
                weatherData.innerHTML = `<div class="weather-result"><span>Location:</span> ${data.location}<br/><span>Forecast:</span> ${data.forecast}</div>`
                errorData.innerHTML = ``
            }
        })
    })
    search.addEventListener('keydown', function (e) {
        const chord = e.keyCode || e.which
        if (chord === 8) {
            e.preventDefault()
            e.currentTarget.value = ''
            window.location.reload()
        }
    })
})
