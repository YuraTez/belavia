const selectLang = document.querySelectorAll(".select-lang");

selectLang.forEach((el)=>{
    const choices = new Choices(el, {
        searchEnabled: false,
    })
})

$(".rent-btn").on("click" , function (){
    $(".car-list").slideDown();
    $(".rent-btn").addClass("hide");
})

$( function() {
    $( ".input-date" ).datepicker(
        {'language' : 'ru'}
    );
} );

const template = (address , flightNumber)=>`
                        <div class="form-group">
                            <input type="text" name="${flightNumber}" id="${address}" placeholder="">
                            <label for="${address}">Дополнительный адрес</label>
                        </div>

`

$(".add-address__btn").on("click", function () {
    let addressItemLength = $(".address-inner .form-group").length;
    let numberAddress = +addressItemLength + 1
    if (addressItemLength === 2) {
        $(".add-address").remove();
        $(".address-inner").append(template(`address-` + numberAddress , `flightNumber-` + numberAddress))
    } else if (addressItemLength <= 3) {
        $(".address-inner").append(template(`address-` + numberAddress , `flightNumber-` + numberAddress))
    }
})


/*IMask(
    document.getElementById('phone'),
    {
        mask: '+{375} (00) 000-00-00'
    }
)*/

var maskList = $.masksSort(
    $.masksLoad('js/data/phone-codes.json'),

    ['#'],
    /[0-9]|#/,
    'mask'
);

$(document).ready(function () {
    var maskList = $.masksSort(
        $.masksLoad('js/data/phone-codes.json'),

        ['#'],
        /[0-9]|#/,
        'mask'
    );

    var maskOpts = {
        inputmask: {
            definitions: {
                '#': {
                    validator: '[0-9]',

                    cardinality: 1,
                },
            },

            //clearIncomplete: true,

            showMaskOnHover: false,

            autoUnmask: true,
        },

        match: /[0-9]/,

        replace: '#',

        list: maskList,

        listKey: 'mask',

        onMaskChange: function (maskObj, completed) {
            if (completed) {
                var hint = maskObj.name_ru;

                if (maskObj.desc_ru && maskObj.desc_ru != '') {
                    hint += ' (' + maskObj.desc_ru + ')';
                }

                //$(".descr").html(hint);
            } else {
                //$(".descr").html("");
            }

            $(this).attr('placeholder', $(this).inputmask('getemptymask'));
        },
    };

    $('input[name="phone"],input[name="registerPhone"],input[name="profilePhone"]').inputmasks(maskOpts);
});

let maskTime = document.querySelectorAll(".form-group--time input");

maskTime.forEach((el)=>{
    IMask(el,
        {
            mask: '00:00'
        }
    )
})

$(".pay-elem").on("change" , function (){
    let attrName =  this.getAttribute("data-pay");
   $(".rent-price-btn").removeClass("active");
   $(`.rent-price-btn--${attrName}`).addClass("active");
})

let bestOffer = document.querySelector(".best-offer");


$(".rent-inner--offer").on("click" , function (event){
    event.preventDefault();
    let target = event.target
    if(target.classList.contains("car-item__btn") && !target.closest(".best-offer")){
        let offerEl = target.closest(".best-offer__item") ? target.closest(".best-offer__item") :target.closest(".car-item");
        $(".car-item , .best-offer__item").removeClass("d-none");
        let el = $(target);
        let dest = el.attr('href');

            bestOffer.innerHTML = ""
            bestOffer.appendChild(offerEl.cloneNode(true));
            $(".car-list").slideUp();

            setTimeout(function (){
                $('html').animate({
                        scrollTop: $(dest).offset().top - 80
                    }, 500
                );
            },500)
            offerEl.classList.add("d-none");
        $(".rent-btn").removeClass("hide");

    }else if(target.classList.contains("car-item__btn") && target.closest(".best-offer")){
        let el = $(target);
        let dest = el.attr('href');

        $(".car-list").slideUp();
        setTimeout(function (){
            $('html').animate({
                    scrollTop: $(dest).offset().top - 80
                }, 500
            );
        },500)
    }
})











// связанные списки
/*let cityArr = {
    "2": [" Введите пункт назначения", "Минск", "Брест", "Гродн", "Гомель", "Могилев", "Витебск"],
    "3": [" Введите пункт назначения", "Брест", "Гродн", "Гомель"],
    "4": [" Введите пункт назначения", "Брест", "Гродн", "Гомель"],
    "5": [" Введите пункт назначения", "Брест", "Гродн", "Гомель"],
    "6": [" Введите пункт назначения", "Брест", "Гродн", "Гомель"],
    "7": [" Введите пункт назначения", "Брест", "Гродн", "Гомель"]
};

let listsArr = {
    "2": ["Введите пункт отправления", "Минская область", "Брестская область", "Гродненская область", "Гомельская область", "Могилевская область", "Витебская область"],
    "3": ["Введите пункт отправления", "Фрунзунский", "Лененский", "Московский"],
    "4": ["Введите пункт отправления", "Фрунзунский", "Лененский", "Московский"],
    "5": ["Введите пункт отправления", "Фрунзунский", "Лененский", "Московский"],
    "6": ["Введите пункт отправления", "Фрунзунский", "Лененский", "Московский"],
    "7": ["Введите пункт отправления", "Фрунзунский", "Лененский", "Московский"],
    "8": ["Введите пункт отправления", "Italian"]
};*/

let cityArr = {
    "1": ["Введите пункт назначения", "Минск","Москва"],
    "Аэропорт Минск": ["Введите пункт назначения", "Минск"],
    "ЖД вокзал": ["Введите пункт назначения", "Минск"],
    "Дудутки": ["Введите пункт назначения", "Минск"],
    "Аэропорт Шереметьево": ["Введите пункт назначения", "Москва"],
    "ЖД вокзал Центральный": ["Введите пункт назначения", "Москва"],
};

let listsArr = {
    "1": ["Введите пункт отправления", "Аэропорт Минск", "ЖД вокзал", "Дудутки","Аэропорт Шереметьево" , "ЖД вокзал Центральный"],
    "Минск": ["Введите пункт отправления", "Аэропорт Минск", "ЖД вокзал", "Дудутки"],
    "Москва": ["Введите пункт отправления", "Аэропорт Шереметьево", "ЖД вокзал Центральный"],
};



const countryEl = document.querySelector("#point-1");
const regionEl = document.querySelector("#point-2");

const countrySelect = new Choices(countryEl, {
    searchEnabled: true,
    shouldSort: false,
    removeItemButton: true,
})

const regionSelect = new Choices(regionEl, {
    searchEnabled: true,
    shouldSort: false,
    removeItemButton: true,
})

function addListener(el, select) {
    $('.custom-select-inner .choices__item--choice[data-id=1]').hide();

    el.addEventListener(
        'change',
        function (event) {
            let textContent = event.target.textContent.replace(/\s+/g, '')
            console.log(textContent , "textContent")
            if (textContent === "") {
                select.setChoiceByValue('1');
                $('.custom-select-inner .choices__item--choice[data-id=1]').hide();
            }
            $('.custom-select-inner .choices__item--choice[data-id=1]').hide();
        },
        false,
    );
}

addListener(countryEl, countrySelect)
addListener(regionEl, regionSelect)

window.onload = selectCity;
window.onload = selectCountry;

function selectAdd() {
    countryEl.onchange = selectCountry;
    regionEl.onchange = selectCity;
}

selectAdd()

function selectCity(ev) {
    countrySelect.clearChoices()
    $('[data-select="city-list"]').empty();
    let itemSelect = this.value !== undefined && this.value !== "" ? this.value : "1"  || "1", o;
    if(cityArr[itemSelect].length){
        for (let i = 0; i < cityArr[itemSelect].length; i++) {
            o = new Option(cityArr[itemSelect][i], i, false, false);
            $('[data-select="city-list"]').append(o);

            if(i > 0){
                countrySelect.setChoices(
                    [
                        {value: `${cityArr[itemSelect][i]}`, label: cityArr[itemSelect][i], disabled: false},

                    ],
                    'value',
                    'label',
                    false,
                );
            }else{
                countrySelect.setChoices(
                    [
                        {value: "1", label: cityArr[itemSelect][i], disabled: false},

                    ],
                    'value',
                    'label',
                    false,
                );
            }

        }
        $('.custom-select-inner .choices__item--choice[data-id=1]').hide();
    }
}

function selectCountry(ev) {
    regionSelect.clearChoices()
    $('[data-select="region-list"]').empty();
    let itemSelect = this.value !== undefined && this.value !== "" ? this.value : "1"  || "1", o;
    for (let i = 0; i < listsArr[itemSelect].length; i++) {
        o = new Option(listsArr[itemSelect][i], i, false, false);
        $('[data-select="region-list"]').append(o);

        if(i>0){
            regionSelect.setChoices(
                [
                    {value: `${listsArr[itemSelect][i]}`, label: listsArr[itemSelect][i], disabled: false},

                ],
                'value',
                'label',
                false,
            );
        }else{
            regionSelect.setChoices(
                [
                    {value: "1", label: listsArr[itemSelect][i], disabled: false},

                ],
                'value',
                'label',
                false,
            );
        }


    }
    $('.custom-select-inner .choices__item--choice[data-id=1]').hide();
}




















