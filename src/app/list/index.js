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
        let { list, article, onChange } = this.props;

        // 返回元素
        return list && list.map(x => (
            <li key={ x.title }
                className={ styled('article ph15 pv10 bdbt', x === article && 'actived') }
                onClick={ () => onChange(x) }>
                <h3 className="f18 nowrap">{ x.title }</h3>
                <p className="f12 nowrap">
                    <span>{ x.date.split(' ')[0] }</span>
                    <span className="pl10">{ x.tags.join('、') }</span>
                </p>
            </li>
        ));
    }

    // 监听搜索关键字过滤
    handleKeywordChange(keyword) {
        this.setState({ keyword });
    }
}
