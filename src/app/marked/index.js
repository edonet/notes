/**
 *****************************************
 * Created by lifx
 * Created on 2018-05-19 14:27:36
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载依赖
 *****************************************
 */
import React, { Component } from 'react';
import marked from './marked';


/**
 *****************************************
 * 【markdown】组件
 *****************************************
 */
export default class AppMarked extends Component {
    render() {
        return (
            <div className="art-marked" dangerouslySetInnerHTML={{ __html: marked(this.props.code) }} />
        );
    }
}
