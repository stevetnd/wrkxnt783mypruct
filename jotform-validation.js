var pathname = window.location.pathname;
pathname = pathname.substr(1, pathname.length);

setTimeout(function(){ jQuery('.hidden-section').remove(); }, 500);

jQuery(document).ready(function(){
    jQuery('.my-2').click(function(e){
        e.preventDefault();

        jQuery('html, body').animate({
            scrollTop: (jQuery('#jotform').offset().top + 50)
        }, 1000);
    });
});

function nextStep() {
    var form = jQuery('#92905425386161');
    var formArray = form.serializeArray();

    var formData = {};
    for (var i = 0; i < formArray.length; i++) {
        formData[formArray[i].name] = formArray[i].value;
    }

    var validations = {
        'q97_realtor': { type: 'input', validated: true, required: false },
        'q96_profession': { type: 'select', validated: true, required: true },
        'q69_name[first]': { type: 'input', validated: true, required: true },
        'q69_name[last]': { type: 'input', validated: true, required: true },
        'q3_typeA': { type: 'email', validated: true, required: true },
        'website': { type: 'input', validated: true, required: false },
    };

    var validated = true;

    Object.keys(validations).forEach(function(key) {
        if (validations[key].required) {
            switch (validations[key].type) {
                case 'email':
                    if (formData[key] == '' || !validateEmail(formData[key])) {
                        validations[key].validated = false;
                        validated = false;
                    }
                    break;
                case 'radio':
                    var radio = document.querySelector('input[name="' + key + '"]:checked');
                    if (radio == null) {
                        validations[key].validated = false;
                        validated = false;
                    }
                    break;
                default:
                    if (formData[key] == '') {
                        validations[key].validated = false;
                        validated = false;
                    }
                    break;
            }
        }
    });

    if (validated) {
        var parameters = 'realtor=' + encodeURIComponent(formData['q97_realtor']) +
                         '&' + 'profession=' + encodeURIComponent(formData['q96_profession']) +
                         '&' + 'name[first]=' + encodeURIComponent(formData['q69_name[first]']) +
                         '&' + 'name[last]=' + encodeURIComponent(formData['q69_name[last]']) +
                         '&' + 'typeA=' + encodeURIComponent(formData['q3_typeA']);

        window.location.href = 'https://form.jotform.com/92905425386161?' + parameters ;
    }
}

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}