import { useCallback, useMemo, useState } from 'react'
import Lightbox from 'yet-another-react-lightbox'
import Zoom from 'yet-another-react-lightbox/plugins/zoom'
import 'yet-another-react-lightbox/styles.css'
import { ChevronLeft, ChevronRight, Maximize2, Minus, Plus, RotateCcw, X } from 'lucide-react'
import ArtworkImage from './ArtworkImage'

function ProductGallery({ images = [], title }) {
  const galleryImages = useMemo(() => (images.length > 0 ? images : [null]), [images])
  const lightboxSlides = useMemo(
    () => galleryImages.filter(Boolean).map((image, index) => ({
      src: image,
      alt: `${title} ${index + 1}`,
      imageFit: 'contain',
    })),
    [galleryImages, title],
  )
  const [activeIndex, setActiveIndex] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)

  const imageCount = galleryImages.length
  const activeImage = galleryImages[activeIndex]

  const showPrevious = useCallback(() => {
    setActiveIndex((index) => (index - 1 + imageCount) % imageCount)
  }, [imageCount])

  const showNext = useCallback(() => {
    setActiveIndex((index) => (index + 1) % imageCount)
  }, [imageCount])

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false)
  }, [])

  const openLightbox = () => {
    if (activeImage) setLightboxOpen(true)
  }

  return (
    <>
      <div className="product-gallery">
        <div className="gallery-main-frame">
          <button className="gallery-nav gallery-nav-prev" type="button" onClick={showPrevious} aria-label="Previous image">
            <ChevronLeft size={24} />
          </button>
          <button className="gallery-image-button" type="button" onClick={openLightbox} aria-label="Open image viewer">
            <ArtworkImage
              key={activeImage}
              src={activeImage}
              alt={`${title} ${activeIndex + 1}`}
              placeholderText={title}
              className="gallery-main-image"
            />
            <span className="gallery-zoom-hint">
              <Maximize2 size={16} /> View
            </span>
          </button>
          <button className="gallery-nav gallery-nav-next" type="button" onClick={showNext} aria-label="Next image">
            <ChevronRight size={24} />
          </button>
          <span className="gallery-counter">{activeIndex + 1} / {imageCount}</span>
        </div>

        <div className="thumbnail-row" aria-label="Product image thumbnails">
          {galleryImages.map((image, index) => (
            <button
              className={`gallery-thumbnail ${index === activeIndex ? 'gallery-thumbnail-active' : ''}`}
              type="button"
              key={`${image}-${index}`}
              onClick={() => setActiveIndex(index)}
              aria-label={`Show image ${index + 1}`}
              aria-current={index === activeIndex}
            >
              <ArtworkImage src={image} alt={`${title} thumbnail ${index + 1}`} placeholderText={title} />
            </button>
          ))}
        </div>
      </div>

      <Lightbox
        open={lightboxOpen}
        close={closeLightbox}
        index={activeIndex}
        slides={lightboxSlides}
        plugins={[Zoom]}
        className="product-lightbox"
        carousel={{ imageFit: 'contain', imageProps: { draggable: false } }}
        animation={{ fade: 180, swipe: 260, navigation: 220, zoom: 220 }}
        controller={{ closeOnBackdropClick: true, closeOnEscape: true }}
        zoom={{
          maxZoomPixelRatio: 3,
          zoomInMultiplier: 1.65,
          doubleClickMaxStops: 2,
          wheelZoomDistanceFactor: 130,
          scrollToZoom: true,
          pinchZoomV4: true,
        }}
        toolbar={{ buttons: ['zoom', 'close'] }}
        render={{
          iconPrev: () => <ChevronLeft size={30} />,
          iconNext: () => <ChevronRight size={30} />,
          buttonZoom: ({ zoom, minZoom, maxZoom, disabled, zoomIn, zoomOut, changeZoom }) => (
            <>
              <span>{activeIndex + 1} / {imageCount}</span>
              <button
                type="button"
                className="lightbox-toolbar-button"
                onClick={zoomOut}
                disabled={disabled || zoom <= minZoom}
                aria-label="Zoom out"
              >
                <Minus size={18} />
              </button>
              <button
                type="button"
                className="lightbox-toolbar-button"
                onClick={zoomIn}
                disabled={disabled || zoom >= maxZoom}
                aria-label="Zoom in"
              >
                <Plus size={18} />
              </button>
              <button
                type="button"
                className="lightbox-toolbar-button"
                onClick={() => changeZoom(minZoom)}
                disabled={disabled || zoom <= minZoom}
                aria-label="Reset zoom"
              >
                <RotateCcw size={18} />
              </button>
            </>
          ),
          buttonClose: () => (
            <button className="lightbox-close" type="button" onClick={closeLightbox} aria-label="Close image viewer">
              <X size={24} />
            </button>
          ),
        }}
        on={{ view: ({ index }) => setActiveIndex(index) }}
        labels={{ Lightbox: `${title} image viewer` }}
      />
    </>
  )
}

export default ProductGallery


