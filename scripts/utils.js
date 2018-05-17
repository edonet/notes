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
    root = path.resolve(__dirname, '../') + '/';


/**
 *****************************************
 * 获取文档
 *****************************************
 */
function getArticleList(match) {
    return new Promise((resolve, reject) => {
        glob(path.resolve(root, match), (err, files) => {

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
 * 获取文档缓存列表
 *****************************************
 */
function getArticleMapper(dir) {
    let mapper = {};

    try {
        let list = require(path.resolve(root, dir));

        // 生成映射
        list.forEach(x => mapper[x.id] = x);
    } catch (err) {
        // do nothing;
    }

    // 返回对象
    return mapper;
}


/**
 *****************************************
 * 获取文档状态
 *****************************************
 */
function getArticleStats(file, manifest = {}) {
    return new Promise((resolve, reject) => {
        fs.stat(file, async (err, stats) => {
            let article = {},
                id, cache;

            // 处理错误
            if (err) {
                return reject(err);
            }

            // 获取绑在
            id = file.replace(root, '');
            cache = manifest[id] || {};

            // 文件未更新
            if (cache.lastModified === stats.mtimeMs) {
                return resolve(cache);
            }

            // 生成文件信息
            article.id = id;
            article.title = path.basename(file, '.md');
            article.lastModified = stats.mtimeMs;
            article.date = formatTime(stats.mtimeMs);
            article.category = upperCase(article.id.split(path.sep)[1] || 'notes');
            article.tags = await getArticleTags(file, [article.category, Math.random() > .6 ? '随笔' : '备忘']);

            // 返回文件
            resolve(article);
        });
    });
}


/**
 *****************************************
 * 首字母大小
 *****************************************
 */
function upperCase(str) {
    return str.substring(0, 1).toUpperCase() + str.substring(1);
}


/**
 *****************************************
 * 获取文件标签
 *****************************************
 */
function getArticleTags(file, defaults) {
    return new Promise(resolve => {
        fs.readFile(file, (err, str) => {
            if (!err) {
                let tags = new Set(defaults),
                    regexp = /\*\*(\S+?)\*\*/g,
                    matched = regexp.exec(str);

                // 提取标签
                while (matched) {
                    tags.add(matched[1]);
                    matched = regexp.exec(str);
                }

                // 生成结果
                resolve(tags.size ? [...tags] : defaults);
            }

            // 返回结果
            return resolve(defaults);
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
    getArticleMapper,
    getArticleStats,
    saveArticleList
};
