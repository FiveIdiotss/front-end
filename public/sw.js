if(!self.define){let e,a={};const s=(s,n)=>(s=new URL(s+".js",n).href,a[s]||new Promise((a=>{if("document"in self){const e=document.createElement("script");e.src=s,e.onload=a,document.head.appendChild(e)}else e=s,importScripts(s),a()})).then((()=>{let e=a[s];if(!e)throw new Error(`Module ${s} didn’t register its module`);return e})));self.define=(n,i)=>{const c=e||("document"in self?document.currentScript.src:"")||location.href;if(a[c])return;let t={};const r=e=>s(e,c),d={module:{uri:c},exports:t,require:r};a[c]=Promise.all(n.map((e=>d[e]||r(e)))).then((e=>(i(...e),t)))}}define(["./workbox-07a7b4f2"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/3.png",revision:"19ce0133047ed02c5e67541777575769"},{url:"/PWA/web-app-manifest-192x192.png",revision:"09f44ac9ed53d01ed61bfb1dbe2cabc5"},{url:"/PWA/web-app-manifest-512x512.png",revision:"f93286ea8f0d191c5579bff174a43a3c"},{url:"/_next/app-build-manifest.json",revision:"840b366e7d40723c3656dceb900d9b15"},{url:"/_next/static/CA292k8a7ja7Q953S0UH0/_buildManifest.js",revision:"db1ae3a96efb61c8756c79bf6e67cb22"},{url:"/_next/static/CA292k8a7ja7Q953S0UH0/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/1396-345e800e259897f1.js",revision:"CA292k8a7ja7Q953S0UH0"},{url:"/_next/static/chunks/2173-989e146d032d13b4.js",revision:"CA292k8a7ja7Q953S0UH0"},{url:"/_next/static/chunks/226-1a88ebbd3ea677a4.js",revision:"CA292k8a7ja7Q953S0UH0"},{url:"/_next/static/chunks/232-93fed72dafe2bfb0.js",revision:"CA292k8a7ja7Q953S0UH0"},{url:"/_next/static/chunks/247-5b2e3ca8445aab3f.js",revision:"CA292k8a7ja7Q953S0UH0"},{url:"/_next/static/chunks/2843-a8386250b28a2ce2.js",revision:"CA292k8a7ja7Q953S0UH0"},{url:"/_next/static/chunks/3028-4ce35b7f57dd30d4.js",revision:"CA292k8a7ja7Q953S0UH0"},{url:"/_next/static/chunks/3950-8d3506488bcfb831.js",revision:"CA292k8a7ja7Q953S0UH0"},{url:"/_next/static/chunks/4087-1ed0eb0492c2b746.js",revision:"CA292k8a7ja7Q953S0UH0"},{url:"/_next/static/chunks/4152-23531951634a1064.js",revision:"CA292k8a7ja7Q953S0UH0"},{url:"/_next/static/chunks/4653-b934b4de9efbcb6b.js",revision:"CA292k8a7ja7Q953S0UH0"},{url:"/_next/static/chunks/4918.cfb66c8a141a1ce5.js",revision:"cfb66c8a141a1ce5"},{url:"/_next/static/chunks/4938-a28ed10653b4a6b4.js",revision:"CA292k8a7ja7Q953S0UH0"},{url:"/_next/static/chunks/5092-7e856bcbcf9e787b.js",revision:"CA292k8a7ja7Q953S0UH0"},{url:"/_next/static/chunks/5166-9006e67664f62638.js",revision:"CA292k8a7ja7Q953S0UH0"},{url:"/_next/static/chunks/550-d0cdd0f834ff79cb.js",revision:"CA292k8a7ja7Q953S0UH0"},{url:"/_next/static/chunks/5771-23797c989f3cd1dc.js",revision:"CA292k8a7ja7Q953S0UH0"},{url:"/_next/static/chunks/6048-f37203232e973fa2.js",revision:"CA292k8a7ja7Q953S0UH0"},{url:"/_next/static/chunks/6230-9e5c61d081663058.js",revision:"CA292k8a7ja7Q953S0UH0"},{url:"/_next/static/chunks/6315-eb0b35873ca9efc5.js",revision:"CA292k8a7ja7Q953S0UH0"},{url:"/_next/static/chunks/6691-17ee0c6d11d26c8e.js",revision:"CA292k8a7ja7Q953S0UH0"},{url:"/_next/static/chunks/7017-ac72fb1857668f9d.js",revision:"CA292k8a7ja7Q953S0UH0"},{url:"/_next/static/chunks/7072-6ac9eb744a7b5daa.js",revision:"CA292k8a7ja7Q953S0UH0"},{url:"/_next/static/chunks/7301-c32a8c1c80e3b93d.js",revision:"CA292k8a7ja7Q953S0UH0"},{url:"/_next/static/chunks/7779-4524aee80a56c0f2.js",revision:"CA292k8a7ja7Q953S0UH0"},{url:"/_next/static/chunks/8012d7e2.cfee5e9c70535fb0.js",revision:"cfee5e9c70535fb0"},{url:"/_next/static/chunks/8744-b664d9fed4daa155.js",revision:"CA292k8a7ja7Q953S0UH0"},{url:"/_next/static/chunks/8836-3dcff0f5fdb5f760.js",revision:"CA292k8a7ja7Q953S0UH0"},{url:"/_next/static/chunks/9067-edb612d449f462e5.js",revision:"CA292k8a7ja7Q953S0UH0"},{url:"/_next/static/chunks/9449-9a5de0b6f2b3d652.js",revision:"CA292k8a7ja7Q953S0UH0"},{url:"/_next/static/chunks/9833-329cbf31bc067156.js",revision:"CA292k8a7ja7Q953S0UH0"},{url:"/_next/static/chunks/app/(header)/@modal/(.)account/login/page-460f30881f9cc397.js",revision:"CA292k8a7ja7Q953S0UH0"},{url:"/_next/static/chunks/app/(header)/@modal/(.)account/signup/page-5d0c597783f7b7b9.js",revision:"CA292k8a7ja7Q953S0UH0"},{url:"/_next/static/chunks/app/(header)/@modal/default-9e3a255de5dcb1e5.js",revision:"CA292k8a7ja7Q953S0UH0"},{url:"/_next/static/chunks/app/(header)/account/login/page-a174e5df01ad8b50.js",revision:"CA292k8a7ja7Q953S0UH0"},{url:"/_next/static/chunks/app/(header)/account/signup/page-bb00e05a41b90db6.js",revision:"CA292k8a7ja7Q953S0UH0"},{url:"/_next/static/chunks/app/(header)/layout-dc4cdd0317a9a6d4.js",revision:"CA292k8a7ja7Q953S0UH0"},{url:"/_next/static/chunks/app/(header)/page-4a208137d66bbb71.js",revision:"CA292k8a7ja7Q953S0UH0"},{url:"/_next/static/chunks/app/(header)/post/edit/mentor/%5Bslug%5D/page-3d9c28a1ae99b6b3.js",revision:"CA292k8a7ja7Q953S0UH0"},{url:"/_next/static/chunks/app/(header)/post/edit/quest/%5Bslug%5D/page-49f11afc34fdb7a7.js",revision:"CA292k8a7ja7Q953S0UH0"},{url:"/_next/static/chunks/app/(header)/post/edit/request/%5Bslug%5D/page-fed611058815a55f.js",revision:"CA292k8a7ja7Q953S0UH0"},{url:"/_next/static/chunks/app/(header)/post/layout-a1c37e7f0337161e.js",revision:"CA292k8a7ja7Q953S0UH0"},{url:"/_next/static/chunks/app/(header)/post/new/mentor/page-11fd7c0eb69cb585.js",revision:"CA292k8a7ja7Q953S0UH0"},{url:"/_next/static/chunks/app/(header)/post/new/quest/page-3c42f91d830ebc95.js",revision:"CA292k8a7ja7Q953S0UH0"},{url:"/_next/static/chunks/app/(header)/post/new/request/page-01ebf191d3bb39af.js",revision:"CA292k8a7ja7Q953S0UH0"},{url:"/_next/static/chunks/app/(header)/posts/layout-7769a3c7e684f8af.js",revision:"CA292k8a7ja7Q953S0UH0"},{url:"/_next/static/chunks/app/(header)/posts/mentor/%5Bslug%5D/page-82b010347e09e818.js",revision:"CA292k8a7ja7Q953S0UH0"},{url:"/_next/static/chunks/app/(header)/posts/mentor/page-204b058321e9956e.js",revision:"CA292k8a7ja7Q953S0UH0"},{url:"/_next/static/chunks/app/(header)/posts/quest/%5Bslug%5D/page-9a6efdf4eb6f9a2b.js",revision:"CA292k8a7ja7Q953S0UH0"},{url:"/_next/static/chunks/app/(header)/posts/quest/page-119ae6f76d2e471c.js",revision:"CA292k8a7ja7Q953S0UH0"},{url:"/_next/static/chunks/app/(header)/posts/request/%5Bslug%5D/page-b15743e6e8745124.js",revision:"CA292k8a7ja7Q953S0UH0"},{url:"/_next/static/chunks/app/(header)/posts/request/page-d9b27071951abf52.js",revision:"CA292k8a7ja7Q953S0UH0"},{url:"/_next/static/chunks/app/(header)/user/layout-b01d9737ed70a964.js",revision:"CA292k8a7ja7Q953S0UH0"},{url:"/_next/static/chunks/app/(header)/user/mentoring-request-received/page-d70add8a32304f79.js",revision:"CA292k8a7ja7Q953S0UH0"},{url:"/_next/static/chunks/app/(header)/user/mentoring-request/page-107d093fda9b2b88.js",revision:"CA292k8a7ja7Q953S0UH0"},{url:"/_next/static/chunks/app/(header)/user/page-7f036e430c746007.js",revision:"CA292k8a7ja7Q953S0UH0"},{url:"/_next/static/chunks/app/(nonHeader)/chat/%5Bslug%5D/page-a8c65e2e11f52320.js",revision:"CA292k8a7ja7Q953S0UH0"},{url:"/_next/static/chunks/app/(nonHeader)/chat/fileUpload/page-2b023e5b61371b96.js",revision:"CA292k8a7ja7Q953S0UH0"},{url:"/_next/static/chunks/app/(nonHeader)/chat/page-c2fe679ae515c00b.js",revision:"CA292k8a7ja7Q953S0UH0"},{url:"/_next/static/chunks/app/(nonHeader)/layout-dcaac9d7aa88a308.js",revision:"CA292k8a7ja7Q953S0UH0"},{url:"/_next/static/chunks/app/_not-found-0755da04f79e8872.js",revision:"CA292k8a7ja7Q953S0UH0"},{url:"/_next/static/chunks/app/error-fc5e6c5ca33f1105.js",revision:"CA292k8a7ja7Q953S0UH0"},{url:"/_next/static/chunks/app/layout-f20b3189175be5d1.js",revision:"CA292k8a7ja7Q953S0UH0"},{url:"/_next/static/chunks/fd9d1056-dc3ebbed024c5e5a.js",revision:"CA292k8a7ja7Q953S0UH0"},{url:"/_next/static/chunks/framework-4498e84bb0ba1830.js",revision:"CA292k8a7ja7Q953S0UH0"},{url:"/_next/static/chunks/main-01d5195b19929798.js",revision:"CA292k8a7ja7Q953S0UH0"},{url:"/_next/static/chunks/main-app-b8fe9c32f0f52868.js",revision:"CA292k8a7ja7Q953S0UH0"},{url:"/_next/static/chunks/pages/_app-31397adcb4d2b835.js",revision:"CA292k8a7ja7Q953S0UH0"},{url:"/_next/static/chunks/pages/_error-b225d4412fb76f89.js",revision:"CA292k8a7ja7Q953S0UH0"},{url:"/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",revision:"837c0df77fd5009c9e46d446188ecfd0"},{url:"/_next/static/chunks/webpack-7f471198da6f87ce.js",revision:"CA292k8a7ja7Q953S0UH0"},{url:"/_next/static/css/2097e8fbd753273a.css",revision:"2097e8fbd753273a"},{url:"/_next/static/css/8624e07af678d352.css",revision:"8624e07af678d352"},{url:"/_next/static/css/8aee48eb52f4c731.css",revision:"8aee48eb52f4c731"},{url:"/_next/static/css/c2398d1e6a1f4977.css",revision:"c2398d1e6a1f4977"},{url:"/_next/static/css/ce476ae09e1a8ece.css",revision:"ce476ae09e1a8ece"},{url:"/_next/static/media/07b30c88f8c1c1ad-s.woff2",revision:"35bdf4061198a4e8a0d8145b05e9c5d7"},{url:"/_next/static/media/34a9823ac715e2c2-s.p.woff2",revision:"5e441970bf58012e0bda6fe2f18d6365"},{url:"/_next/static/media/a1b64b733866887d-s.woff2",revision:"04d24cf25f8b82ab9a6cab517ab820d3"},{url:"/_next/static/media/apple-touch-icon.56597326.png",revision:"e9ff6cbda42f10652c1e39240f35eb73"},{url:"/_next/static/media/calendarCheck.a22835a2.png",revision:"a2e47ed21ed55e498e633c6cc70b18d5"},{url:"/_next/static/media/check.291466f1.png",revision:"3b25d3a71b6e1e488e84d69a02d1f5e7"},{url:"/_next/static/media/checkBox.932ee22e.png",revision:"0e6aeca3cd39e02ba09e01470ad40114"},{url:"/_next/static/media/dotLoading.838ae9c5.gif",revision:"320076dd4228c01419f8e79e11b77246"},{url:"/_next/static/media/fileAdd.47f2ecc9.png",revision:"d82031e0b9fc071892fa645be32494de"},{url:"/_next/static/media/fixImage.906549b5.png",revision:"c4926a2cb2e3c2664d20ff3113472d45"},{url:"/_next/static/media/light-bulb.7474d19d.png",revision:"bacddb51e6d42fef48dd5d68134de6ee"},{url:"/_next/static/media/send.d1f7a9d7.svg",revision:"bc54381460f1f5eef0a439ee7786f267"},{url:"/_next/static/media/success.4c9d4ba1.png",revision:"bdae5b85e37be2f1e07f6585a9b7cc16"},{url:"/_next/static/media/warning_red.a20c4b89.png",revision:"d59e58a782680fc91628db2f007b33ed"},{url:"/_next/static/media/사범계.34cdb6ef.png",revision:"b6b94bc4d18a26fd53d8e16bffd19968"},{url:"/_next/static/media/사회학.ba2a8a3f.png",revision:"888baa2a39bd2b18f26ea11518d8a543"},{url:"/_next/static/media/예체능.e6301012.png",revision:"2eb0dd62f522168574600fc30bb1a07b"},{url:"/_next/static/media/의약계.02425e57.png",revision:"5a41251a7c47fb4e88e77a5210b07fce"},{url:"/_next/static/media/이공계.5f585933.png",revision:"05954c900bc3b95cb22fbebae1ec38f4"},{url:"/_next/static/media/인문학.a1a0e56b.png",revision:"a13580af58185523766972afcf8059a9"},{url:"/_next/static/media/자연계.d930bdf9.png",revision:"407973c7c3f49627c42277e5d214fbc4"},{url:"/_next/static/media/전체.db1e9660.png",revision:"264510edc404c0a1301ab61aa3e5386e"},{url:"/addTime.png",revision:"6e60db686cf963e7dbd7a2a35cdfc1ed"},{url:"/addTime2.png",revision:"b44693e1bf05833ca54fcb8303e4455f"},{url:"/addTime3.png",revision:"8cc1857c8704194ae19b3a26f8a61cb8"},{url:"/apple-touch-icon.png",revision:"e9ff6cbda42f10652c1e39240f35eb73"},{url:"/arrow-right-double.svg",revision:"e970da06af01d07a7ac34ebdebb5d852"},{url:"/back.svg",revision:"cfd59a83af70be0d7bc795e13d76b30c"},{url:"/calendarCheck.png",revision:"a2e47ed21ed55e498e633c6cc70b18d5"},{url:"/chat/capture.svg",revision:"13afdce9ff51c4fdcc62af518a2b0d0a"},{url:"/chat/emoticon.svg",revision:"99752dec752f9639563d56b6c170482c"},{url:"/chat/file.svg",revision:"581787f24b9e566695bb26e947ff6f77"},{url:"/chat/fileAdd.png",revision:"d82031e0b9fc071892fa645be32494de"},{url:"/chat/send.svg",revision:"bc54381460f1f5eef0a439ee7786f267"},{url:"/check.png",revision:"3b25d3a71b6e1e488e84d69a02d1f5e7"},{url:"/checkBox.png",revision:"0e6aeca3cd39e02ba09e01470ad40114"},{url:"/departments/사범계.png",revision:"b6b94bc4d18a26fd53d8e16bffd19968"},{url:"/departments/사회학.png",revision:"888baa2a39bd2b18f26ea11518d8a543"},{url:"/departments/예체능.png",revision:"2eb0dd62f522168574600fc30bb1a07b"},{url:"/departments/의약계.png",revision:"5a41251a7c47fb4e88e77a5210b07fce"},{url:"/departments/이공계.png",revision:"05954c900bc3b95cb22fbebae1ec38f4"},{url:"/departments/인문학.png",revision:"a13580af58185523766972afcf8059a9"},{url:"/departments/자연계.png",revision:"407973c7c3f49627c42277e5d214fbc4"},{url:"/departments/전체.png",revision:"264510edc404c0a1301ab61aa3e5386e"},{url:"/dotLoading.gif",revision:"320076dd4228c01419f8e79e11b77246"},{url:"/favicon-96x96.png",revision:"9e6ef6302a145709b1bdd28682d82d91"},{url:"/favicon.ico",revision:"858004e6c5b437309cd352d70f5e11cb"},{url:"/fixImage.png",revision:"c4926a2cb2e3c2664d20ff3113472d45"},{url:"/info.png",revision:"9f293500b2867d1e3f8aed08cabae8c4"},{url:"/ios-share-icon.png",revision:"8508762603bdd139f9aab971dbf4bd2a"},{url:"/light-bulb.png",revision:"bacddb51e6d42fef48dd5d68134de6ee"},{url:"/logo/og-image.png",revision:"4c5c3c2ce33911e5866a03ad0a0b53a6"},{url:"/mainLogo1.png",revision:"790916aa18e80cb5ef655e733982041b"},{url:"/mainLogo34.png",revision:"f0cdaf83b13adb095a9a7860c84a4cb8"},{url:"/manifest.json",revision:"61c537ef423c00b17b6fa9b3c5d968e1"},{url:"/menteetoIco.svg",revision:"aed2944905c491957f132b31c0a8481c"},{url:"/next.svg",revision:"652f09134eb0d02eb502cf9d71bbccb5"},{url:"/search.svg",revision:"0d0f09508a60bcbcf47e581329a04914"},{url:"/social/naver.png",revision:"9b8bbec2b446ff566ce2df35bc2d7905"},{url:"/success.png",revision:"bdae5b85e37be2f1e07f6585a9b7cc16"},{url:"/theme.png",revision:"553621a715642ba2589d2b2421406605"},{url:"/vercel.svg",revision:"61c6b19abff40ea7acd577be818f3976"},{url:"/warning_red.png",revision:"d59e58a782680fc91628db2f007b33ed"},{url:"/warning_yellow.png",revision:"818b27017c24a378697b7fa88bd6d033"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:a,event:s,state:n})=>a&&"opaqueredirect"===a.type?new Response(a.body,{status:200,statusText:"OK",headers:a.headers}):a}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const a=e.pathname;return!a.startsWith("/api/auth/")&&!!a.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
