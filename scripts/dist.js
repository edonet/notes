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
const
    utils = require('./utils'),
    manifest = 'src/settings/article.json';


/**
 *****************************************
 * 定义任务
 *****************************************
 */
async function run() {
    let files = await utils.getArticleList('article/**/*.md'),
        mapper = utils.getArticleMapper(manifest);

    // 获取文件状态
    files = await Promise.all(files.map(file => utils.getArticleStats(file, mapper)));

    // 保存文件清单
    await utils.saveArticleList(manifest, files);
}


/**
 *****************************************
 * 启用任务
 *****************************************
 */
module.exports = run().catch(console.error);
