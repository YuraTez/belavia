const selectLang = document.querySelector(".select-lang");
const selectTime = document.querySelectorAll(".select-custom");
const arrSelect = Array.from(selectTime);
arrSelect.push(selectLang)

arrSelect.forEach((el)=>{
    const choices = new Choices(el, {
        searchEnabled: false,
    })
})


$(".rent-btn").on("click" , function (){
    $(".car-list").slideDown();
    $(".rent-btn").addClass("hide");
})

$( function() {
    $( ".input-date" ).datepicker();
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


IMask(
    document.getElementById('phone'),
    {
        mask: '+{375} (00) 000-00-00'
    }
)

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























