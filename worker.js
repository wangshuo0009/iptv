export default {
    async fetch(request, env, ctx) {
        const url = new URL(request.url)
        const pathname = url.pathname

        const endWith = pathname.endsWith(".m3u")
        const isFullM3uPath = /^\/iptv\/([^/]+)\.m3u$/.test(pathname)

        if (endWith && !isFullM3uPath) {
            url.pathname = "/iptv" + pathname

            const response = await fetch(url.origin + url.pathname, request);
            return new Response(response.body, {
                status: response.status,
                headers: { ...response.headers, 'Content-Type': 'audio/x-mpegurl; charset=utf-8' }
            })

        } else if (pathname !== '/' && !endWith) {
            return new Response("Not Found", { status: 404 })
        } else {
            return fetch(request)
        }
    }
};