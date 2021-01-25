const modal = document.getElementById('add-modal');
const backdrop = document.getElementById('backdrop');
const cancelAddMovieActionButton = modal.querySelector('.btn--passive')
const confirmAddNewMoviewButton = cancelAddMovieActionButton.nextElementSibling
const deleteModal = document.getElementById('delete-modal')

const entrySectionElement = document.getElementById('entry-text')


const movies = []

const updateEntrySectionElement = () => {
    if (movies.length === 0) {
        entrySectionElement.style.display = 'block'
    }
    else {
        entrySectionElement.style.display = 'none'
    }
}

const deleteMovie = (id) => {
    let movieIndex = 0;
    for(const movie of movies) {
        if (movie.id === id) {
            break;
        }
        movieIndex++;
    }
    movies.splice(movieIndex, 1)

    const ulElement = document.getElementById('movie-list')
    ulElement.children[movieIndex].remove()
}


const closeMovieDeletionModal = () => {
    hideBackDrop()
    deleteModal.classList.remove('visible')
}

const deleteMovieHandler = id => {    
    //console.log(id)
    deleteModal.classList.add('visible')
    toggleBackDrop()

    let cancelDeletionButton = deleteModal.querySelector('.btn--passive')
    let confirmDeletionButton = deleteModal.querySelector('.btn--danger')


    // little hack to avoid multiple deletion:
    confirmDeletionButton.replaceWith(confirmDeletionButton.cloneNode(true))
    confirmDeletionButton = deleteModal.querySelector('.btn--danger')

    cancelDeletionButton.replaceWith(cancelDeletionButton.cloneNode(true))
    cancelDeletionButton = deleteModal.querySelector('.btn--passive')

    cancelDeletionButton.addEventListener('click',() => {
        closeMovieDeletionModal()
    })

    confirmDeletionButton.addEventListener('click', () => {
        deleteMovie(id)
        closeMovieDeletionModal()
        //toggleBackDrop()
    })
}

const renderMovieElements = (id, title, imageUrl, rating) => {
    console.log('Id from renderMovieElements is ' + id)
    const newElement = document.createElement('li')
    newElement.className = 'movie-element'
    newElement.innerHTML = `
    <div class="movie-element__image">
        <img src ="${imageUrl}" alt="${title}" />
    </div>
    <div class="movie-element__info">
        <h2>
            ${title}
        </h2>
        <p>${rating}/5 stars</p>
    </div>    
    `;

    newElement.addEventListener('click',deleteMovieHandler.bind(null,id));

    const ulElement = document.getElementById('movie-list')
    ulElement.append(newElement)
}

// here we are going to fetch all input elements and store it in an array-like object:
const userInputs = modal.querySelectorAll('input')


const addMovieModal = document.querySelector('header button')

const showMovieModal = () => {
    modal.classList.add('visible')
    toggleBackDrop()
}

const closeMovieModal = () => {
    modal.classList.remove('visible')
}

const toggleBackDrop = () => {
    backdrop.classList.toggle('visible')
}

const hideBackDrop = () => {
    backdrop.classList.remove('visible')
}

const backdropClickHandler = () => {
    closeMovieModal()
    closeMovieDeletionModal()
}

const cancelAddMovieHandler = () => {
    clearUserInput()
    closeMovieModal()
}

const addNewMovieHandler = () => {
    
    const titleInput = userInputs[0].value
    const imageUrlInput = userInputs[1].value
    const ratingInput =  userInputs[2].value

    if (
        titleInput === '' ||
        imageUrlInput === '' ||
        ratingInput === '' ||
        +ratingInput < 1 ||
        +ratingInput > 5 
    ) {
        alert('Please enter valid input values (rating between 1 and 5)');
        return;
    }
    const newMovie = {
        id: Math.random().toString(),
        title: titleInput,
        image: imageUrlInput,
        rating: ratingInput
    }
    movies.push(newMovie)
    console.log(movies)
    clearUserInput()    
    closeMovieModal()
    toggleBackDrop()
    renderMovieElements(newMovie.id, newMovie.title, newMovie.image, newMovie.rating)
    updateEntrySectionElement()
}

const clearUserInput = () => {
    for (input of userInputs) {
        input.value = ''
    }
}

addMovieModal.addEventListener('click', showMovieModal)
backdrop.addEventListener('click',backdropClickHandler)
cancelAddMovieActionButton.addEventListener('click',cancelAddMovieHandler)
confirmAddNewMoviewButton.addEventListener('click',addNewMovieHandler)
