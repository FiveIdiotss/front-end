import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    const hostUrl = process.env.HOST_URL || 'https://menteetor.site';

    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: '/user/',
        },
        sitemap: `${hostUrl}/sitemap.xml`,
    };
}
