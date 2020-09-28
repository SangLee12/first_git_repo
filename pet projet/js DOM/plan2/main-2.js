function Validator(formSelector, options){

function getParent(element, selector){
    while(element.parentElement){
        if(element.parentElement.matches(selector) ){
            return element.parentElement;
        }
        element = element.parentElement;
    }
}

    var formRules = {};

    /**
     * Quy ước tạo rules
     * 1-nếu có lỗi sẽ return `error message`
     * 2-nếu không có lỗi sẽ return `undefined`
     */
    var validatorRules = {
        required: function(value){
            return value ? undefined : "vui lòng nhập trường này";
        },
        email: function(value){
            var regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
            return regex.test(value) ? undefined : "vui lòng nhập email";
        },
        min: function(min){
            return function(value){
                return value.length >= min ? undefined : `vui lòng nhập tối thiểu ${min} ký tự`;
            }
        },
        max: function(max){
            return function(value){
                return value.length <= max ? undefined : `vui lòng nhập tối đa ${max} ký tự`;
            }
        },
    };
    
    // lấy ra form element trong DOM theo `formSelector`
    var formElement = document.querySelector(formSelector);
    
    // chỉ xử lý khi có element trong DOM
    if(formElement){

        var inputs = formElement.querySelectorAll("[name][rules]");
        for(var input of inputs){
            var rules = input.getAttribute("rules").split("|");
            for(var rule of rules){
                var ruleInfo;
                var isRuleHasValue = rule.includes(":");
                
                if (isRuleHasValue){
                    ruleInfo = rule.split(":");
                    rule = ruleInfo[0];
                }

                var ruleFunc = validatorRules[rule];

                if(isRuleHasValue){
                    ruleFunc = ruleFunc(ruleInfo[1]);
                }

                if(Array.isArray(formRules[input.name]) ){
                    formRules[input.name].push(ruleFunc);
                }else{
                    formRules[input.name] = [ruleFunc];
                }
            }

            // lắng nghe sự kiện để validate
            input.onblur = handleValidate;
            input.oninput = handleClearError;
        }
        // hàm thực hiện validate
        function handleValidate(event){
            var rules = formRules[event.target.name];
            var errorMessage;

            rules.find(function (rule){
                errorMessage = rule(event.target.value);
                return errorMessage;
            });

            // nếu có lỗi thì hiển thị message lỗi ra UI
            if(errorMessage){
                var formGroup = getParent(event.target, ".form-group");
                if(formGroup){
                    formGroup.classList.add("invalid");

                    var formMessage = formGroup.querySelector(".form-message");
                    if(formMessage){
                        formMessage.innerText = errorMessage;
                    }
                }
            }

            return !errorMessage;
        }

        // hàm clear message lỗi
        function handleClearError(event){
            var formGroup = getParent(event.target, ".form-group");
            if(formGroup.classList.contains("invalid") ){
                formGroup.classList.remove("invalid");

                var formMessage = formGroup.querySelector(".form-message");
                if(formMessage){
                    formMessage.innerText = "";
                }
            }
        }
    }

    // xử lý hành vi submit form
    formElement.onsubmit = function(event){
        event.preventDefault();

        var inputs = formElement.querySelectorAll("[name][rules]");
        var isValid = true;

        for(var input of inputs){
            if (!handleValidate({target: input}) ){
                isValid = false;
            }
        }
        
        // khi không có lỗi thì submit form
        if(isValid){
            if(typeof options.onSubmit === "function"){
                options.onSubmit();
            }else{
                formElement.submit();
            }
        }
    }
}