//<div class="image-container">
//    <img src="https://scontent-lga3-1.cdninstagram.com/vp/bd9b15079ec27c52c076e9c7792bdc04/5B992309/t51.2885-15/s640x640/sh0.08/e35/c180.0.719.719/31449135_2115995735352355_6317812590797914112_n.jpg">
//    <p>
//        <img data-action="like-image" data-image-id="1" class="like-button" src="./images/like.png"><br>
//        <span id="likes-count-for-image-1">41</span>
//    </p>
//</div>


IMAGE_URL = 'http://localhost:3000/api/v1/images'
LIKES_URL = 'http://localhost:3000/api/v1/likes'
document.addEventListener('DOMContentLoaded', function () {
  const imageForm = document.getElementById('post-image-form')
  const imagesContainer = document.getElementById('container')
  const inputUrl = document.getElementById('post-image-form-url')

  function requestImages() {
    fetch(`${IMAGE_URL}`).then(response => response.json()).then(createImageDivs)
  }

  function createImageDivs(imageObjs) {
    imageObjs.forEach(imageObj => {
      let div = document.createElement('DIV')
      div.setAttribute('class',"image-container")
      div.innerHTML =
      `<img src="${imageObj.url}">
      <p>
      <img data-action="like-image" data-image-id="${imageObj.id}" class="like-button" src="./images/like.png"><br>
      <span id="likes-count-for-image-${imageObj.id}">${imageObj.likes_count}</span>
      </p>`

      imagesContainer.appendChild(div)
    })
  }

  imageForm.addEventListener('submit', function(event) {
    event.preventDefault()

    let config = {
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({url:`${inputUrl.value}`})
    }

    inputUrl.value = ''
    
    return fetch(`${IMAGE_URL}`, config).then(response => response.json()).then(renderNewImage)
  })

  function renderNewImage(imageObj) {
    let div = document.createElement('DIV')
    div.setAttribute('class',"image-container")
    div.innerHTML =
    `<img src="${imageObj.url}">
    <p>
    <img data-action="like-image" data-image-id="${imageObj.id}" class="like-button" src="./images/like.png"><br>
    <span id="likes-count-for-image-${imageObj.id}">${imageObj.likes_count}</span>
    </p>`

    imagesContainer.appendChild(div)
  }

  imagesContainer.addEventListener('click', function(event) {
    if (event.target.className === "like-button") {
      let imageId = event.target.dataset.imageId
      imageLikePostRequest(imageId)
    }
  })

  function imageLikePostRequest(imageId) {
    let config = {
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({image_id: imageId})
    }
    return fetch(`${LIKES_URL}`,config).then(response => response.json()).then(likeObj => {
      let span = document.getElementById(`likes-count-for-image-${likeObj.image_id}`)
      let likes = parseInt(span.innerText,10)+1
      span.innerText = likes
    })
  }

































  requestImages()
})
