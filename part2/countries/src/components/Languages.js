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
