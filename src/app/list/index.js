/**
 *****************************************
 * Created by lifx
 * Created on 2018-05-16 21:27:56
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载依赖
 *****************************************
 */
import React, { Component } from 'react';
import { use } from 'ylan/style';
import style from './index.scss';
import AppSearch from '../search';


/**
 *****************************************
 * 定义变量
 *****************************************
 */
const styled = use(style);


/**
 *****************************************
 * List
 *****************************************
 */
export default class AppList extends Component {

    /* 初始化组件 */
    constructor(props, ...args) {
        super(props, ...args);

        // 定义状态
        this.state = { keyword: '' };

        // 绑定回调
        this.handleKeywordChange = this.handleKeywordChange.bind(this);
    }

    /* 渲染组件 */
    render() {
        return (
            <aside className={ styled('container lock bdrt col') }>
                <AppSearch
                    className={ styled('searchbar bdbt ph15 pv15') }
                    keyword={ this.state.keyword }
                    onChange={ this.handleKeywordChange }
                    placeholder="Search"
                />
                <nav className={ styled('list flex') }>
                    <ul>{ this.renderArticleList() }</ul>
                </nav>
            </aside>
        );
    }

    /* 渲染文档列表 */
    renderArticleList() {
        let { list, article, onChange } = this.props,
            node = [];


        // 添加节点
        list && list.forEach(x => {
            this.matchSearch(x) && node.push(
                <li key={ x.title }
                    className={ styled('article ph15 pv10 bdbt', x === article && 'actived') }
                    onClick={ () => onChange(x) }>
                    <h3 className="f18 nowrap">{ x.title }</h3>
                    <p className="f12 nowrap">
                        <span>{ x.date.split(' ')[0] }</span>
                        <span className="pl10">{ x.tags.join('、') }</span>
                    </p>
                </li>
            );
        });

        // 添加空白提示
        node.length || node.push(
            <li key="nothings" className="pt30 gc tc">Find nothings...</li>
        );

        // 返回节点
        return node;
    }

    /* 判断是否匹配关键字 */
    matchSearch({ title, category, tags }) {
        let keyword = this.state.keyword;

        // 匹配关键字
        if (keyword) {
            let str = [title, category, tags.join(' ')].join(' ').toLowerCase(),
                match = keyword.toLowerCase();

            // 判断是否包含关键字
            return str.indexOf(match) > -1;
        }

        // 默认匹配全部
        return true;
    }

    // 监听搜索关键字过滤
    handleKeywordChange(keyword) {
        this.setState({ keyword });
    }
}
