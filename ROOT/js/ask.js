$(function() {
    $("#infos div:first-child").attr('class', 'box');
    var relativePath = '.';
    init(relativePath);
    loginHTML(relativePath);
    signinHTML(relativePath);
    $("#ask").click(function() {
        if (!$.trim($("#title").val())) {
            alert("You will input title.");
            $("#title").focus();
            return;
        }
        if ($.trim($("#title").val()).split(/./).length - 1 > 140) {
            alert("You can only enter 140 text in title.");
            $("#title").focus();
            return;
        }

        var formData = form2js("ask-form");
        var tags = [];
        if (formData.tags) {
            $.each(formData.tags.split(','), function (index, value) {
                value = $.trim(value);
                if (value) {
                    tags.push(value);
                }
            });
            formData.tags = tags;
        }

        $.post('./ask', $.toJSON(formData), function (data) {
            if (console && console.log){
                console.log( 'Sample of data:', $.toJSON(data) );
            }
            if (data['ok']) { //添加成功
                var nextURL = "./question/" + data['data']['id'];
                window.location = nextURL;
            } else {
                alert('Fail ' + data['msg']);
            }
        }, 'json');
    });
});
