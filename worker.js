export default {
    async fetch(request, env, ctx) {
        const url = new URL(request.url);
        let pathname = url.pathname;

        // 如果不是 /iptv/ 开头，并且以 .m3u 结尾
        if (pathname.endsWith('.m3u') && !url.href.match(/^\/iptv\/([^/]+)\.m3u$/)) {
            request.href = url.origin + "/iptv" + url.pathname;
        }
        return fetch(request);
    }
};