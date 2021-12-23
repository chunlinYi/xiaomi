//购物车页面
class ShoppingCart {
    constructor() {
        this.tab = document.querySelector('#tab')
        this.getCartGoods();
        //绑定点击事件
        this.doc('.s-con').addEventListener('click', this.clickBubbleFn.bind(this));
    }
    clickBubbleFn(event) {
            let tar = event.target;
            // 判断点击的是否为单选框,classList.contains为判断类名是否存在;
            tar.classList.contains('checkbox-one') && this.oneCheckFn(tar)
                // 判断数量加
            tar.classList.contains('add') && this.addClickFn(tar);
            // 判断数量减
            tar.classList.contains('minus') && this.delClickFn(tar);
            // 判断全选
            tar.classList.contains('checkbox-all') && this.checkAllFn(tar);
            // 判断是不是删除
            tar.classList.contains('icon-cha') && this.delAllFn(tar);
            //判断是不是结算
            tar.classList.contains('pay') && this.settlement(tar);
        }
        // 获取购物车数据
    async getCartGoods() {
        //   去除loca里面的数据
        let cartGoods = localStorage.getItem('cart')
            // 没有就结束
        if (!cartGoods) return;
        // 有的话转换为JS格式
        cartGoods = JSON.parse(cartGoods);
        // 获取ajax的数据
        let data = await axios.get({ url: 'http://localhost:53000/data2' })
            //    console.log(data);
            // 循环遍历数据,根据ID取值,有值说明商品在购物车
        let existData = data.filter(item => {
            // 结果为数字 转化为 true  undefined 转化为false
            return cartGoods[item.id]
        })
        this.render(existData, cartGoods)
    }

    //渲染购物车
    render(data, cg) {
            let shoppingCartList = '';
            data.forEach(ele => {
                shoppingCartList += `
            <tr goodsId="${ele.id}" class="tr-length">
                        <td>
                            <input type="checkbox" class="checkbox-one">
                        </td>
                        <td><img src="${ele.src}" alt=""></td>
                        <td>${ele.name} </td>
                        <td>${ele.price}</td>
                        <td class="count">
                            <button class="minus">-</button>
                            <input value="${cg[ele.id]}">
                            <button class="add">+</button>
                        </td>
                        <td class="singleprice">${ele.price * cg[ele.id]}</td>
                        <td><i class="del iconfont icon-cha"></i></td>
            </tr>`
            })
            this.tab.innerHTML = shoppingCartList;
        }
        // 增加数量
    addClickFn(target) {
        //获取数量,他的上一个兄弟节点
        let num = target.previousElementSibling;
        num.value = num.value - 0 + 1; //数量
        //获取小计
        let minus = target.parentNode.nextElementSibling; //小计
        // console.log(minus);
        let price = target.parentNode.previousElementSibling.innerHTML; //单价
        //  计算出小计的价格
        minus.innerHTML = parseInt((num.value * price) * 100) / 100
            // console.log(minus.innerHTML);
        this.minusToal()
        this.modl(target.parentNode.parentNode.getAttribute('goodsId'), num.value)
    }

    //   减少数量
    delClickFn(target) {
            //获取数量,他的上一个兄弟节点
            let num = target.nextElementSibling;
            num.value = num.value - 0 - 1; //数量
            //获取小计
            let minus = target.parentNode.nextElementSibling; //小计
            let price = target.parentNode.previousElementSibling.innerHTML; //单价
            //  计算出小计的价格
            if (num.value <= 1) {
                num.value = 1;
            }
            minus.innerHTML = parseInt((num.value * price) * 100) / 100
            this.minusToal()
            this.modl(target.parentNode.parentNode.getAttribute('goodsId'), num.value)
        }
        // 全选框
    checkAllFn(target) {
        let status = target.checked
        this.docAll('.checkbox-one').forEach(item => {
            item.checked = status;
        })
        this.minusToal()
    }

    //单选框
    oneCheckFn(target) {
            if (!target.checked) {
                this.doc('.checkbox-all').checked = false;
            }
            let count = 0;
            this.docAll('.checkbox-one').forEach(i => {
                i.checked && count++;
            })
            if (count == this.docAll('.checkbox-one').length) {
                this.doc('.checkbox-all').checked = true;
            }
            this.minusToal()
        }
        // 计算价格、数量
    minusToal() {
        let num = 0,
            price = 0;
        this.docAll('.checkbox-one').forEach(ele => {
            if (ele.checked) {
                let trObj = ele.parentNode.parentNode;
                num += (trObj.querySelector('.count input').value - 0);
                price += (trObj.querySelector('.singleprice').innerHTML - 0);
            }
            this.doc('.buy-number').innerHTML = num;
            this.doc('.total-money').innerHTML = price;
        })
    }

    //删除按钮
    delAllFn(target) {
        let that = this
        layer.open({
            title: '确认删除框',
            content: '确定删除',
            btn: ['取消', '确认'],
            btn2: function(index, layero) {
                target.parentNode.parentNode.remove();
                that.minusToal();
            }
        })
        this.modl(target.parentNode.parentNode.getAttribute('goodsId'))
    }

    //修改数量
    modl(id, num = 0) {
            let cartGoods = localStorage.getItem('cart')
            if (!cartGoods) return
            cartGoods = JSON.parse(cartGoods)
            num == 0 && delete cartGoods[id]
            num !== 0 && (cartGoods[id] = num)
            localStorage.setItem('cart', JSON.stringify(cartGoods))
        }
        //结算按钮
    settlement() {
        if (this.doc('.total-money').innerHTML == 0) {
            layer.open({
                content: '您没有选购任何商品',
                btn: ['确认']
            })
        } else {
            layer.open({
                title: '结算',
                content: '确认购买',
                btn: ['取消', '确认'],
                btn2: function(index, layero) {
                    location.href = './finall.html'
                }
            })
        }
    }
    doc(ele) {
        return document.querySelector(ele)
    }
    docAll(ele) {
        return document.querySelectorAll(ele)
    }
}
new ShoppingCart;