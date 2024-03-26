const box = document.querySelector('.savedUser');
const newForm = document.querySelector('.userForm');
const container = document.querySelector('.container');

// box.addEventListener('click', (e) => {
//     container.removeChild(box);
//     newForm.style.display = 'block';
// })

container.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-primary')) {
        const parentDiv = e.target.closest('.savedUser');
        if (parentDiv) {
            newForm.style.display = 'block';
            container.removeChild(parentDiv);
        }
    }
});

if(newForm) {
    newForm.addEventListener('submit', async(e) => {
        e.preventDefault();
        const data = new FormData(newForm);
        const res = Object.fromEntries(data);
        try {
            const response = await fetch('/user', {
                method: "PUT",
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(res)
            })
            console.log(response);
            const result = await response.json();
            newForm.style.display = 'none';
            const div = document.createElement('div');
           div.classList.add('savedUser');
            div.innerHTML = `
            <div class="form-group row">
            <label for="inputName3" class="col-sm-2 col-form-label">Ваше имя:</label>
            <div class="col-sm-10">
                <p style="margin: 30px">${result.userName}</p>
            </div>
        </div><div class="form-group row">
                <label for="inputEmail3" class="col-sm-2 col-form-label">Email</label>
                <div class="col-sm-10">
                <p style="margin: 10px">${result.email} </p>
                </div>
            </div><div class="form-group row">
                <label for="inputPhonel3" class="col-sm-2 col-form-label">Номер телефона:</label>
                <div class="col-sm-10">
                    <p style="margin:30px">${result.userPhone}</p>
                </div>
            </div><div class="form-group row">
                <label for="userBirthDate3" class="col-sm-2 col-form-label">Дата рождения:</label>
                <div class="col-sm-10">
                    <p style="margin:30px">${new Date(result.userBirthDate).toLocaleDateString()}</p>
                </div>
            </div><div class="form-group row">
                <div class="col-sm-10">
                    <button type="click" class="btn btn-primary">Редактировать!</button>
                </div>
            </div>
            `
           container.appendChild(div);
        } catch (error) {
            console.log(error);
        }
    })
}

