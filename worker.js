export default {
    async fetch(request, env, ctx) {
        var endWith = request.url.pathname.endsWith(".m3u");
        var isFullM3uPath = /^\/iptv\/([^/]+)\.m3u$/.test(request.url.pathname);
        if (endWith && !isFullM3uPath) {
            request.url.pathname = "/iptv" + request.url.pathname;
            return fetch(request);

        } else if (request.url.pathname !== '/' && !endWith) {
            var response = new Response();
            response.status = 404
            return response;
        } else {
            return fetch(request);
        }

    }
};