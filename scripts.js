const menuIcon = document.querySelector(".menu-icon");
const navLinks = document.querySelector(".nav-links");

menuIcon.addEventListener("click", () => {
    navLinks.classList.toggle("active");
});

document.getElementById('downloadBtn').addEventListener('click', function () {
    const fileUrl = 'https://discoveryprovider.audius.co/v1/tracks/1Ex5Vg3/stream?app_name=EXAMPLEAPP';
    
    const fileName = 'Last Night A Dj Saved My Life (Victor Arias Remix).mp3';
    
    fetch(fileUrl)
        .then(response => response.blob())
        .then(blob => {
            const url = URL.createObjectURL(blob);

            const a = document.createElement('a');
            a.href = url;
            a.download = fileName;
            document.body.appendChild(a);
            a.click();

            setTimeout(() => {
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
            }, 0);
        })
        .catch(error => console.error('Error al descargar el archivo:', error));
});