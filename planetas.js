let currentPageUrl = 'https://swapi.dev/api/planets/'

window.onload = async () => {
    try {
      await loadCharacters(currentPageUrl);
    } catch (error) {
       console.log(error);
       alert('Erro ao carregar cards');
    }

       const nextButton = document.getElementById('next-button')
       const backButton = document.getElementById('back-button')

       nextButton.addEventListener('click', loadNextPage)
       backButton.addEventListener('click', loadPreviousPage)

    };


    async function loadCharacters(url) {
        const mainContent = document.getElementById('main-content')
        mainContent.innerHTML = ''; // Limpar os resultados anteriores

        try {
            const response = await fetch(url)
            const responseJson = await response.json();

            responseJson.results.forEach((character) => {
              const card = document.createElement('div')
              card.style.backgroundImage = 
              `url('https://starwars-visualguide.com/assets/img/planets/${character.url.replace(/\D/g, "")}.jpg')`
              card.className = 'cards'

              const characterNameBG = document.createElement('div')
              characterNameBG.className = 'character-name-bg'

              const characterName = document.createElement('span')
              characterName.className = 'character-name'
              characterName.innerText = `${character.name}`

              characterNameBG.appendChild(characterName)
              card.appendChild(characterNameBG)

              card.onclick = () => {
                const modal = document.getElementById('modal')
                modal.style.visibility = 'visible'

                const modalContent = document.getElementById('modal-content')
                modalContent.innerHTML = ''

                const characterImage = document.createElement('div')
                characterImage.style.backgroundImage = 
                `url('https://starwars-visualguide.com/assets/img/planets/${character.url.replace(/\D/g, "")}.jpg')`
                characterImage.className = 'character-image'

                const name = document.createElement('span')
                name.className = 'planet-details'
                name.innerText = `nome: ${character.name}`

                const climate = document.createElement('span')
                climate.className = 'planet-details'
                climate.innerText = `clima: ${character.climate}`

                const population = document.createElement('span')
                population.className = 'planet-details'
                population.innerText = `Populacao: ${character.population}`

                modalContent.appendChild(characterImage)
                modalContent.appendChild(name)
                modalContent.appendChild(climate)
                modalContent.appendChild(population)
              }

              mainContent.appendChild(card)
            })

            const nextButton = document.getElementById('next-button')
            const backButton = document.getElementById('back-button')

            nextButton.disabled = !responseJson.next
            backButton.disabled = !responseJson.previous

            backButton.style.visibility = responseJson.previous? 'visible' : 'hidden'
            
            currentPageUrl = url

        } catch (error) {
            alert('erro ao carregar os planetas')
            console.log(error)
        }
    }

    async function loadNextPage() {
        if (!currentPageUrl) return; 

        try {
           const response = await fetch(currentPageUrl)
           const responseJson = await response.json()

           await loadCharacters(responseJson.next)

        } catch (error) {
        console.log(error)
        alert('Erro ao carregar a proxima pagina')
        }
    }

     async function loadPreviousPage() {
        if (!currentPageUrl) return; 

        try {
           const response =  await fetch(currentPageUrl)
           const responseJson = await response.json()

           await loadCharacters(responseJson.previous)
           
        } catch (error) {
        console.log(error)
        alert('Erro ao carregar a proxima anterior')
        }
    }

    function hideModal() {
        const modal = document.getElementById('modal')
        modal.style.visibility = 'hidden'
    }