const React = require('react')
const Default = require('./layouts/Default')

function error404 () {
    return (
        <Default>
            <main>
                <h1>404 page not found</h1>
                <p>better luck next time</p>
            </main>
        </Default>
    )
}

module.exports = error404