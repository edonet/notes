/**
 *****************************************
 * Created by lifx
 * Created on 2018-05-16 20:46:12
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


/**
 *****************************************
 * 定义变量
 *****************************************
 */
const styled = use(style);


/**
 *****************************************
 * Category
 *****************************************
 */
export default class AppCategory extends Component {

    /* 渲染组件 */
    render() {
        return (
            <header className={ styled('container lock') }>
                <h1 className="f18 pl15 pt20 pb15">AIRNOTES</h1>
                <ul>{ this.renderCategory() }</ul>
            </header>
        );
    }

    /* 渲染分类 */
    renderCategory() {
        let { category, list: curr, onChange } = this.props;

        // 生成元素列表
        return category.map(({ name, list }) => (
            <li key={ name }
                className={ styled('category pv10 pl25 pr15 nowrap', list === curr && 'actived') }
                onClick={ () => onChange(list) }>
                { this.upperCase(name) }
            </li>
        ));
    }

    /* 首字母大写 */
    upperCase(str) {
        return str.substring(0, 1).toUpperCase() + str.substring(1);
    }
}
