class TypeWriter {
  constructor(txtElement, words, wait) {
    this.txtElement = txtElement;
    this.wait = parseInt(wait, 10);
    this.words = words;
    this.txt = "";
    this.wordIndex = 0;
    this.type();
    this.isDeleting = false;
  }
  type() {
    const current = this.wordIndex;

    const fullTxt = this.words[current];
    console.log(fullTxt);
    if (this.isDeleting) {
      this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
      this.txt = fullTxt.substring(0, this.txt.length + 1);
    }
    this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;
    let typeSpeed = 300;

    if (this.isDeleting) {
      typeSpeed /= 2;
    }
    if (this.txt === fullTxt) {
      this.isDeleting = true;
      typeSpeed = this.wait;
    }

    if (this.txt === "") {
      this.isDeleting = false;
      this.wordIndex++;
      if (this.wordIndex === this.words.length) {
        this.wordIndex = 0;
      }
    }
    setTimeout(() => this.type(), typeSpeed);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const txtElement = document.querySelector(".txt-type");
  const words = JSON.parse(txtElement.getAttribute("data-words"));
  const wait = txtElement.getAttribute("data-wait");
  new TypeWriter(txtElement, words, wait);
});
