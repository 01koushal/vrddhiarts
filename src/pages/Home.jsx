import { Gem, Heart, Sparkles } from 'lucide-react'
import InstagramIcon from '../components/ui/InstagramIcon'
import Button from '../components/ui/Button'
import CategoryCard from '../components/ui/CategoryCard'
import ProductCard from '../components/ui/ProductCard'
import SectionHeader from '../components/ui/SectionHeader'
import { siteConfig } from '../config/siteConfig'
import { getFeaturedCategories, getFeaturedProducts } from '../utils/catalog'

function Home() {
  return (
    <>
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy reveal">
            <span className="eyebrow">Handmade Resin Art</span>
            <h1>Vrddhi Arts</h1>
            <p>{siteConfig.tagline}</p>
            <div className="hero-actions">
              <Button to="/collections">Explore Collections</Button>
              <Button href={siteConfig.instagramUrl} target="_blank" rel="noreferrer" variant="secondary">
                <InstagramIcon size={18} /> Contact on Instagram
              </Button>
            </div>
          </div>
          <div className="hero-art reveal">
            <div className="hero-mark">VA</div>
            <div>
              <span>Custom made</span>
              <strong>Preserved memories in resin</strong>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeader
            eyebrow="Collections"
            title="Thoughtfully crafted keepsakes"
            text="A calm catalogue foundation for resin art categories, subcategories, galleries, and product details."
          />
          <div className="category-grid">
            {getFeaturedCategories().map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </div>
      </section>

      <section className="section muted-section">
        <div className="container split-section">
          <div>
            <span className="eyebrow">About Vrddhi Arts</span>
            <h2>Made slowly, finished beautifully.</h2>
          </div>
          <p>
            Vrddhi Arts creates resin keepsakes for memories that deserve a physical form: flowers, names, photos,
            jewellery, frames, decor, and meaningful gifts. Every piece is treated as a custom artwork, not a shelf item.
          </p>
          <Button to="/about" variant="secondary">Read About Us</Button>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeader eyebrow="Why Choose Us" title="Quiet details, premium finish" align="center" />
          <div className="promise-grid">
            {[
              { icon: Heart, title: 'Memory-led', text: 'Designed around the story and occasion behind each piece.' },
              { icon: Gem, title: 'Elegant finish', text: 'A polished, minimal presentation that lets the artwork breathe.' },
              { icon: Sparkles, title: 'Custom friendly', text: 'Built for personalization across names, photos, flowers, and forms.' },
            ].map((item) => (
              <article className="promise-card reveal" key={item.title}>
                <item.icon size={24} />
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeader eyebrow="Featured Products" title="Placeholders ready for real artwork" />
          <div className="product-grid">
            {getFeaturedProducts().map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section className="section cta-section">
        <div className="container cta-panel">
          <div>
            <span className="eyebrow">Start a custom order</span>
            <h2>Tell us what you want to preserve.</h2>
            <p>Share the occasion, artwork type, and any reference details. Pricing is always shared on request.</p>
          </div>
          <div className="cta-actions">
            <Button href={siteConfig.instagramUrl} target="_blank" rel="noreferrer" variant="secondary">
              <InstagramIcon size={18} /> Contact on Instagram
            </Button>
            <Button to="/contact">Contact Us</Button>
          </div>
        </div>
      </section>
    </>
  )
}

export default Home

