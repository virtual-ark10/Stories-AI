// Example starter JavaScript for disabling form submissions if there are invalid fields

(() => {
    'use strict'

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.validated-form')

    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
        }

        form.classList.add('was-validated')
        }, false)
    })

    const fileInput = document.querySelector('#file')
    const MAX_SIZE_MB = 1;

    fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if(file && file.size > MAX_SIZE_MB * 1024 * 1024) {
            alert('File is too large! Max Allowed is 20MB')
            fileInput.value = ''; //Clear input
        }
    })

})()