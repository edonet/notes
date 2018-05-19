/**
 *****************************************
 * Created by lifx
 * Created on 2018-04-15 13:56:10
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载依赖
 *****************************************
 */
import './style.scss?global';
import './atom-one-dark.css?global';
import marked from './marked.min.js';
import hljs from './highlight.min.js';



/**
 *****************************************
 * 创建渲染器
 *****************************************
 */
const
    renderer = new marked.Renderer(),
    highlight = (language, code) => hljs.highlight(language, code).value,
    code = (content = '', language = 'javascript') => (
        `<pre class="hljs" data-lang="${ language.toUpperCase() }" v-pre >` +
            `<code class="lang-${ language }">${ highlight(language, content) }</code>` +
        '</pre>'
    );


/**
 *****************************************
 * 配置代码高亮加载
 *****************************************
 */
renderer.code = code;


/**
 *****************************************
 * 配置【marked】
 *****************************************
 */
marked.setOptions({ renderer });


/**
 *****************************************
 * 抛出接口
 *****************************************
 */
export default marked;
export { code, highlight };
