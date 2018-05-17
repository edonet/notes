/**
 *****************************************
 * Created by lifx
 * Created on 2018-05-17 12:42:55
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
 * 搜索组件
 *****************************************
 */
export default class AppSearch extends Component {
    render() {
        let { className, ...props } = this.props;

        // 返回元素
        return (
            <div className={ className }>
                <input className={ styled('input') } { ...props } />
            </div>
        );
    }
}
