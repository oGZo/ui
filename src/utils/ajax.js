import axios from 'axios';
import qs from 'qs';

//  自定义FetchError类
class FetchError extends Error {
    constructor(error) {
        super();
        if (typeof error === 'string') {
            this.message = error;
        } else {
            this.message = error.message;
            this.code = error.code;
        }
    }
}

export function jsonParser(res) {
    let response;
    try{
        response = JSON.parse(res);
    }catch(err){
        response = res;
        console.log(err);
    }
  return response;
}

/**
 * ajax请求
 * @param {String}      url                  请求地址
 * @param {String}      [type='get']         请求类型 'get' | 'post'
 * @param {Object}      data                 请求参数
 * @param {String}      method               'json' // json传参  'bin' // 二进制传参
 * @param {Boolean}     dontWarn             是否不提示错误信息
 * @param {Boolean}     disableLint          禁用错误校验
 */
export function Ajax({
    url = '',
    method = '',
    data = {},
    type = 'get',
    // dontWarn = false,
    // disableLint = false,
}) {
    let ajaxUrl = url;
    // mock数据  不需要可以注销掉
    if(data.serviceName && ENV_CONFIG.env === 'dev'){
        ajaxUrl = data.serviceName;
    }
    if (!window.navigator.onLine) {
        KKL.hint('网络异常');
        throw new FetchError('网络异常');
    }
    const methodMap = {
        json: 'application/json',
        bin: 'multipart/form-data',
    };
    const contentType = methodMap[method] || 'application/x-www-form-urlencoded';
    // 处理token等信息
    const headers = {
        'Content-Type': contentType,
        'KKL-TOKEN': KKL.cookie.get('kkl_token')
    };
    let configUrl = CONFIG.url;
    if(ENV_CONFIG.env === 'dev'){
        // configUrl = `${location.protocol}//${location.hostname}:3004/`;
        configUrl = '/kkl/';
    }
    console.log('configUrl',configUrl);
    console.log('ajaxUrl',ajaxUrl);
    // configUrl = 'http://message.stable.ikuko.com:3001/api';
    const options = {
        url: `${configUrl}${ajaxUrl}?t=${Date.now()}`,
        method: type,
        headers,
        credentials: 'include',
        withCredentials: true,
    };

    if (String.prototype.toLowerCase.call(type) === 'get') {
        options.params = data;
    } else if (method === 'json') {
        options.data = JSON.stringify(data);
    } else {
        options.data = qs.stringify(data);
        // options.data = JSON.stringify(data);
        console.log(options.data);
    }

    const $ajax = axios(options);
    // const envConfig = ENV_CONFIG;
    // console.log(envConfig);
    return $ajax
        .then(res => res.data)
        .then(res => {
            // console.log(res);
            if (res.code === 1) {
                let keys = Object.keys(res.data);
                // 针对data中 只有一个key且结果为resultObject 时直接返回这个字段的值
                if(keys.length === 1 && keys[0] === 'resultObject'){
                    res.data = res.data[keys[0]];
                }
                let index = keys.indexOf('resultObject');
                if(keys.length === 2 && index > -1){
                    res.data = res.data[keys[index]];
                }
                return res.data;
            }
            throw new FetchError(res);
        })
        .catch(error => {
            console.warn(error);
            throw new FetchError(error);
        });
}


const ajax = Ajax;

Ajax.get = function (url, data){
    return ajax({
        url,
        data,
        type: 'get',
    });
};

Ajax.post = function (url, data) {
    return ajax({
        url,
        data,
        type: 'post',
    });
};
