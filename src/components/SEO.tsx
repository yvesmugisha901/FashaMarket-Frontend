import { Helmet } from 'react-helmet-async'

interface SEOProps {
    title?: string
    description?: string
    image?: string
    url?: string
    type?: 'website' | 'product' | 'article'
    price?: number
    keywords?: string
}

const BASE_URL = 'https://fashamarket.rw'
const DEFAULT_IMAGE = `${BASE_URL}/og-image.jpg`
const SITE_NAME = 'FashaMarket'
const DEFAULT_DESC = 'Buy and sell second-hand products in Rwanda. Electronics, clothing, furniture, shoes and more. Safe, verified sellers, fast delivery in Kigali.'

export default function SEO({
    title,
    description = DEFAULT_DESC,
    image = DEFAULT_IMAGE,
    url = BASE_URL,
    type = 'website',
    price,
    keywords = 'buy sell Rwanda, second hand Kigali, marketplace Rwanda, electronics Kigali, clothing Rwanda',
}: SEOProps) {
    const fullTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} — Buy & Sell Second-Hand in Rwanda`

    return (
        <Helmet>
            {/* Basic */}
            <title>{fullTitle}</title>
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />
            <meta name="author" content="FashaMarket" />
            <meta name="robots" content="index, follow" />
            <link rel="canonical" href={url} />

            {/* Open Graph — WhatsApp, Facebook */}
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />
            <meta property="og:url" content={url} />
            <meta property="og:type" content={type} />
            <meta property="og:site_name" content={SITE_NAME} />
            <meta property="og:locale" content="en_RW" />

            {/* Twitter Card */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={image} />

            {/* Product specific */}
            {price && <meta property="product:price:amount" content={price.toString()} />}
            {price && <meta property="product:price:currency" content="RWF" />}

            {/* Mobile */}
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <meta name="theme-color" content="#18181b" />
        </Helmet>
    )
}