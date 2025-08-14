export default {
    async fetch(request, env, ctx) {
        const url = new URL(request.url);
        const pathname = url.pathname;

        // 如果路径以 .m3u 结尾
        if (pathname.endsWith('.m3u')) {
            // 获取最后一个 / 和 .m3u 之间的文件名
            const lastSlash = pathname.lastIndexOf('/');
            const dotM3u = pathname.lastIndexOf('.m3u');
            const fileName = pathname.substring(lastSlash + 1, dotM3u);

            // 拼接到 Pages 上的 iptv/ 目录
            const target = `https://iptv.wangshuos/iptv/${fileName}.m3u`;

            // 反向代理并设置正确 Content-Type
            return fetch(target, {
                headers: { 'Content-Type': 'audio/x-mpegurl; charset=utf-8' }
            });
        }

        return new Response('Not Found', { status: 404 });
    }
};