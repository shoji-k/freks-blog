document.querySelectorAll('li').forEach((element) => {
  element.ondragstart = function (event) {
    event.dataTransfer.setData('text/plain', event.target.id)
  }

  element.ondragover = function (event) {
    event.preventDefault()
    this.style.borderTop = '3px solid'
  }

  element.ondragleave = function () {
    this.style.borderTop = ''
  }

  element.ondrop = function (event) {
    event.preventDefault()
    let id = event.dataTransfer.getData('text')
    let element_drag = document.getElementById(id)
    this.parentNode.insertBefore(element_drag, this)
    this.style.borderTop = ''
  }
})
