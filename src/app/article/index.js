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


/**
 *****************************************
 * 定义变量
 *****************************************
 */
const styled = use(style);


/**
 *****************************************
 * Article
 *****************************************
 */
export default class AppArticle extends Component {
    render() {
        let { article } = this.props;

        // 返回元素
        return (
            <div className={ styled('container flex tc') }>
                <article className={ styled('article ph20 pt30 tl') }>
                    { article && article.title }
                </article>
            </div>
        );
    }
}
