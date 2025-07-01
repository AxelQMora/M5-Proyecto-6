import { z } from "https://esm.sh/zod"

document.addEventListener('DOMContentLoaded', () => {


    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const submit = document.getElementById('submit');
    const alertMessage = document.getElementById('alertMessage');
    const warningsList = document.getElementById('warningsList');
    const closeWarning = document.getElementById('closeWarning');
    const successfulMessage = document.getElementById('successfulMessage');

    const schema = z.object({
        name: z.string().min(1, "Name is required"),
        email: z.string().email("Not a valid e-mail"),
        password: z.string().min(8, "The minimum number of characters in your password is 8").max(14, "The maximum number of characters in your password is 14")
    });

    closeWarning.addEventListener('click', (e) => {
        e.preventDefault();
        alertMessage.style.display = 'none';
        warningsList.innerHTML = '';
        submit.disabled = false;
    });

    submit.addEventListener('click', (e) => {
        e.preventDefault();

        const objectValidate = {
            name: name.value,
            email: email.value,
            password: password.value
        }

        console.log(objectValidate);

        const result = schema.safeParse(objectValidate);

        console.log(result)

        if (!result.success) {
            result.error.issues.map((issue) => {
                const newListItem = document.createElement('li');
                newListItem.textContent = issue.message;
                warningsList.appendChild(newListItem);
                alertMessage.style.display = 'block';
                submit.disabled = true;
            })
        }
        else {
            successfulMessage.style.display = 'block';
            //Reiniciamos todo
            name.value = '';
            email.value = '';
            password.value = '';

            setTimeout(() => {
                successfulMessage.style.display = 'none';
            }, 2000);
        }



    });



});