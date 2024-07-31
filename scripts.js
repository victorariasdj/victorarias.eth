const menuIcon = document.querySelector(".menu-icon");
const navLinks = document.querySelector(".nav-links");

menuIcon.addEventListener("click", () => {
    navLinks.classList.toggle("active");
});

document.querySelectorAll('.downloadBtn').forEach(button => {
    button.addEventListener('click', function () {
        const fileUrl = this.getAttribute('data-url');
        const fileName = this.getAttribute('data-filename');

        const notification = document.getElementById('notification');
        const spinner = document.getElementById('spinner');
        notification.style.display = 'block';
        spinner.style.display = 'block';

        fetch(fileUrl)
            .then(response => response.blob())
            .then(blob => {
                const url = URL.createObjectURL(blob);

                const a = document.createElement('a');
                a.href = url;
                a.download = fileName;
                document.body.appendChild(a);
                a.click();

                notification.style.display = 'none';
                spinner.style.display = 'none';

                setTimeout(() => {
                    document.body.removeChild(a);
                    URL.revokeObjectURL(url);
                }, 0);
            })
            .catch(error => {
                console.error('Error al descargar el archivo:', error);
                notification.style.display = 'none';
                spinner.style.display = 'none';
            });
    });
});