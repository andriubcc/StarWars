let currentPageUrl = 'https://swapi.dev/api/starships/'

window.onload = async () => {
    try {
         await loadCharacters(currentPageUrl)
    } catch(error) {
        console.log(error)
        alert('Erro ao carregar os cards')
    }
}

async function loadCharacters(url) {
        const mainContent = document.getElementById('main-content')
        mainContent.innerHTML = ''

try {
    const response = await fetch(url)
    const responseJson = await response.json()

    responseJson.results.forEach((character) => {
        const card = document.createElement('div')
        card.className = 'cards'
        card.style.backgroundImage = 
        `url('https://starwars-visualguide.com/assets/img/starships/${character.url.replace(/\D/g, "")}.jpg')`

        const characterNameBG = document.createElement('div')
        characterNameBG.className = 'character-name-bg'

        const characterName = document.createElement('span')
        characterName.className = 'character-name'
        characterName.innerText = `${character.name}`

        card.appendChild(characterNameBG)
        characterNameBG.appendChild(characterName)

      card.onclick = () => {
        const modal = document.getElementById('modal')
        modal.style.visibility = 'visible'

        const modalContent = document.createElement('modal-content')
        modalContent.innerHTML = ''

        const characterImage = document.createElement('div')
        characterImage.className = 'character-image'
        characterImage.style.backgroundImage = 
        `url('https://starwars-visualguide.com/assets/img/starships/${character.url.replace(/\D/g, "")}.jpg')`

        const name = document.createElement('span')
        name.className = 'character-details'
        name.innerText = `Nome: ${character.name}`

        const manufacturer = document.createElement('span')
        manufacturer.className = 'character-details'
        manufacturer.innerText = `Nome: ${character.manufacturer}`

        const capacity = document.createElement('span')
        capacity.className = 'character-details'
        capacity.innerText = `Nome: ${character.cargo_capacity}`

        modalContent.appendChild(characteerImage)
        modalContent.appendChild(name)
        modalContent.appendChild(capacity)
        modalContent.appendChild(manufacturer)
      }

      mainContent.appendChild(card)
    })

    

} catch(error) {
    console.log(error)
    alert('Erro ao carregar as naves')
}



}