/**
 * 主应用 **可以使用任意技术栈**
 *
 * @format
 */

import render from './ReactRender';
import {
    registerMicroApps, // 注册子应用
    runAfterFirstMounted, // 第一个微应用 mount 后需要调用的方法，比如开启一些监控或者埋点脚本。
    start, // 启动
    setDefaultMountApp, // 设置主应用启动后默认进入的微应用。
    initGlobalState // 定义全局状态，并返回通信方法，建议在主应用使用，微应用通过 props 获取通信方法。
} from 'qiankun';

/**
 * Step1 初始化应用（可选）
 */
render({ loading: true });

const loader = loading => render({ loading });

/**
 * Step2 注册子应用
 */

/**
 * name - string - 必选，微应用的名称，微应用之间必须确保唯一。

entry - string | { scripts?: string[]; styles?: string[]; html?: string } - 必选，微应用的 entry 地址。

container - string | HTMLElement - 必选，微应用的容器节点的选择器或者 Element 实例。如container: '#root' 或 container: document.querySelector('#root')。

activeRule - string | (location: Location) => boolean | Array<string | (location: Location) => boolean> - 必选，微应用的激活规则。
    支持直接配置字符串或字符串数组，如 activeRule: '/app1' 或 activeRule: ['/app1', '/app2']，当配置为字符串时会直接跟 url 中的路径部分做前缀匹配，匹配成功表明当前应用会被激活。
    支持配置一个 active function 函数或一组 active function。函数会传入当前 location 作为参数，函数返回 true 时表明当前微应用会被激活。如 location => location.pathname.startsWith('/app1')。
loader - (loading: boolean) => void - 可选，loading 状态发生变化时会调用的方法。
props - object - 可选，主应用需要传递给微应用的数据。
    *
*/

registerMicroApps(
    [
        {
            name: 'one',
            entry: '//localhost:1111',
            container: '#subapp-viewport',
            loader,
            activeRule: '/one',
            props: {
                msg: 1
            }
        },
        {
            name: 'two',
            entry: '//localhost:2222',
            container: '#subapp-viewport',
            loader,
            activeRule: '/two',
            props: {
                msg: 2
            }
        }
    ],
    {
        beforeLoad: [
            app => {
                console.log(
                    '[LifeCycle] before load %c%s',
                    'color: green;',
                    app.name
                );
            }
        ],
        beforeMount: [
            app => {
                console.log(
                    '[LifeCycle] before mount %c%s',
                    'color: green;',
                    app.name
                );
            }
        ],
        afterUnmount: [
            app => {
                console.log(
                    '[LifeCycle] after unmount %c%s',
                    'color: green;',
                    app.name
                );
            }
        ]
    }
);

// 通讯
const { onGlobalStateChange, setGlobalState } = initGlobalState({
    user: 'qiankun'
});

onGlobalStateChange((value, prev) =>
    console.log('[onGlobalStateChange - master]:', value, prev)
);

setGlobalState({
    ignore: 'master',
    user: {
        name: 'master'
    }
});

/**
 * Step3 设置默认进入的子应用
 */
setDefaultMountApp('/one');

/**
 * Step4 启动应用
 */
start();

runAfterFirstMounted(() => {
    console.log('[MainApp] first app mounted');
});
