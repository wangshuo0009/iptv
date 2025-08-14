export default {
    async fetch(request, env, ctx) {
        const url = new URL(request.url);
        let pathname = url.pathname;

        // 如果不是 /iptv/ 开头，并且以 .m3u 结尾
        if (pathname.endsWith('.m3u') && !pathname.startsWith('/iptv/')) {
            const lastSlash = pathname.lastIndexOf('/');
            const dotM3u = pathname.lastIndexOf('.m3u');
            const fileName = pathname.substring(lastSlash + 1, dotM3u);

            // 改写路径到 /iptv/ 目录
            pathname = '/iptv/'+ fileName +'.m3u';
        }

        // 用请求的 host 拼成完整 URL
        // const targetUrl = '${url.protocol}//${url.host}${pathname}';
        const targetUrl = 'https://iptv.wangshuos.com' + pathname
        
        // 发请求并返回，同时设置正确 Content-Type
        const response = await fetch(targetUrl);
        return new Response(response.body, {
            status: response.status,
            headers: {
                ...response.headers,
                'Content-Type': 'audio/x-mpegurl; charset=utf-8'
            }
        });
    }
};