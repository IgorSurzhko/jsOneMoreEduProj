import {closeModal, openModal} from './modal';
import {postData} from '../services/services';

function forms(formsSelector, modalTimerId) {
    // FORMS, here Am working with OPEN_SERVER (localhost)

    const forms = document.querySelectorAll(formsSelector);

    const message = {
        loading: 'img/form/spinner.svg',
        success: 'Спасибо, скоро мы к вам вернемся',
        failure: 'Шо-та ваще умерло'
    };

    forms.forEach(item => {
        bindPostData(item);
    });
    
    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault(); // отмена ребута страницы

            let statusMessage = document.createElement('img'); //
            statusMessage.src = message.loading; // вывод спиннера загрузки из массива message
            statusMessage.style.cssText = `
				display: block;
				margin: 0 auto;
			`; // доабвили ЦСС стили для спинера, инлайн стили
            form.insertAdjacentElement('afterend', statusMessage); // аналог form.append(statusMessage);

            const formData = new FormData(form); //легко конструировать наборы пар ключ-значение

            const json = JSON.stringify(Object.fromEntries(formData.entries()));
            //entries преобразует объект в массив массивов [[...],[.....]]
            //Object.fromEntries то что внутри преобразует в классический объект
            //JSON.stringify делает формат жисон из того что внтури

            postData('http://localhost:3000/requests', json)
                .then(data => {
                    console.log(data);
                    showThanksModal(message.success); // сообщение из массива выше
                    statusMessage.remove();
                }).catch(() => {
                    showThanksModal(message.failure); // сообщение неудачи
                }).finally(() => {
                    form.reset(); // очищаем форму
                });
        });
    }

    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');

        prevModalDialog.classList.add('hide');
        openModal('.modal', modalTimerId); // открываем новую модалку

        const thanksModal = document.createElement('div'); //формирование верстки новой модалки
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `    
			<div class="modal__content">
				<div class="modal__close" data-close>&times;</div>	
				<div class="modal__title">${message}</div>	
			</div>
		`; // выше новая верстка которую вставляем в модалку

        document.querySelector('.modal').append(thanksModal); // добавляем эту верстку к форме

        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            closeModal('.modal');
        }, 4000);
    }


}

export default forms;