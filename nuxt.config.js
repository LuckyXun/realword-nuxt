export default {
    router: {
        linkExactActiveClass:"active",
        extendRoutes(routes, resolve) {
            // 清除
            routes.splice(0, routes.length);
            routes.push(...[{
                name: 'home',
                path: '/',
                component: resolve(__dirname, 'pages/home')
            },
            {
                name: 'login',
                path: '/login',
                component: resolve(__dirname, 'pages/login')
            },
            {
                name: 'register',
                path: '/register',
                component: resolve(__dirname, 'pages/login')
            },
            {
                name: 'settings',
                path: '/settings',
                component: resolve(__dirname, 'pages/settings')
            },
            {
                name: 'publishArticle',
                path: '/editor',
                component: resolve(__dirname, 'pages/editor')
            },
            {
                name: 'editArticle',
                path: '/editor/:slug',
                component: resolve(__dirname, 'pages/editor')
            },
            {
                name: 'article',
                path: '/article/:slug',
                component: resolve(__dirname, 'pages/article')
            },
            {
                name: 'profile',
                path: '/profile/:username',
                component: resolve(__dirname, 'pages/profile')
            },
            {
                name: 'favorites',
                path: '/profile/:username/favorites',
                component: resolve(__dirname, 'pages/profile')
            }

            ])
        }
    }
}