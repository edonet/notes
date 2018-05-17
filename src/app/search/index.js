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

    /* 初始化组件 */
    constructor(props, ...args) {
        super(props, ...args);

        // 定义属性
        this.$$delay = 300;
        this.$$timeStamp = null;
        this.$$isComposing = false;

        // 定义状态
        this.state = { value: '' };

        // 绑定回调
        this.handleInput = this.handleInput.bind(this);
        this.handleCompositionStart = this.handleCompositionStart.bind(this);
        this.handleCompositionEnd = this.handleCompositionEnd.bind(this);
    }

    /* 更新状态 */
    static getDerivedStateFromProps(props, state) {

        // 更新状态
        if (props.keyword !== state.value) {
            return { value: props.keyword };
        }

        // 不变
        return null;
    }

    /* 渲染组件 */
    render() {
        let { className, ...rest } = this.props,
            props = {
                value: this.state.value,
                onInput: this.handleInput,
                onCompositionStart: this.handleCompositionStart,
                onCompositionEnd: this.handleCompositionEnd
            };

        // 屏蔽原生【change】事件
        delete rest.keyword;
        delete rest.onChange;

        // 返回元素
        return (
            <div className={ className }>
                <input className={ styled('input') } { ...rest } { ...props } />
            </div>
        );
    }

    /* 触发更新 */
    handleChange(value) {

        // 更新状态
        this.setState({ value });

        // 派发事件
        this.$$timeStamp && clearTimeout(this.$$timeStamp);
        this.$$timeStamp = setTimeout(() => {
            this.$$timeStamp = null;
            this.props.onChange && this.props.onChange(value);
        }, this.$$delay);
    }

    /* 监听输入 */
    handleInput(event) {
        this.props.onInput && this.props.onInput(event);
        this.$$isComposing || this.handleChange(event.target.value);
    }

    /* 监听开始合成 */
    handleCompositionStart() {
        this.$$isComposing = true;
    }

    /* 监听结束合成 */
    handleCompositionEnd(event) {
        console.log(event.target.value);
        this.handleChange(event.target.value);
        this.$$isComposing = false;
    }
}
