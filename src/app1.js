import './app1.css'
import $ from 'jquery'

const eventBus = $({})

const m = { //数据相关 M
    data: {
        n: parseInt(localStorage.getItem('n'))//初始化数据
    },
    create() { },
    delete() { },
    update(data) {
        Object.assign(m.data, data)//把data的所有属性一个一个的赋给m.data
        eventBus.trigger("m:updated")
        localStorage.setItem('n', m.data.n)
    },
    get() { }
}
const v = { //视图相关 V
    el: null,
    html: `
    <div>
      <div class="output">
        <span id="number">{{n}}</span>
      </div>
      <div class="actions">
        <button id="add1"> +1 </button>
        <button id="minus1"> -1 </button>
        <button id="mul2"> *2 </button>
        <button id="divide2"> /2 </button>
      </div>
    </div>
    `,
    init(container) {
        v.el = $(container)
    },
    render(n) {
        if (v.el.children.length !== 0) v.el.empty()
        $(v.html.replace('{{n}}', n)).prependTo(v.el)
    }
}
const c = { //其它 C
    init(container) {
        v.init(container)
        v.render(m.data.n)//view=render(data)
        c.autoBindEvents()
        eventBus.on('m:updated', () => {
            v.render(m.data.n)
        })
    },
    events: {
        'click #add1': 'add1',
        'click #minus1 ': 'minus1',
        'click #mul2 ': 'mul2',
        'click #divide2 ': 'divide2'
    },
    add1() {
        //m.data.n += 1
        //v.render(m.data.n)
        m.update({ n: m.data.n + 1 })//更新时触发update,因为只有update才会触发这个事件
    },
    minus1() {
        m.update({ n: m.data.n - 1 })
    },
    mul2() {
        m.update({ n: m.data.n * 2 })
    },
    divide2() {
        m.update({ n: m.data.n / 2 })
    },
    autoBindEvents() {
        for (let key in c.events) {
            const value = c[c.events[key]]//c.events[key]取的是字符串，我要取的是方法
            const spaceIndex = key.indexOf(' ')
            const part1 = key.slice(0, spaceIndex + 1)
            const part2 = key.slice(spaceIndex)
            //console.log(part1, part2, value)
            v.el.on(part1, part2, value)//拼凑操作
        }
    }
}
export default c 