/**
 *****************************************
 * Created by lifx
 * Created on 2018-05-15 18:01:35
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载依赖
 *****************************************
 */
import { fetchArticle } from './api';


fetchArticle('article/notes/开始记录东西.md').then(res => {
    console.log(res);
});
