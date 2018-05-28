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
import { fetchArticle } from '../../api';
import AppMarked from '../marked';
import style, { use as styled } from './index.scss';

console.log(styled);
/**
 *****************************************
 * 定义变量
 *****************************************
 */
const
    articleCache = {};


/**
 *****************************************
 * Article
 *****************************************
 */
export default class AppArticle extends Component {

    /* 初始化组件 */
    constructor(props, ...args) {
        super(props, ...args);

        // 定义状态
        this.state = { id: '', code: '' };
    }

     /* 更新状态 */
    static getDerivedStateFromProps(props, state) {

        // 更新状态
        if (props.article) {
            if (props.article.id !== state.id) {
                return { id: props.article.id, code: '' };
            }
        } else if (state.id) {
            return { id: '', code: '' };
        }

        // 不变
        return null;
    }

    /* 渲染组件 */
    render() {

        // 返回元素
        return (
            <div className={ styled('container flex tc') }>
                <article className={ styled('article ph20 pt30 tl') }>
                    <AppMarked code={ this.state.code } />
                </article>
            </div>
        );
    }

    /* 挂载完成 */
    componentDidMount() {
        this.componentDidUpdate(null, {});
    }

    /* 更新完成 */
    componentDidUpdate(prevProps, prevState) {
        if (prevState.id !== this.state.id) {
            this.fetchArticleContent(this.state.id);
        }
    }

    /* 获取文档内容 */
    async fetchArticleContent(id) {

        // 获取内容
        if (id) {

            // 创建缓存
            if (!(id in articleCache)) {
                try {
                    let res = await fetchArticle(id);


                    // 处理错误返回
                    if (res.status !== 200) {
                        throw new Error('加载文件失败，请稍后再试');
                    }

                    // 缓存内容
                    articleCache[id] = res.data;
                } catch (err) {
                    articleCache[id] = err.message || '加载文件失败，请稍后再试';
                }
            }

            // 更新内容
            return this.setState({ id, code: articleCache[id] });
        }

        // 清空文档
        this.setState({ id: '', code: '' });
    }
}
