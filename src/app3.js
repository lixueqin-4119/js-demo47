import './app3.css'
import $ from "jquery"

const html = `
        <section id="app3">
            <div class="square"></div>
        </section>
`
const $element = $(html).appendTo($('body>.page'))

const $square = $('#app3 .square')
const localKey = 'app3.active'
const active = localStorage.getItem(localKey) === 'yes' ? true : false

if (active) {//active=true如果点击了就增加active,      点击就存储当前的值
    $square.addClass('active')
} else {
    $square.removeClass('active')
}
$square.on('click', () => {
    //$square.toggleClass('active')
    if ($square.hasClass('active')) {
        $square.removeClass('active')
        localStorage.setItem(localKey, 'no')
    } else {
        $square.addClass('active')
        localStorage.setItem(localKey, 'yes')
    }

})