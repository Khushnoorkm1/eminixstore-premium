export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 1,
    title: "The Art of Minimalist Living",
    excerpt: "Discover how to curate a home that reflects your inner peace and sophisticated taste. We explore the principles of minimalism and how they can be applied to modern interior design.",
    content: `
      Minimalism is more than just a design trend; it's a philosophy of intentionality. By stripping away the unnecessary, we create space for the things that truly matter. 

      In the context of home decor, minimalism doesn't mean having an empty room. It means choosing each piece with care, ensuring it serves a purpose—whether functional or aesthetic. 

      ### Key Principles of Minimalist Design:
      1. **Quality Over Quantity**: Invest in a few high-quality, timeless pieces rather than many cheap, trendy ones.
      2. **Neutral Color Palettes**: Soft whites, greys, and earth tones create a calming atmosphere and make spaces feel larger.
      3. **Strategic Lighting**: Use natural light whenever possible, and choose elegant, simple fixtures for the evening.
      4. **Decluttered Spaces**: Clear surfaces help clear the mind. Use hidden storage to keep essentials out of sight.

      At Eminixstore, we curate our Home Decor collection with these principles in mind. Each item is designed to bring a sense of calm and sophistication to your living space.
    `,
    image: "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?w=1200&q=80",
    category: "Lifestyle",
    author: "Elena Rodriguez",
    date: "April 10, 2026",
    readTime: "5 min read"
  },
  {
    id: 2,
    title: "Mastering the Capsule Wardrobe",
    excerpt: "A guide to building a timeless collection of essentials that never go out of style. Learn how to select pieces that are versatile, high-quality, and uniquely you.",
    content: `
      The 'Capsule Wardrobe' is the ultimate solution to the dynamic world of fast fashion. It's about building a versatile collection of clothes that look great together, regardless of the season.

      ### Why a Capsule Wardrobe?
      - **Sustainability**: Reducing waste by buying fewer, better items.
      - **Efficiency**: Getting dressed in the morning becomes effortless when everything matches.
      - **Cost-Effective**: High-quality pieces last years, saving you money in the long run.

      ### How to Start:
      Start with the basics: a perfectly fitted white shirt, a classic trench coat, well-tailored trousers, and premium knitwear. Choose a base color (like black or navy) and add a few accent pieces in gold or teal (the Eminix signature).

      Our Apparel collection at Eminixstore is built around these timeless silhouettes, ensuring you always look polished without the clutter.
    `,
    image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=1200&q=80",
    category: "Fashion",
    author: "Sarah Jenkins",
    date: "April 08, 2026",
    readTime: "8 min read"
  },
  {
    id: 3,
    title: "Tech Meets Elegance",
    excerpt: "How modern innovations are being integrated into luxury design seamlessly. We look at the latest smart home gadgets that don't compromise on aesthetic appeal.",
    content: `
      Technology is no longer just about functionality; it's about form. The modern gadget should look as good as it performs. 

      We're seeing a shift from 'techy' appearances toward materials that belong in a high-end interior: brushed gold, deep teal finishes, and soft-touch fabrics. 

      ### Features to Look For:
      - **Seamless Integration**: Gadgets that blend into your decor rather than standing out.
      - **Haptic Feedback**: A premium touch experience that feels high-end.
      - **Smart Automation**: Technology that anticipates your needs silently in the background.

      From minimalist earphone cases to elegant smart lighting, Eminixstore's Electronics collection proves that you don't have to choose between cutting-edge tech and classic style.
    `,
    image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=1200&q=80",
    category: "Innovation",
    author: "Michael Chen",
    date: "April 05, 2026",
    readTime: "6 min read"
  },
  {
    id: 4,
    title: "The Future of Sustainable Luxury",
    excerpt: "Exploring how premium brands are embracing eco-friendly practices without losing their exclusive appeal.",
    content: `
      The definition of luxury is evolving. Today, exclusivity is increasingly defined by the ethical story behind a product. 

      Sustainable luxury isn't a contradiction; it's the gold standard. Using recycled materials, ensuring fair labor practices, and focusing on longevity are the new marks of a premium brand.

      ### Eminix's Commitment:
      We partner with artisans who respect the environment and focus on materials that stand the test of time. A product that lasts a lifetime is the most sustainable luxury of all.
    `,
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1200&q=80",
    category: "Sustainability",
    author: "David Atten",
    date: "April 02, 2026",
    readTime: "10 min read"
  }
];
