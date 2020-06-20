fetch(`http://localhost:3000/weather?address=!`).then((res) => {
    res.json().then((data) => {
        if (data.error) {
            console.log(data.error)
        } else {
            console.log(`${data.location} ${data.forecast}`)
        }
    })
})
