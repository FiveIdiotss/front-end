if(!self.define){let e,s={};const a=(a,i)=>(a=new URL(a+".js",i).href,s[a]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=a,e.onload=s,document.head.appendChild(e)}else e=a,importScripts(a),s()})).then((()=>{let e=s[a];if(!e)throw new Error(`Module ${a} didn’t register its module`);return e})));self.define=(i,n)=>{const c=e||("document"in self?document.currentScript.src:"")||location.href;if(s[c])return;let t={};const r=e=>a(e,c),d={module:{uri:c},exports:t,require:r};s[c]=Promise.all(i.map((e=>d[e]||r(e)))).then((e=>(n(...e),t)))}}define(["./workbox-07a7b4f2"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/3.png",revision:"19ce0133047ed02c5e67541777575769"},{url:"/PWA/web-app-manifest-192x192.png",revision:"09f44ac9ed53d01ed61bfb1dbe2cabc5"},{url:"/PWA/web-app-manifest-512x512.png",revision:"f93286ea8f0d191c5579bff174a43a3c"},{url:"/_next/app-build-manifest.json",revision:"3482e25bbbf9c4f0c181fb04ba2decc5"},{url:"/_next/static/GKV5zq4S2s_P5O519B8Q3/_buildManifest.js",revision:"db1ae3a96efb61c8756c79bf6e67cb22"},{url:"/_next/static/GKV5zq4S2s_P5O519B8Q3/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/1396-345e800e259897f1.js",revision:"GKV5zq4S2s_P5O519B8Q3"},{url:"/_next/static/chunks/2173-989e146d032d13b4.js",revision:"GKV5zq4S2s_P5O519B8Q3"},{url:"/_next/static/chunks/232-93fed72dafe2bfb0.js",revision:"GKV5zq4S2s_P5O519B8Q3"},{url:"/_next/static/chunks/247-5b2e3ca8445aab3f.js",revision:"GKV5zq4S2s_P5O519B8Q3"},{url:"/_next/static/chunks/3028-4ce35b7f57dd30d4.js",revision:"GKV5zq4S2s_P5O519B8Q3"},{url:"/_next/static/chunks/4087-1ed0eb0492c2b746.js",revision:"GKV5zq4S2s_P5O519B8Q3"},{url:"/_next/static/chunks/4152-23531951634a1064.js",revision:"GKV5zq4S2s_P5O519B8Q3"},{url:"/_next/static/chunks/464-456ce792e5a9afbe.js",revision:"GKV5zq4S2s_P5O519B8Q3"},{url:"/_next/static/chunks/4653-b934b4de9efbcb6b.js",revision:"GKV5zq4S2s_P5O519B8Q3"},{url:"/_next/static/chunks/4716-79afb0643da581a4.js",revision:"GKV5zq4S2s_P5O519B8Q3"},{url:"/_next/static/chunks/4918.cfb66c8a141a1ce5.js",revision:"cfb66c8a141a1ce5"},{url:"/_next/static/chunks/4938-a28ed10653b4a6b4.js",revision:"GKV5zq4S2s_P5O519B8Q3"},{url:"/_next/static/chunks/5092-737854ef686946ff.js",revision:"GKV5zq4S2s_P5O519B8Q3"},{url:"/_next/static/chunks/5166-9006e67664f62638.js",revision:"GKV5zq4S2s_P5O519B8Q3"},{url:"/_next/static/chunks/550-d0cdd0f834ff79cb.js",revision:"GKV5zq4S2s_P5O519B8Q3"},{url:"/_next/static/chunks/5771-23797c989f3cd1dc.js",revision:"GKV5zq4S2s_P5O519B8Q3"},{url:"/_next/static/chunks/6048-f37203232e973fa2.js",revision:"GKV5zq4S2s_P5O519B8Q3"},{url:"/_next/static/chunks/6230-9e5c61d081663058.js",revision:"GKV5zq4S2s_P5O519B8Q3"},{url:"/_next/static/chunks/6691-17ee0c6d11d26c8e.js",revision:"GKV5zq4S2s_P5O519B8Q3"},{url:"/_next/static/chunks/7017-ac72fb1857668f9d.js",revision:"GKV5zq4S2s_P5O519B8Q3"},{url:"/_next/static/chunks/7072-6ac9eb744a7b5daa.js",revision:"GKV5zq4S2s_P5O519B8Q3"},{url:"/_next/static/chunks/7301-670bd3e8989623bc.js",revision:"GKV5zq4S2s_P5O519B8Q3"},{url:"/_next/static/chunks/7779-4524aee80a56c0f2.js",revision:"GKV5zq4S2s_P5O519B8Q3"},{url:"/_next/static/chunks/8012d7e2.cfee5e9c70535fb0.js",revision:"cfee5e9c70535fb0"},{url:"/_next/static/chunks/8744-b664d9fed4daa155.js",revision:"GKV5zq4S2s_P5O519B8Q3"},{url:"/_next/static/chunks/8836-3dcff0f5fdb5f760.js",revision:"GKV5zq4S2s_P5O519B8Q3"},{url:"/_next/static/chunks/9067-edb612d449f462e5.js",revision:"GKV5zq4S2s_P5O519B8Q3"},{url:"/_next/static/chunks/9449-9a5de0b6f2b3d652.js",revision:"GKV5zq4S2s_P5O519B8Q3"},{url:"/_next/static/chunks/9833-329cbf31bc067156.js",revision:"GKV5zq4S2s_P5O519B8Q3"},{url:"/_next/static/chunks/9887-9bcb81cd950dd9f1.js",revision:"GKV5zq4S2s_P5O519B8Q3"},{url:"/_next/static/chunks/app/(header)/@modal/(.)account/login/page-460f30881f9cc397.js",revision:"GKV5zq4S2s_P5O519B8Q3"},{url:"/_next/static/chunks/app/(header)/@modal/(.)account/signup/page-5d0c597783f7b7b9.js",revision:"GKV5zq4S2s_P5O519B8Q3"},{url:"/_next/static/chunks/app/(header)/@modal/default-9e3a255de5dcb1e5.js",revision:"GKV5zq4S2s_P5O519B8Q3"},{url:"/_next/static/chunks/app/(header)/account/login/page-a174e5df01ad8b50.js",revision:"GKV5zq4S2s_P5O519B8Q3"},{url:"/_next/static/chunks/app/(header)/account/signup/page-bb00e05a41b90db6.js",revision:"GKV5zq4S2s_P5O519B8Q3"},{url:"/_next/static/chunks/app/(header)/layout-56dcade3b4df787b.js",revision:"GKV5zq4S2s_P5O519B8Q3"},{url:"/_next/static/chunks/app/(header)/page-651297d38125becb.js",revision:"GKV5zq4S2s_P5O519B8Q3"},{url:"/_next/static/chunks/app/(header)/post/edit/mentor/%5Bslug%5D/page-3d9c28a1ae99b6b3.js",revision:"GKV5zq4S2s_P5O519B8Q3"},{url:"/_next/static/chunks/app/(header)/post/edit/quest/%5Bslug%5D/page-49f11afc34fdb7a7.js",revision:"GKV5zq4S2s_P5O519B8Q3"},{url:"/_next/static/chunks/app/(header)/post/edit/request/%5Bslug%5D/page-fed611058815a55f.js",revision:"GKV5zq4S2s_P5O519B8Q3"},{url:"/_next/static/chunks/app/(header)/post/layout-e5203cbc69ef146e.js",revision:"GKV5zq4S2s_P5O519B8Q3"},{url:"/_next/static/chunks/app/(header)/post/new/mentor/page-11fd7c0eb69cb585.js",revision:"GKV5zq4S2s_P5O519B8Q3"},{url:"/_next/static/chunks/app/(header)/post/new/quest/page-3c42f91d830ebc95.js",revision:"GKV5zq4S2s_P5O519B8Q3"},{url:"/_next/static/chunks/app/(header)/post/new/request/page-01ebf191d3bb39af.js",revision:"GKV5zq4S2s_P5O519B8Q3"},{url:"/_next/static/chunks/app/(header)/posts/layout-123acc345d8e53e7.js",revision:"GKV5zq4S2s_P5O519B8Q3"},{url:"/_next/static/chunks/app/(header)/posts/mentor/%5Bslug%5D/page-82b010347e09e818.js",revision:"GKV5zq4S2s_P5O519B8Q3"},{url:"/_next/static/chunks/app/(header)/posts/mentor/page-6e526eda8ca3017c.js",revision:"GKV5zq4S2s_P5O519B8Q3"},{url:"/_next/static/chunks/app/(header)/posts/quest/%5Bslug%5D/page-9a6efdf4eb6f9a2b.js",revision:"GKV5zq4S2s_P5O519B8Q3"},{url:"/_next/static/chunks/app/(header)/posts/quest/page-3ef5993185d1c8fb.js",revision:"GKV5zq4S2s_P5O519B8Q3"},{url:"/_next/static/chunks/app/(header)/posts/request/%5Bslug%5D/page-b15743e6e8745124.js",revision:"GKV5zq4S2s_P5O519B8Q3"},{url:"/_next/static/chunks/app/(header)/posts/request/page-9bf9cc9f4d9667cf.js",revision:"GKV5zq4S2s_P5O519B8Q3"},{url:"/_next/static/chunks/app/(header)/user/layout-b01d9737ed70a964.js",revision:"GKV5zq4S2s_P5O519B8Q3"},{url:"/_next/static/chunks/app/(header)/user/mentoring-request-received/page-d70add8a32304f79.js",revision:"GKV5zq4S2s_P5O519B8Q3"},{url:"/_next/static/chunks/app/(header)/user/mentoring-request/page-107d093fda9b2b88.js",revision:"GKV5zq4S2s_P5O519B8Q3"},{url:"/_next/static/chunks/app/(header)/user/page-7f036e430c746007.js",revision:"GKV5zq4S2s_P5O519B8Q3"},{url:"/_next/static/chunks/app/(nonHeader)/chat/%5Bslug%5D/page-a8c65e2e11f52320.js",revision:"GKV5zq4S2s_P5O519B8Q3"},{url:"/_next/static/chunks/app/(nonHeader)/chat/fileUpload/page-2b023e5b61371b96.js",revision:"GKV5zq4S2s_P5O519B8Q3"},{url:"/_next/static/chunks/app/(nonHeader)/chat/page-c2fe679ae515c00b.js",revision:"GKV5zq4S2s_P5O519B8Q3"},{url:"/_next/static/chunks/app/(nonHeader)/layout-dcaac9d7aa88a308.js",revision:"GKV5zq4S2s_P5O519B8Q3"},{url:"/_next/static/chunks/app/_not-found-0755da04f79e8872.js",revision:"GKV5zq4S2s_P5O519B8Q3"},{url:"/_next/static/chunks/app/error-fc5e6c5ca33f1105.js",revision:"GKV5zq4S2s_P5O519B8Q3"},{url:"/_next/static/chunks/app/layout-eb359adb854a738e.js",revision:"GKV5zq4S2s_P5O519B8Q3"},{url:"/_next/static/chunks/fd9d1056-dc3ebbed024c5e5a.js",revision:"GKV5zq4S2s_P5O519B8Q3"},{url:"/_next/static/chunks/framework-4498e84bb0ba1830.js",revision:"GKV5zq4S2s_P5O519B8Q3"},{url:"/_next/static/chunks/main-01d5195b19929798.js",revision:"GKV5zq4S2s_P5O519B8Q3"},{url:"/_next/static/chunks/main-app-b8fe9c32f0f52868.js",revision:"GKV5zq4S2s_P5O519B8Q3"},{url:"/_next/static/chunks/pages/_app-31397adcb4d2b835.js",revision:"GKV5zq4S2s_P5O519B8Q3"},{url:"/_next/static/chunks/pages/_error-b225d4412fb76f89.js",revision:"GKV5zq4S2s_P5O519B8Q3"},{url:"/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",revision:"837c0df77fd5009c9e46d446188ecfd0"},{url:"/_next/static/chunks/webpack-36018e5f670236b3.js",revision:"GKV5zq4S2s_P5O519B8Q3"},{url:"/_next/static/css/0e5661b480b3c572.css",revision:"0e5661b480b3c572"},{url:"/_next/static/css/8624e07af678d352.css",revision:"8624e07af678d352"},{url:"/_next/static/css/8aee48eb52f4c731.css",revision:"8aee48eb52f4c731"},{url:"/_next/static/css/8f6460aaa849693f.css",revision:"8f6460aaa849693f"},{url:"/_next/static/css/ce476ae09e1a8ece.css",revision:"ce476ae09e1a8ece"},{url:"/_next/static/media/021bc4481ed92ece-s.woff2",revision:"0f5cb8880dd308345f58cecdc5fc5041"},{url:"/_next/static/media/3f69592b2fe603c7-s.woff2",revision:"84568c0a37620328592a78e9ad069d77"},{url:"/_next/static/media/4f05ba3a6752a328-s.p.woff2",revision:"ea21cc6e4b393851204d1a3160ad6abc"},{url:"/_next/static/media/6325a8417175c41d-s.woff2",revision:"a3fd0c427e31c0cadb48607ee8c7876b"},{url:"/_next/static/media/99b7f73d5af7c3e2-s.woff2",revision:"e94b5e20c27aefc321077e0493d637fa"},{url:"/_next/static/media/apple-touch-icon.56597326.png",revision:"e9ff6cbda42f10652c1e39240f35eb73"},{url:"/_next/static/media/calendarCheck.a22835a2.png",revision:"a2e47ed21ed55e498e633c6cc70b18d5"},{url:"/_next/static/media/check.291466f1.png",revision:"3b25d3a71b6e1e488e84d69a02d1f5e7"},{url:"/_next/static/media/checkBox.932ee22e.png",revision:"0e6aeca3cd39e02ba09e01470ad40114"},{url:"/_next/static/media/dotLoading.838ae9c5.gif",revision:"320076dd4228c01419f8e79e11b77246"},{url:"/_next/static/media/fileAdd.47f2ecc9.png",revision:"d82031e0b9fc071892fa645be32494de"},{url:"/_next/static/media/fixImage.906549b5.png",revision:"c4926a2cb2e3c2664d20ff3113472d45"},{url:"/_next/static/media/light-bulb.7474d19d.png",revision:"bacddb51e6d42fef48dd5d68134de6ee"},{url:"/_next/static/media/revicons.652e7269.eot",revision:"652e7269"},{url:"/_next/static/media/revicons.b96bdb22.ttf",revision:"b96bdb22"},{url:"/_next/static/media/revicons.ff59b316.woff",revision:"ff59b316"},{url:"/_next/static/media/send.d1f7a9d7.svg",revision:"bc54381460f1f5eef0a439ee7786f267"},{url:"/_next/static/media/success.4c9d4ba1.png",revision:"bdae5b85e37be2f1e07f6585a9b7cc16"},{url:"/_next/static/media/warning_red.a20c4b89.png",revision:"d59e58a782680fc91628db2f007b33ed"},{url:"/addTime.png",revision:"6e60db686cf963e7dbd7a2a35cdfc1ed"},{url:"/addTime2.png",revision:"b44693e1bf05833ca54fcb8303e4455f"},{url:"/addTime3.png",revision:"8cc1857c8704194ae19b3a26f8a61cb8"},{url:"/apple-touch-icon.png",revision:"e9ff6cbda42f10652c1e39240f35eb73"},{url:"/arrow-right-double.svg",revision:"e970da06af01d07a7ac34ebdebb5d852"},{url:"/back.svg",revision:"cfd59a83af70be0d7bc795e13d76b30c"},{url:"/calendarCheck.png",revision:"a2e47ed21ed55e498e633c6cc70b18d5"},{url:"/chat/capture.svg",revision:"13afdce9ff51c4fdcc62af518a2b0d0a"},{url:"/chat/emoticon.svg",revision:"99752dec752f9639563d56b6c170482c"},{url:"/chat/file.svg",revision:"581787f24b9e566695bb26e947ff6f77"},{url:"/chat/fileAdd.png",revision:"d82031e0b9fc071892fa645be32494de"},{url:"/chat/send.svg",revision:"bc54381460f1f5eef0a439ee7786f267"},{url:"/check.png",revision:"3b25d3a71b6e1e488e84d69a02d1f5e7"},{url:"/checkBox.png",revision:"0e6aeca3cd39e02ba09e01470ad40114"},{url:"/dotLoading.gif",revision:"320076dd4228c01419f8e79e11b77246"},{url:"/favicon-96x96.png",revision:"9e6ef6302a145709b1bdd28682d82d91"},{url:"/favicon.ico",revision:"858004e6c5b437309cd352d70f5e11cb"},{url:"/fixImage.png",revision:"c4926a2cb2e3c2664d20ff3113472d45"},{url:"/info.png",revision:"9f293500b2867d1e3f8aed08cabae8c4"},{url:"/ios-share-icon.png",revision:"8508762603bdd139f9aab971dbf4bd2a"},{url:"/light-bulb.png",revision:"bacddb51e6d42fef48dd5d68134de6ee"},{url:"/mainLogo1.png",revision:"790916aa18e80cb5ef655e733982041b"},{url:"/mainLogo34.png",revision:"f0cdaf83b13adb095a9a7860c84a4cb8"},{url:"/manifest.json",revision:"61c537ef423c00b17b6fa9b3c5d968e1"},{url:"/menteetoIco.svg",revision:"aed2944905c491957f132b31c0a8481c"},{url:"/next.svg",revision:"652f09134eb0d02eb502cf9d71bbccb5"},{url:"/search.svg",revision:"0d0f09508a60bcbcf47e581329a04914"},{url:"/social/naver.png",revision:"9b8bbec2b446ff566ce2df35bc2d7905"},{url:"/success.png",revision:"bdae5b85e37be2f1e07f6585a9b7cc16"},{url:"/theme.png",revision:"553621a715642ba2589d2b2421406605"},{url:"/vercel.svg",revision:"61c6b19abff40ea7acd577be818f3976"},{url:"/warning_red.png",revision:"d59e58a782680fc91628db2f007b33ed"},{url:"/warning_yellow.png",revision:"818b27017c24a378697b7fa88bd6d033"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:a,state:i})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
