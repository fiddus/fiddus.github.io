$(function () {
    $('#enviar-contato').click(function (e) {

        e.preventDefault();

        var self = this;

        var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;

        var sendButton = $('#enviar-contato'),
            formAnswer = $('#form-answer'),
            sendContent = sendButton.html();

        var formField = {
            name: $('#name'),
            replyto: $('#replyto'),
            company: $('#company'),
            message: $('#message')
        };

        var displayMessage = function (message) {
            sendButton.html(sendContent);
            sendButton.removeAttr('disabled');
            formAnswer.html(message);
            formAnswer.fadeIn();

            setTimeout(function () {
                formAnswer.fadeOut();
            }, 5000);
        };

        sendButton.html('Validando campos');
        sendButton.attr('disabled', 'disabled');

        if (!formField.name.val()) {
            displayMessage('Por favor preencha seu nome.');
        } else if (!formField.replyto.val()) {
            displayMessage('Por favor preencha seu email.');
        } else if (!regex.test(formField.replyto.val())) {
            displayMessage('Por favor entre com um email válido.');
        } else if (!formField.message.val()) {
            displayMessage('Por favor preencha sua mensagem.');
        } else {
            displayMessage('Obrigado. Entraremos em contato o mais breve possível');
            sendButton.html('Enviando...');

            setTimeout(function () {
                formAnswer.fadeOut();
                sendButton.html(sendContent);
                sendButton.removeAttr('disabled');
                self.closest('form').submit();
                formField.name.val('');
                formField.replyto.val('');
                formField.company.val('');
                formField.message.val('');
            }, 5000);

        }

        return false;
    });
});
