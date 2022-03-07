import './app2.css'
import $ from "jquery"

const localKey = 'app2.index'
const eventBus = $(window)
const m = { //数据相关 M
    data: {
        index: parseInt(localStorage.getItem(localKey) || 0)
    },
    create() { },
    delete() { },
    update(data) {
        Object.assign(m.data, data)
        eventBus.trigger("m:updated")
        localStorage.setItem('index', m.data.index)
    },
    get() { }
}
const v = { //视图相关 V
    el: null,
    html: (index) => {//html是个返回字符串的函数
        return `
    <div>
    <ol class="tab-bar">
        <li class="${index === 0 ? 'selected' : ''}" data-index="0"><span>1</span></li>
        <li class="${index === 1 ? 'selected' : ''}" data-index="1"><span>2</span></li>
    </ol>
    <ol class="tab-content">
        <li class="${index === 0 ? 'active' : ''}" >内容1</li>
        <li class="${index === 1 ? 'active' : ''}" data-index="1">内容2</li>
    </ol>
    </div>
    `
    },
    init(container) {
        v.el = $(container)
    },
    render(index) {
        if (v.el.children.length !== 0) v.el.empty()
        $(v.html(index)).prependTo(v.el)
    }
}

const c = { //其它 C
    init(container) {
        v.init(container)
        v.render(m.data.index)//view=render(data)
        c.autoBindEvents()
        eventBus.on('m:updated', () => {
            v.render(m.data.index)
        })
    },
    events: {
        'click .tab-bar li': 'x'
    },
    x(e) {
        const index = parseInt(e.currentTarget.dataset.index)//用DOM做标记
        m.update({ index: index })
    },
    autoBindEvents() {
        for (let key in c.events) {
            const value = c[c.events[key]]
            const spaceIndex = key.indexOf(' ')
            const part1 = key.slice(0, spaceIndex + 1)
            const part2 = key.slice(spaceIndex)
            v.el.on(part1, part2, value)
        }
    }
}
export default c