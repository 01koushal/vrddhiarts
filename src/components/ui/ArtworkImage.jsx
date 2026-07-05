import { useState } from 'react'
import { Image } from 'lucide-react'

function ArtworkImage({ src, alt, className = '', placeholderText = 'Artwork image coming soon', ...props }) {
  const [failed, setFailed] = useState(!src)

  if (failed) {
    return (
      <div className={`artwork-placeholder ${className}`} role="img" aria-label={placeholderText}>
        <Image size={28} aria-hidden="true" />
        <span>{placeholderText}</span>
      </div>
    )
  }

  return <img className={className} src={src} alt={alt} loading="lazy" onError={() => setFailed(true)} {...props} />
}

export default ArtworkImage
