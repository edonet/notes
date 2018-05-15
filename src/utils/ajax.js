/**
 *****************************************
 * Created by lifx
 * Created on 2018-05-15 18:04:37
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 请求数据
 *****************************************
 */
export default async function ajax(url, params) {
    return await axios({ url, params });
}
