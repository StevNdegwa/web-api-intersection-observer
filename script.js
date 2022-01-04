(function () {

  const contentSection = document.getElementById("contentSection");
  
  let prevElement = null;

  //Intersection observer API
  const observer = new IntersectionObserver(
    ([entry], observer) => {
      console.log(observer);
      if (entry) {
        if (prevElement) {
          prevElement.target.style.transform = "scale(0.5)"
        }
        entry.target.style.transform = "scale(1)";
        prevElement = entry;
      }
    }, {
    root: contentSection,
    rootMargin: "0px",
    threshold: 1.0
  }
  )

  //Fetch images
  fetch("https://picsum.photos/v2/list", { method: "GET" })
    .then((response) => response.json())
    .then((imagesList) => {
      if (Array.isArray(imagesList)) {
        const ul = document.createElement("ul")

        imagesList.forEach((image) => {
          let liEl = document.createElement("li");

          observer.observe(liEl);

          let imgEl = document.createElement("img");
          imgEl.src = image.download_url

          liEl.appendChild(imgEl)

          ul.appendChild(liEl);
        })

        contentSection.appendChild(ul)
      }
    })

})();