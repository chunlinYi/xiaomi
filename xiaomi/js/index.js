/******轮播********/
let swiperEle = document.querySelector('.swiper')
let prev = document.querySelector('.left')
let next = document.querySelector('.right')
let olEle = document.querySelector('.banner-disc')
let index = 0 //分页号
let isMove = false // 是否运动中, false没有运动true动运中
function creatNextPrve() {
    const firstEle = document.querySelector('.swiper li:first-child')
    const lastEle = document.querySelector('.swiper li:last-child')
        //复制第一张放到最后面
    let newFirst = firstEle.cloneNode(true)
    swiperEle.appendChild(newFirst)
        // 复制最后一张放到最前面
    let newLast = lastEle.cloneNode(true)
    swiperEle.insertBefore(newLast, firstEle)
}
creatNextPrve()
createPointer()
let olis = document.querySelectorAll('ol li')
const count = olis.length

function createPointer() {
    for (let i = 0; i < 5; i++) {
        let liEle = document.createElement('li') //<li></li>
        if (i == 0) {
            liEle.className = 'active'
        }
        olEle.appendChild(liEle)
    }
}


/**
 * 设置当前指示器选中效果
 */
function setCurrentActive() {
    clearActive()
    olis[index].classList.add('active')
}

function clearActive() {
    for (let i = 0; i < olis.length; i++) {
        olis[i].classList.remove('active')
    }
}

/*
  上一张
*/
function onPrve() {
    prev.onclick = function() {
        if (isMove == false) {
            if (--index < 0) {
                index = count - 1
            }
            setCurrentActive()
            move(swiperEle, {
                offset: 1226,
                time: 1000,
                rate: 30
            })
        }
    }
}

function onNext() {
    next.onclick = function() {

        if (isMove == false) {
            if (++index > count - 1) {
                index = 0
            }
            setCurrentActive()
            move(swiperEle, {
                offset: -1226,
                time: 500,
                rate: 30
            })
        }
    }
}

/*
自动轮播
*/
function autoPlay() {
    setInterval(function() {
        move(swiperEle, {
            offset: -1226,
            time: 1000,
            rate: 30
        })
    }, 1500)
}
// autoPlay()
onPrve()
onNext()

/**
 * 运动函数
 */
function move(ele, option = {
    offset: 1226,
    time: 30,
    rate: 30
}) {
    isMove = true //表示运动开始
    ele.style.left = window.getComputedStyle(ele).left //获取当前初始值
    let offset = option.offset //移动偏移量
    let rate = option.rate //移动间隔时间，也就是移动速度
    let time = option.time //移动总时间
    let distance = rate * offset / time //每次移动的距离
    let goal = parseInt(ele.style.left) + offset //目标位置 = 当前位置+偏移量

    let timer = setInterval(function() {
        //到达目标位置结束定时器                   目标位置 - 当前位置 < 每次移动距离
        if (parseInt(ele.style.left) == goal || Math.abs((Math.abs(goal) - Math.abs(parseInt(ele
                .style.left)))) < Math.abs(distance)) {
            ele.style.left = goal + 'px'
            clearInterval(timer)

            // 向左边界处理
            if (parseInt(ele.style.left) == -4904) {
                ele.style.left = -1226 + 'px'

            } else if (parseInt(ele.style.left) == 0) {
                ele.style.left = -4904 + 'px'
            }
            isMove = false
        } else {
            //元素现在位置   =     当前位置 + 每次移动距离
            ele.style.left = (parseInt(ele.style.left) + distance) + 'px'
        }
    }, rate)
}
let url = location.href
let nurl = url.split('?')
console.log(nurl[1]);

/**
 * 回到顶部
 */
function returnTop() {
    let returnBtn = document.querySelector('#returnTop')
    window.onscroll = function() {
        //页面卷入高度，也就是滚动条距离顶部距离
        if (document.documentElement.scrollTop > parseInt(window.getComputedStyle(document.querySelector('.headbar')).height + 46)) {
            returnBtn.style.display = 'block'
        } else {
            returnBtn.style.display = 'none'
        }
    }
    returnBtn.addEventListener('click', function() {
        var obj = setInterval(function() {
            // 1. 获取当前滚动条位置(距离顶部距离)
            var scrollTop = getScrollTop()
            var dist = scrollTop - 100
            setScrollTop(dist)

            // 2.至到当前滚动条位置小于等于0为止     
            if (dist <= 0) {
                clearInterval(obj)
            }
        }, 10)
    })

    /*
      设置滚动条离顶部距离
    */
    function setScrollTop(dist) {
        if (document.body.scrollTop) {
            document.body.scrollTop = dist
        } else {
            document.documentElement.scrollTop = dist
        }
    }
    /*
      获取滚动条离顶部距离
    */
    function getScrollTop() {
        return document.body.scrollTop || document.documentElement.scrollTop
    }
}
returnTop()