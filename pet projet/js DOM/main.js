// đối tượng `Validator`
function Validator(options){
    function getParent(element, selector){
        while(element.parentElement){
            if(element.parentElement.matches(selector) ){
                return element.parentElement;
            }
            element = element.parentElement;
        }
    }

    var selectorRules = {};

    // hàm thực hiện validate
    function validate(inputElement, rule){
        var errorElement = getParent(inputElement, options.formGroupSelector).querySelector(options.errorSelector);
        var errorMessage;

        // lấy ra các rules của selector
        var rules = selectorRules[rule.selector];

        // lặp qua từng rule và kiểm tra
        // nếu có lỗi thì dừng việc kiểm tra
        for(var i = 0; i < rules.length; ++i){
            switch (inputElement.type){
                case "radio":
                case "checkbox":
                    errorMessage = rules[i](
                        formElement.querySelector(rule.selector + ":checked")
                    );
                    break;
                default:
                    errorMessage = rules[i](inputElement.value);
            }
            if(errorMessage) break;
        }

        if(errorMessage){
            errorElement.innerText = errorMessage;
            getParent(inputElement, options.formGroupSelector).classList.add("invalid");
        }else{
            errorElement.innerText = "";
            getParent(inputElement, options.formGroupSelector).classList.remove("invalid");
        }
        return !errorMessage;
    }

    // lấy element của form cần validate
    var formElement = document.querySelector(options.form);
    if(formElement){
        // khi submit form
        formElement.onsubmit = function(e){
            e.preventDefault();

            var isFormValid = true;

            // lặp qua từng rule và validate
            options.rules.forEach(function(rule){
                var inputElement = formElement.querySelector(rule.selector);
                var isValid = validate(inputElement, rule);
                if(!isValid){
                    isFormValid = false;
                }
            });

            if(isFormValid){
                // trường hợp submit với javascript
                if(typeof options.onSubmit === "function"){
                    var enableInputs = formElement.querySelectorAll("[name]:not([disabled])");
                    var formValues = Array.from(enableInputs).reduce(function(values, input){
                        
                        switch (input.type){
                            case "radio":
                                values[input.name] = formElement.querySelector("input[name='" + input.name + "']:checked").value;
                                break;
                            case "checkbox":
                                if(!input.matches(":checked")) {
                                    values[input.name] = "";
                                    return values;
                                }
                                if(!Array.isArray(values[input.name]) ){
                                    values[input.name] = [];
                                }
                                values[input.name].push(input.value);
                                break;
                            case "file":
                                values[input.name] = input.files;
                                break;
                            default:
                                values[input.name] = input.value;
                        }

                        return values;
                    }, {});
                    options.onSubmit(formValues);
                }
                // trường hợp submit với hành vi mặc định
                else{
                    formElement.submit();
                }
            }
        }
        

        // lặp qua mỗi rule và xử lý (lắng nghe, )
        options.rules.forEach(function(rule){
          
            // lưu lại các rules cho mỗi input
            if(Array.isArray(selectorRules[rule.selector]) ){
                selectorRules[rule.selector].push(rule.test);
            }else{
                selectorRules[rule.selector] = [rule.test];
            }

            var inputElements = formElement.querySelectorAll(rule.selector);
            
            Array.from(inputElements).forEach(function (inputElement){
                // xử lý trường hợp blur khỏi input
                inputElement.onblur = function(){
                    validate(inputElement, rule);
                }  

                // xử lý khi người dùng input
                inputElement.oninput = function(){
                    var errorElement = getParent(inputElement, options.formGroupSelector).querySelector(options.errorSelector);
                    errorElement.innerText = "";
                    getParent(inputElement, options.formGroupSelector).classList.remove("invalid");
                }
            });
        });
    }
}

// định nghĩa rules
// nguyên tắc của rules:
// 1. khi có lỗi => trả ra message lỗi
// 2. khi hợp lệ => không làm gì cả

Validator.isRequired = function (selector, message){
    return{
        selector: selector,
        test: function(value){
            return value ? undefined : message;
        }
    };
};

Validator.isEmail = function (selector, message){
    return{
        selector: selector,
        test: function(value){
            var regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
            return regex.test(value) ? undefined : message;
        }
    };
};

Validator.minLength = function (selector, min, message){
    return{
        selector: selector,
        test: function(value){
            return value.length >= min ? undefined : message;
        }
    };
};

Validator.isConfirm = function (selector, getValue, message){
    return{
        selector: selector,
        test: function(value){
            return value === getValue() ? undefined : message;
        }
    };
};

