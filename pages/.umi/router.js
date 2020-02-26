import React from 'react';
import {
  Router as DefaultRouter,
  Route,
  Switch,
  StaticRouter,
} from 'react-router-dom';
import dynamic from 'umi/dynamic';
import renderRoutes from 'umi/lib/renderRoutes';
import history from '@@/history';

const Router = DefaultRouter;

const routes = [
  {
    path: '/',
    component: props =>
      React.createElement(
        require('E:/Study/Project/Wetrial/wetrial-core/node_modules/umi-plugin-father-doc/lib/themes/default/layout.js')
          .default,
        {
          ...{
            menus: {
              '*': {
                '*': [
                  {
                    path: '/',
                    title: 'README',
                    meta: { locale: 'zh-CN', title: 'README', order: null },
                  },
                  {
                    path: '/request',
                    title: 'request ajax请求',
                    meta: {
                      title: 'request ajax请求',
                      path: '/request',
                      order: 12000,
                      slugs: [
                        { depth: 1, value: '使用方式', heading: '使用方式' },
                        { depth: 1, value: 'Methods', heading: 'methods' },
                        {
                          depth: 2,
                          value: 'IRequestOption',
                          heading: 'irequestoption',
                        },
                      ],
                    },
                  },
                  {
                    path: '/model',
                    title: 'model model基础类',
                    meta: {
                      title: 'model model基础类',
                      path: '/model',
                      order: 1100,
                      slugs: [
                        { depth: 1, value: '使用方式', heading: '使用方式' },
                      ],
                    },
                  },
                  {
                    path: '/authority',
                    title: 'authority 权限相关',
                    meta: {
                      title: 'authority 权限相关',
                      path: '/authority',
                      order: 1000,
                      slugs: [
                        { depth: 1, value: '使用方式', heading: '使用方式' },
                        { depth: 1, value: 'Methods', heading: 'methods' },
                      ],
                    },
                  },
                  {
                    path: '/exception',
                    title: 'exception 基础异常类',
                    meta: {
                      title: 'exception 基础异常类',
                      path: '/exception',
                      order: 1000,
                      slugs: [
                        { depth: 1, value: '使用方式', heading: '使用方式' },
                        { depth: 1, value: 'Methods', heading: 'methods' },
                      ],
                    },
                  },
                  {
                    path: '/store',
                    title: 'store 本地存储',
                    meta: {
                      title: 'store 本地存储',
                      path: '/store',
                      order: 300,
                      slugs: [
                        { depth: 1, value: '使用方式', heading: '使用方式' },
                        { depth: 1, value: 'Methods', heading: 'methods' },
                      ],
                    },
                  },
                  {
                    path: '/validation',
                    title: 'validation 验证',
                    meta: {
                      title: 'validation 验证',
                      path: '/validation',
                      order: 300,
                      slugs: [
                        { depth: 1, value: '案例', heading: '案例' },
                        { depth: 2, value: '基本使用', heading: '基本使用' },
                      ],
                    },
                  },
                  {
                    path: '/utils',
                    title: 'utils 辅助方法',
                    meta: {
                      title: 'utils 辅助方法',
                      path: '/utils',
                      order: 200,
                      slugs: [
                        { depth: 1, value: '使用方式', heading: '使用方式' },
                        { depth: 1, value: 'Methods', heading: 'methods' },
                      ],
                    },
                  },
                ],
              },
            },
            locales: [],
            navs: {},
            title: 'Wetrial Core',
            logo: 'https://avatars2.githubusercontent.com/u/40448889?s=66&v=4',
            mode: 'doc',
            repoUrl: 'https://github.com/wetrial/core',
          },
          ...props,
        },
      ),
    routes: [
      {
        path: '/',
        component: require('../../README.md').default,
        exact: true,
        meta: {
          locale: 'zh-CN',
          title: 'README',
          order: null,
        },
        title: 'README',
        _title: 'Wetrial Core - README',
        _title_default: 'Wetrial Core',
      },
      {
        path: '/authority',
        component: require('../../docs/authority.md').default,
        exact: true,
        meta: {
          title: 'authority 权限相关',
          path: '/authority',
          order: 1000,
          slugs: [
            {
              depth: 1,
              value: '使用方式',
              heading: '使用方式',
            },
            {
              depth: 1,
              value: 'Methods',
              heading: 'methods',
            },
          ],
        },
        title: 'authority 权限相关',
        Routes: [require('./TitleWrapper.jsx').default],
        _title: 'Wetrial Core - authority 权限相关',
        _title_default: 'Wetrial Core',
      },
      {
        path: '/exception',
        component: require('../../docs/exception.md').default,
        exact: true,
        meta: {
          title: 'exception 基础异常类',
          path: '/exception',
          order: 1000,
          slugs: [
            {
              depth: 1,
              value: '使用方式',
              heading: '使用方式',
            },
            {
              depth: 1,
              value: 'Methods',
              heading: 'methods',
            },
          ],
        },
        title: 'exception 基础异常类',
        Routes: [require('./TitleWrapper.jsx').default],
        _title: 'Wetrial Core - exception 基础异常类',
        _title_default: 'Wetrial Core',
      },
      {
        path: '/model',
        component: require('../../docs/model.md').default,
        exact: true,
        meta: {
          title: 'model model基础类',
          path: '/model',
          order: 1100,
          slugs: [
            {
              depth: 1,
              value: '使用方式',
              heading: '使用方式',
            },
          ],
        },
        title: 'model model基础类',
        Routes: [require('./TitleWrapper.jsx').default],
        _title: 'Wetrial Core - model model基础类',
        _title_default: 'Wetrial Core',
      },
      {
        path: '/request',
        component: require('../../docs/request.md').default,
        exact: true,
        meta: {
          title: 'request ajax请求',
          path: '/request',
          order: 12000,
          slugs: [
            {
              depth: 1,
              value: '使用方式',
              heading: '使用方式',
            },
            {
              depth: 1,
              value: 'Methods',
              heading: 'methods',
            },
            {
              depth: 2,
              value: 'IRequestOption',
              heading: 'irequestoption',
            },
          ],
        },
        title: 'request ajax请求',
        Routes: [require('./TitleWrapper.jsx').default],
        _title: 'Wetrial Core - request ajax请求',
        _title_default: 'Wetrial Core',
      },
      {
        path: '/store',
        component: require('../../docs/store.md').default,
        exact: true,
        meta: {
          title: 'store 本地存储',
          path: '/store',
          order: 300,
          slugs: [
            {
              depth: 1,
              value: '使用方式',
              heading: '使用方式',
            },
            {
              depth: 1,
              value: 'Methods',
              heading: 'methods',
            },
          ],
        },
        title: 'store 本地存储',
        Routes: [require('./TitleWrapper.jsx').default],
        _title: 'Wetrial Core - store 本地存储',
        _title_default: 'Wetrial Core',
      },
      {
        path: '/utils',
        component: require('../../docs/utils.md').default,
        exact: true,
        meta: {
          title: 'utils 辅助方法',
          path: '/utils',
          order: 200,
          slugs: [
            {
              depth: 1,
              value: '使用方式',
              heading: '使用方式',
            },
            {
              depth: 1,
              value: 'Methods',
              heading: 'methods',
            },
          ],
        },
        title: 'utils 辅助方法',
        Routes: [require('./TitleWrapper.jsx').default],
        _title: 'Wetrial Core - utils 辅助方法',
        _title_default: 'Wetrial Core',
      },
      {
        path: '/validation',
        component: require('../../docs/validation.md').default,
        exact: true,
        meta: {
          title: 'validation 验证',
          path: '/validation',
          order: 300,
          slugs: [
            {
              depth: 1,
              value: '案例',
              heading: '案例',
            },
            {
              depth: 2,
              value: '基本使用',
              heading: '基本使用',
            },
          ],
        },
        title: 'validation 验证',
        Routes: [require('./TitleWrapper.jsx').default],
        _title: 'Wetrial Core - validation 验证',
        _title_default: 'Wetrial Core',
      },
      {
        component: () =>
          React.createElement(
            require('E:/Study/Project/Wetrial/wetrial-core/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
              .default,
            { pagesPath: 'pages', hasRoutesInConfig: false },
          ),
        _title: 'Wetrial Core',
        _title_default: 'Wetrial Core',
      },
    ],
    title: 'Wetrial Core',
    _title: 'Wetrial Core',
    _title_default: 'Wetrial Core',
  },
];
window.g_routes = routes;
const plugins = require('umi/_runtimePlugin');
plugins.applyForEach('patchRoutes', { initialValue: routes });

export { routes };

export default class RouterWrapper extends React.Component {
  unListen() {}

  constructor(props) {
    super(props);

    // route change handler
    function routeChangeHandler(location, action) {
      plugins.applyForEach('onRouteChange', {
        initialValue: {
          routes,
          location,
          action,
        },
      });
    }
    this.unListen = history.listen(routeChangeHandler);
    // dva 中 history.listen 会初始执行一次
    // 这里排除掉 dva 的场景，可以避免 onRouteChange 在启用 dva 后的初始加载时被多执行一次
    const isDva =
      history.listen
        .toString()
        .indexOf('callback(history.location, history.action)') > -1;
    if (!isDva) {
      routeChangeHandler(history.location);
    }
  }

  componentWillUnmount() {
    this.unListen();
  }

  render() {
    const props = this.props || {};
    return <Router history={history}>{renderRoutes(routes, props)}</Router>;
  }
}
