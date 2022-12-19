const toggleLoader = () => {
    const loaderHtml = document.querySelector('#loader')
    const isHidden = loaderHtml.hasAttribute('hidden')
    if (isHidden) {
        loaderHtml.removeAttribute('hidden')
    } else {
        loaderHtml.setAttribute('hidden', '')
    }
}

toggleLoader()

const photos = 'https://jsonplaceholder.typicode.com/photos'

const imageElement = (url, title) => {
    const liPhoto = document.createElement('li')
    const image = document.createElement('img')
    image.src = url
    image.classList.add('photo-item__image')
    const placeForTitle = document.createElement('h3')
    placeForTitle.classList.add('photo-item__title')
    placeForTitle.textContent = title
    liPhoto.append(image)
    liPhoto.append(placeForTitle)

    return liPhoto
}

const container = document.querySelector('#data-container')

const getFastestLoadedPhoto = (ids) => {
    const requests = ids.map(id => fetch(`${photos}/${id}`))
    Promise.race(requests)
        .then((result) => {
            const photoItemInJSON = result.json()
            return photoItemInJSON
        })
        .then((fastestPhoto) => {
            const photoHtml = imageElement(fastestPhoto.url, fastestPhoto.name)
            container.append(photoHtml)
    }).catch((error) => {
        console.log(error)
    }).finally(() => {
        toggleLoader()
    })



}

getFastestLoadedPhoto([60, 12, 55])