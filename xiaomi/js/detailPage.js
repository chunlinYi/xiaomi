async function getDetail() {
    let xq = document.querySelector('.jieshao')
        //获取商品id
    let url = location.href
    let index = url.indexOf('?')
    let subUrl = url.substring(index + 1)
    let id = subUrl.split('=')[1]
    let idd = id.substring(2)
    let bName = document.querySelector('.xiaomi6')

    // console.log(idd);
    let data = await axios.get({ url: 'http://localhost:53000/data2' })
    let html = ''
    data.forEach(ele => {
        if (ele.id == idd) {
            // console.log(ele.price);
            bName.innerHTML = `${ele.name}`
            html = `<div class="left fl"><img src="${ele.bImg}" style="width: 560px; height: 560px;"></div>
            <div class="right fr">
                <div class="h3 ml20 mt20">${ele.name}</div>
                <div class="jianjie mr40 ml20 mt10">6400万四摄，120Hz流速屏 / 骁龙730 旗舰处理器，8GB 大内存，最大可选256GB 闪存 / 20:9" 双孔屏 / 康宁五代大猩猩玻璃/铜管液冷散热</div>
                <div class="jiage ml20 mt10">${ele.price}</div>
                <div class="ft20 ml20 mt20">选择版本</div>
                <div class="xzbb ml20 mt10">
                    <div class="banben fl">
                        <a>
                            <span>全网通版 8GB+128GB </span>
                            <span>${ele.price}</span>
                        </a>
                    </div>
                    <div class="banben fr">
                        <a>
                            <span>全网通版 8GB+256GB</span>
                            <span>${ele.primary}</span>
                        </a>
                    </div>
                    <div class="clear"></div>
                </div>
                <div class="ft20 ml20 mt20">选择颜色</div>
                <div class="xzbb ml20 mt10">
                    <div class="banben fl">
                        <a>
                            <span class="yuandian"></span>
                            <span>深海微光 </span>
                        </a>
                    </div>
                    <div class="banben fr">
                        <a>
                            <span class="yuandian"></span>
                            <span>花影惊鸿</span>

                        </a>
                    </div>
                    <div class="clear"></div>
                </div>
                <div class="xqxq mt20 ml20">
                    <div class="top1 mt10">
                        <div class="left1 fl">${ele.name} 全网通版 8GB内存 128GB 深海微光</div>
                        <div class="right1 fr">${ele.price}</div>
                        <div class="clear"></div>
                    </div>
                    <div class="bot mt20 ft20 ftbc">总计:${ele.price}</div>
                </div>
                <div class="xiadan ml20 mt20">
                    <input class="jrgwc" type="button" name="jrgwc" value="立即选购" />
                    <input class="jrgwc" type="button" name="jrgwc" value="加入购物车" onclick="addCart(${ele.id},1)"/>
                </div>
            </div>`
        }
    });
    //数据渲染
    xq.innerHTML = html

}
getDetail()
    //存入localStorage
function addCart(idd, num) {
    let cartGoods = localStorage.getItem('cart');
    // console.log(idd, num);
    if (cartGoods) { //  有值
        // 解析数据
        cartGoods = JSON.parse(cartGoods);
        //  判断商品是否购买,当前添加的id,是否已经存在于购物车中
        for (let attr in cartGoods) { // attr 表示商品id
            // 存在则修改数量
            attr == idd && (num = num + cartGoods[attr]);
        }
        // 存在则修改数量,不存在则添加
        cartGoods[idd] = num;
        localStorage.setItem('cart', JSON.stringify(cartGoods))
    } else { //  没有数据
        //  以id为key,数量为val
        cartGoods = {
            [idd]: num
        };
        localStorage.setItem('cart', JSON.stringify(cartGoods))
    }
    alert("加入成功")
}