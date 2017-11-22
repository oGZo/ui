/*
* @Author: sanqi
* @Date:   2017-09-21 14:24:52
 * @Last Modified by: sanqi.zgz
 * @Last Modified time: 2017-11-21 21:23:28
*/
import { Ajax } from '@/utils/ajax';
import cookie  from '@/utils/cookie';
import { isLogin }  from '@/utils/system';
import localStorage from '@/utils/localStorage';


// 通过覆盖element-ui 样式 来达到目的

const KKL = {
    Ajax,
    cookie,
    isLogin,
    localStorage,
};
export default KKL;
