const addThemebtn = document.querySelector('.add_card');
const cardThemes = document.querySelector('.card_themes');
const cardTheme = cardThemes.querySelectorAll('.card_theme');
const cardContainer = document.querySelector('.card_container');

var editable = [];
var count = 0;

//Theme toggle
addThemebtn.addEventListener('click', () => {
    if (count % 2 == 0) {
        for (let i = 0; i < cardTheme.length; i++) {
            setTimeout(function () {
                cardTheme[i].style.transform = `translateY(0px)`;
                cardTheme[i].style.display = 'block';
            }, 50 * i);
        }
    } else {
        for (let i = 0; i < cardTheme.length; i++) {
            setTimeout(function () {
                cardTheme[cardTheme.length - 1 - i].style.transform = `translateY(calc(${cardTheme.length - 1 - i} * -40px))`;
                cardTheme[cardTheme.length - 1 - i].style.display = 'none';
            }, 50 * i);
        }
    }
    count += 1;
})

//Adding new notes
cardTheme.forEach(element =>{
   element.addEventListener('click', () =>{
    if(document.querySelector('.card_template')){
        document.querySelector('.card_template').remove();
    }

    let color = element.style.backgroundColor;
    const card = document.createElement('div');
    card.classList.add('card', 'addCard');

    //Add date
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth();
    let day = date.getDate();

    Number.prototype.pad = function(digits){
        for(var n = this.toString(); n.length < digits; n = 0 +n);
        return n;
    }

    let months = ['Jan','Feb','Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    card.innerHTML = `
    <div class="card addCard">
    <span class="card_title">
        Type your note here...
    </span>
    <span class="card_footer">
        <small class="card_time">${months[month]}-${day.pad(2)}-${year}</small>
        <small class="card_edit"><i class="fas fa-pen"></i></small>
    </span>
    </div>
    `;
    card.style.backgroundColor = color;
    cardContainer.prepend(card);

    //Edit & save notes
    const cards = document.querySelectorAll('.card');
    cards.forEach((card, cardCount) =>{
        editable[cardContainer] = false;
        card.querySelector('.card_edit').addEventListener('click', ()=>{
            if(editable[cardCount]){
                card.querySelector('.card_title').contentEditable = 'false';
                editable[cardCount] = false;
                card.querySelector('.card_edit').innerHTML = '<i class = "fas fa-pen"></i>';
            }else{
                card.querySelector('.card_title').contentEditable = 'true';
                editable[cardCount] = true;
                card.querySelector('.card_edit').innerHTML = '<i class = "fas fa-save"></i>';
            }
        })
    })
   })
})