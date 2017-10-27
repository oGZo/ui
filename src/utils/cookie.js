/*
* @Author: sanqi
* @Date:   2017-09-21 14:36:23
* @Last Modified by:   sanqi
* @Last Modified time: 2017-09-21 14:42:43
*/
import Cookies from 'js-cookie';

// 补充clear方法
Cookies.clear = function() {
    let cookie = Cookies.get();
    Object.keys(cookie).forEach(key => {
        Cookies.remove(key);
    });
    return cookie;
};

export default Cookies;
