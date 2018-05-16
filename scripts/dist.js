/**
 *****************************************
 * Created by lifx
 * Created on 2018-05-15 16:34:40
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载依赖
 *****************************************
 */
const utils = require('./utils');


/**
 *****************************************
 * 定义任务
 *****************************************
 */
async function run() {
    let files = await utils.getArticleList();

    // 获取文件状态
    files = await Promise.all(files.map(utils.getArticleStats));

    // 保存文件清单
    await utils.saveArticleList('src/settings/article.json', files);
}


/**
 *****************************************
 * 启用任务
 *****************************************
 */
module.exports = run().catch(console.error);
