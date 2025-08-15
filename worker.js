export default {
    async fetch(request, env, ctx) {
        const url = new URL(request.url);
        url.href = 'https://iptv.wangshuos.com/jslt.m3u'
        let pathname = url.pathname;
        if (pathname.endsWith(".m3u") && !/^\/iptv\/([^/]+)\.m3u$/.test(url.pathname)) {
            url.pathname = "/iptv" + url.pathname;
            request = new Request(url.toString(), request);
        }

        return fetch(request);
    }
};