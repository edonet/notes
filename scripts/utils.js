/**
 *****************************************
 * Created by lifx
 * Created on 2018-05-15 16:45:24
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载依赖
 *****************************************
 */
const
    fs = require('fs'),
    path = require('path'),
    glob = require('glob'),
    root = path.resolve(__dirname, '../');


/**
 *****************************************
 * 获取文档
 *****************************************
 */
function getArticleList() {
    return new Promise((resolve, reject) => {
        glob(path.resolve(root, 'article/**/*.md'), (err, files) => {

            // 处理错误
            if (err) {
                return reject(err);
            }

            // 返回文件
            resolve(files);
        });
    });
}


/**
 *****************************************
 * 获取文档状态
 *****************************************
 */
function getArticleStats(file) {
    return new Promise((resolve, reject) => {
        fs.stat(file, (err, stats) => {
            let article = {};

            // 处理错误
            if (err) {
                return reject(err);
            }

            // 生成文件信息
            article.title = path.basename(file, '.md');
            article.path = file.replace(root, '');
            article.category = article.path.split(path.sep)[2] || 'notes';
            article.lastModified = formatTime(stats.mtimeMs);

            // 返回文件
            resolve(article);
        });
    });
}


/**
 *****************************************
 * 保存文档列表文件
 *****************************************
 */
function saveArticleList(dir, list) {
    return new Promise((resolve, reject) => {
        fs.writeFile(path.resolve(root, dir), JSON.stringify(list, null, 4), err => {
            err ? reject(err) : resolve();
        });
    });
}


/**
 *****************************************
 * 格式化时间
 *****************************************
 */
function formatTime(timestamp) {
    let date = new Date(timestamp),
        y = date.getFullYear(),
        m = prefixZero(date.getMonth() + 1),
        d = prefixZero(date.getDate()),
        h = prefixZero(date.getHours()),
        i = prefixZero(date.getMinutes()),
        s = prefixZero(date.getSeconds());

    // 拼接时间
    return `${y}-${m}-${d} ${h}:${i}:${s}`;
}


/**
 *****************************************
 * 添加前缀【0】
 *****************************************
 */
function prefixZero(num) {
    return num > 9 ? num : '0' + num;
}


/**
 *****************************************
 * 抛出接口
 *****************************************
 */
module.exports = {
    getArticleList,
    getArticleStats,
    saveArticleList
};
