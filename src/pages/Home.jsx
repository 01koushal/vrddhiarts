import { Gem, Heart, Sparkles } from 'lucide-react'
import InstagramIcon from '../components/ui/InstagramIcon'
import Button from '../components/ui/Button'
import CategoryCard from '../components/ui/CategoryCard'
import ProductCard from '../components/ui/ProductCard'
import SectionHeader from '../components/ui/SectionHeader'
import { siteConfig } from '../config/siteConfig'
import { getFeaturedCategories, getFeaturedProducts } from '../utils/catalog'

const promiseCards = [
  {
    icon: Heart,
    title: 'Every Creation is One of a Kind',
    text:
      'No two stories are the same, and neither are our creations. Every product is custom-made to reflect your memories, emotions, and special moments. Each piece is uniquely designed, ensuring that no two creations are ever identical.',
  },
  {
    icon: Sparkles,
    title: 'Crafted Around Your Story',
    text:
      "You don't need to know exactly what you want. Simply share your idea, occasion, or memory, and we'll guide you with the best creative options to bring your vision to life.",
  },
  {
    icon: Gem,
    title: 'Made with Patience, Never in a Hurry',
    text:
      'Handmade art takes time. Every order is carefully planned, designed, and handcrafted with attention to every detail. Urgent requests are accepted whenever possible, depending on the complexity and our production schedule.',
  },
  {
    icon: Heart,
    title: 'Honest Work. Real Creations.',
    text:
      'Everything you see on our website and social media has been genuinely handcrafted by us. No misleading images. No false promises. Just honest work created with passion and care.',
  },
  {
    icon: Sparkles,
    title: 'We Value Every Memory Entrusted to Us',
    text:
      "Whether it's preserved flowers, wedding keepsakes, gifts, or sentimental pieces, we understand the emotions behind every order. Your memories are treated with the same care and respect as if they were our own.",
  },
  {
    icon: Gem,
    title: 'Handmade with Purpose',
    text:
      "Our goal isn't simply to create beautiful products. It's to create keepsakes that make your special moments even more meaningful and bring a smile that lasts long after the occasion is over.",
  },
  {
    icon: Heart,
    title: 'Supporting a Small Business Means Supporting Creativity',
    text:
      'Every order supports a dream, encourages handmade artistry, and inspires us to explore new ideas, designs, and creative possibilities. Your support helps creativity continue to grow.',
  },
]

const workSteps = [
  'Tell us about your idea or occasion.',
  'We discuss designs, customization and suggest the best options.',
  'Once finalized, your order is confirmed.',
  'We carefully handcraft your creation.',
  'Your order is securely packed and delivered.',
]

function Home() {
  return (
    <>
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy reveal">
            <span className="eyebrow">Handmade Art</span>
            <h1>Vrddhi Arts</h1>
            <p>Made by Hand. Meant for the Heart.</p>
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
              <strong>Designed exclusively for you, with your story at the heart of every creation.</strong>
            </div>
          </div>
        </div>
      </section>

      <section className="section muted-section">
        <div className="container split-section story-section">
          <div>
            <span className="eyebrow">Our Story</span>
            <h2>Our Story</h2>
          </div>
          <p>Our story will be added soon.</p>
          <Button to="/about" variant="secondary">Read About Us</Button>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeader eyebrow="Featured Collections" title="Featured Collections" />
          <div className="category-grid">
            {getFeaturedCategories().map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </div>
      </section>

      <section className="section muted-section">
        <div className="container split-section classes-section">
          <div>
            <span className="eyebrow">Online Classes</span>
            <h2>Learn with VrddhiArts</h2>
          </div>
          <p>Online classes details will be added soon.</p>
          <Button href={siteConfig.instagramUrl} target="_blank" rel="noreferrer" variant="secondary">
            <InstagramIcon size={18} /> Contact on Instagram
          </Button>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeader eyebrow="The Vrddhi Promise" title="The Vrddhi Promise" align="center" />
          <div className="promise-grid">
            {promiseCards.map((item) => (
              <article className="promise-card reveal" key={item.title}>
                <item.icon size={24} />
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section muted-section how-work-section">
        <div className="container">
          <SectionHeader eyebrow="How We Work" title="How We Work" align="center" />
          <div className="work-timeline">
            {workSteps.map((step, index) => (
              <article className="work-step" key={step}>
                <span>Step {index + 1}</span>
                <p>{step}</p>
              </article>
            ))}
          </div>
          <p className="work-quote">Every creation begins with your story and ends with a memory you'll cherish forever.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeader eyebrow="Gallery" title="Gallery" />
          <div className="product-grid">
            {getFeaturedProducts().map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section className="section muted-section testimonials-section">
        <div className="container narrow empty-state">
          <SectionHeader eyebrow="Testimonials" title="Testimonials" align="center" />
          <p>Testimonials will be added soon.</p>
        </div>
      </section>

      <section className="section cta-section">
        <div className="container cta-panel">
          <div>
            <span className="eyebrow">Contact</span>
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
