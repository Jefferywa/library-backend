$('.btn-login').click(function (event) {
    event.preventDefault();

    var user = {
        "login": $('input[id="login"').val(),
        "password": $('input[id="password"').val()
    }

    $.post('/signin', { "login" : user.login, "password" : user.password },
        function (res, xhr) {
            if (res) {
                alert(res.message)
            }
    }, 'json')
});
