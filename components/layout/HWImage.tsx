import Link from 'next/link'
import Image from 'next/image'
import { BaseComponentsUI } from '@/types/ui'

type HWLinkTarget = '_self' | '_blank' | '_top'

interface HWImageUI extends BaseComponentsUI {
    src: string
    alt: string
    sizes?: string
    href?: string
    target?: HWLinkTarget
    containerStyles?: string
    imageStyles?: string
}

function ImageFill({ src, alt, sizes, imageStyles }: Pick<HWImageUI, 'src' | 'alt' | 'sizes' | 'imageStyles'>) {
    return (
        <Image
            src={src}
            alt={alt}
            fill
            sizes={sizes}
            className={imageStyles}
        />
    )
}

export default function HWImage({
    src,
    alt,
    sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
    href,
    target,
    containerStyles,
    imageStyles,
}: HWImageUI) {
    return (
        <div className={`relative ${containerStyles}`}>
            {href ? (
                <Link href={href} target={target} className="absolute inset-0">
                    <ImageFill src={src} alt={alt} sizes={sizes} imageStyles={imageStyles} />
                </Link>
            ) : (
                <ImageFill src={src} alt={alt} sizes={sizes} imageStyles={imageStyles} />
            )}
        </div>
    )
}