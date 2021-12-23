    //表单输入框
    const userNameInput = document.querySelector('input[name="username"]')
    const passwordInput = document.querySelector('input[name="password"]')
        //提示信息
    const userNameP = document.querySelector('.usernamemsg')
    const passwordP = document.querySelector('.pswmsg')
        //登录按钮
    const loginBtn = document.querySelector('#login')

    //1.用户名非空验证
    const checkNullUserName = () => {
        if (userNameInput.value == '') {
            userNameP.innerHTML = '用户名不能为空!'
            return false
        } else {
            userNameP.innerHTML = ''
            return true
        }
    }

    //2.密码非空验证
    const checkNullPassword = () => {
            if (passwordInput.value == '') {
                passwordP.innerHTML = '密码不能为空!'
                return false
            } else {
                passwordP.innerHTML = ''
                return true
            }
        }
        //     // 密码强度
        // const checkPassword = () => {
        //     // 密码必须是大写字母开头,是字母和数字组合，至少8位
        //     let reg = /[A-Z][a-zA-Z0-9]{7,}/
        //     if (!reg.test(passwordInput.value)) {
        //         passwordP.innerHTML = '密码必须是大写字母开头,是字母和数字组合，至少8位'
        //         return false
        //     } else {
        //         passwordP.innerHTML = ''
        //         return true
        //     }
        // }

    loginBtn.onclick = function() {
        // 1.非空验证
        let isCheckNullUserName = checkNullUserName()
        let isCheckNullPassword = checkNullPassword()
        if (!isCheckNullUserName || !isCheckNullPassword) {
            return
        }
        //2.判断账户和密码
        let user = userNameInput.value
        let psd = passwordInput.value
        async function getMes() {
            // let data = await axios.get({ url: 'http://localhost:3001/data1' })
            let data = await axios.get({ url: 'http://localhost:53000/data1' })
            let on = false;
            data.forEach(mes => {
                if (mes.name == user && mes.psd == psd) on = true;
            });
            if (on) {
                alert('登录成功')
                location.href = '../pages/index.html?' + user
            } else {
                alert('账户或密码错误')
            }
        }
        getMes()
    }

    //用户名
    userNameInput.onblur = function() {
        checkNullUserName()
    }

    passwordInput.onblur = function() {
        let isCheckNullPassword = checkNullPassword()
            //非空验证没通过，不执行后面密码强度验证
        if (!isCheckNullPassword) {
            return
        }
        //密码强度验证
        // checkPassword()
    }