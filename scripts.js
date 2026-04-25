const menuIcon = document.querySelector(".menu-icon");
const navLinks = document.querySelector(".nav-links");

menuIcon.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

const audioPlayer = document.getElementById("audioPlayer");

// Manejar los botones de reproducción
document.querySelectorAll(".playBtn").forEach((button) => {
  button.addEventListener("click", function () {
    const fileUrl = this.getAttribute("data-url");
    audioPlayer.src = fileUrl;
    audioPlayer.play();
  });
});

// --- LÓGICA DE RECAPTCHA ---

// 2. Bloquear botones de descarga al cargar la página
const downloadButtons = document.querySelectorAll(".downloadBtn");
downloadButtons.forEach((btn) => {
  btn.style.opacity = "0.5";
  btn.style.pointerEvents = "none"; // Evita que hagan clic
  btn.style.filter = "grayscale(100%)";
});

// 3. Función que se ejecuta cuando el captcha es exitoso
function onCaptchaSuccess() {
  downloadButtons.forEach((btn) => {
    btn.style.opacity = "1";
    btn.style.pointerEvents = "auto";
    btn.style.filter = "none";
  });
  console.log("Descargas habilitadas por reCAPTCHA");
}

// 4. Función si el captcha expira
function onCaptchaExpired() {
  downloadButtons.forEach((btn) => {
    btn.style.opacity = "0.5";
    btn.style.pointerEvents = "none";
    btn.style.filter = "grayscale(100%)";
  });
}

document.querySelectorAll(".downloadBtn").forEach((button) => {
  button.addEventListener("click", function () {
    const fileUrl = this.getAttribute("data-url");
    const fileName = this.getAttribute("data-filename");

    const parentDiv = this.parentElement;
    const notification = parentDiv.querySelector(".notification");
    const progressBar = parentDiv.querySelector(".progress-bar");

    notification.style.display = "block";

    const xhr = new XMLHttpRequest();
    xhr.open("GET", fileUrl, true);
    xhr.responseType = "blob";

    xhr.onprogress = function (event) {
      if (event.lengthComputable) {
        const percentComplete = (event.loaded / event.total) * 100;
        progressBar.style.width = percentComplete + "%";
        progressBar.textContent = Math.round(percentComplete) + "%";
      }
    };

    xhr.onload = function () {
      if (xhr.status === 200) {
        const url = window.URL.createObjectURL(xhr.response);
        const a = document.createElement("a");
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      }
      notification.style.display = "none";
      progressBar.style.width = "0%";
      progressBar.textContent = "0%";
    };

    xhr.onerror = function () {
      console.error("Error al descargar el archivo.");
      notification.style.display = "none";
    };

    xhr.send();
  });
});
