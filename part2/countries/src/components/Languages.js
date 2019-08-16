<<<<<<< HEAD
import React from 'react'

const Languages = ({country}) => {
    const showLanguages = () => {
        return country.languages.map(language => <li key={language.name}>{language.name}</li> )
    } 
    return (
        <div>
            <ul>{showLanguages()}</ul>
        </div>
    )
}

export default Languages
||||||| merged common ancestors
=======
import React from 'react'

const Languages = ({country}) => {
    const showLanguages = () => {
        return country.languages.map(language => <li key={language.name}>{language.name}</li> )
    } 
    return (
        <div>
            <ul>{showLanguages()}</ul>
        </div>
    )
}

export default Languages
>>>>>>> 4485d87913d18963e60650c66c8ab6f2831fa7f0
