/**
 *****************************************
 * Created by lifx
 * Created on 2018-05-16 20:39:28
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载依赖
 *****************************************
 */
import './style';
import React, { Component } from 'react';
import articles from '../settings/article.json';
import AppCategory from './category';
import AppList from './list';
import AppArticle from './article';


/**
 *****************************************
 * App
 *****************************************
 */
export default class App extends Component {

    /* 初始化【App】 */
    constructor(props, ...args) {
        super(props, ...args);

        // 定义状态
        this.state = this.createAppState(articles);

        // 绑定回调
        this.handleChangeList = this.handleChangeList.bind(this);
        this.handleChangeArticle = this.handleChangeArticle.bind(this);
    }

    /* 渲染【App】 */
    render() {
        let { category, list, article } = this.state;

        // 返回元素
        return (
            <div className="fixed row">
                <AppCategory category={ category } list={ list } onChange={ this.handleChangeList } />
                <AppList list={ list } article={ article } onChange={ this.handleChangeArticle } />
                <AppArticle article={ article } />
            </div>
        );
    }

    /* 创建状态 */
    createAppState(articleList) {
        let map = Object.create(null),
            category = [{ name: 'All', list: articleList }],
            list = null,
            article = null;

        // 分类文档
        articleList.forEach(article => {
            let name = article.category;

            if (name in map) {
                map[name].list.push(category);
            } else {
                category.push(map[name] = { name, list: [article] });
            }
        });

        // 设置默认项
        list = category.length ? category[0].list : null;
        article = list ? list[0] : null;

        // 返回数据
        return { category, list, article };
    }

    /* 监听切换文档列表 */
    handleChangeList(list) {
        this.setState({ list, article: list && list[0] });
    }

    /* 监听切换文档列表 */
    handleChangeArticle(article) {
        this.setState({ article });
    }
}
