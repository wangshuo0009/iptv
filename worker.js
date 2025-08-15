export default {
    async fetch(request, env, ctx) {
        var endWith = request.url.pathname.endsWith(".m3u");
        var isFullM3uPath = /^\/iptv\/([^/]+)\.m3u$/.test(request.url.pathname);
        if (endWith && !isFullM3uPath) {
            request.url.pathname = "/iptv" + request.url.pathname;
            return fetch(request);

        } else if (request.url.pathname !== '/' && !endWith) {
            return new Response("Not Found", { status: 404 });
        } else {
            return fetch(request);
        }

    }
};