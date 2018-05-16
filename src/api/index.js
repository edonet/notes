/**
 *****************************************
 * Created by lifx
 * Created on 2018-05-15 18:02:53
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载依赖
 *****************************************
 */
import ajax from 'ylan/ajax';
import settings from '../settings';


/**
 *****************************************
 * 定义参数
 *****************************************
 */
const articleFetchOptions = {
    baseURL: settings.articleBaseURL,
    responseType: 'text'
};


/**
 *****************************************
 * 获取日志文件
 *****************************************
 */
export function fetchArticle(url) {
    return ajax({ url, ...articleFetchOptions });
}
