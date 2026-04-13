import React from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: string;
  productData?: any;
}

export default function SEO({ 
  title = "Eminixstore | Premium Shopping, Timeless Elegance", 
  description = "Discover curated masterpieces at Eminixstore. Haute couture, timeless accessories, and modern living essentials.",
  image = "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&q=80",
  url = "https://eminixstore.com",
  type = "website",
  productData
}: SEOProps) {
  // In a real Next.js app, we would use next/head. 
  // Since this is a Vite SPA, we'll use a simple effect to update document title and meta tags.
  
  React.useEffect(() => {
    document.title = title;
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', description);
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = description;
      document.head.appendChild(meta);
    }

    // Open Graph
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', title);
    
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', description);

    const ogImage = document.querySelector('meta[property="og:image"]');
    if (ogImage) ogImage.setAttribute('content', image);

    // Structured Data (JSON-LD)
    if (productData) {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.text = JSON.stringify({
        "@context": "https://schema.org/",
        "@type": "Product",
        "name": productData.name,
        "image": productData.image,
        "description": productData.description,
        "sku": productData.sku || productData.id,
        "brand": {
          "@type": "Brand",
          "name": "Eminix"
        },
        "offers": {
          "@type": "Offer",
          "url": window.location.href,
          "priceCurrency": "USD",
          "price": productData.price,
          "availability": "https://schema.org/InStock"
        }
      });
      document.head.appendChild(script);
      return () => {
        document.head.removeChild(script);
      };
    }
  }, [title, description, image, productData]);

  return null;
}
