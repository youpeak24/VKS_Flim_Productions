import { motion } from 'motion/react'
import { InstagramIcon, YouTubeIcon, FacebookIcon } from '../common/SocialIcons'

const socialLinks = [
  {
    name: 'Instagram',
    handle: '@vksflimproductions',
    href: 'https://www.instagram.com/vksflimproductions/',
    ariaLabel: 'Follow VKS Film Production on Instagram',
    icon: InstagramIcon,
    hoverClass:
      'hover:bg-gradient-to-tr hover:from-[#f09433] hover:via-[#dc2743] hover:to-[#bc1888] hover:text-white hover:shadow-[0_0_24px_rgba(220,39,67,0.55)]',
    badgeClass: 'text-[#ff4585]',
  },
  {
    name: 'YouTube',
    handle: '@vksflims',
    href: 'https://www.youtube.com/@vksflims',
    ariaLabel: 'Subscribe to VKS Film Production on YouTube',
    icon: YouTubeIcon,
    hoverClass: 'hover:bg-[#ff0000] hover:text-white hover:shadow-[0_0_24px_rgba(255,0,0,0.6)]',
    badgeClass: 'text-[#ff3b3b]',
  },
  {
    name: 'Facebook',
    handle: 'VKS Film Production',
    href: 'https://www.facebook.com/profile.php?id=61595996317304',
    ariaLabel: 'Connect with VKS Film Production on Facebook',
    icon: FacebookIcon,
    hoverClass: 'hover:bg-[#1877f2] hover:text-white hover:shadow-[0_0_24px_rgba(24,119,242,0.6)]',
    badgeClass: 'text-[#2d88ff]',
  },
]

/**
 * Modern floating social action buttons docked at the bottom-right corner.
 * Provides accessible, high-performance, attractive glassmorphic buttons for Instagram, YouTube, and Facebook.
 */
export default function FloatingSocialButtons() {
  return (
    <motion.aside
      aria-label="Quick social links"
      initial={{ opacity: 0, y: 24, scale: 0.92 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="fixed z-40 select-none"
      style={{
        // sits above the AI chat button (3.75rem tall) that owns the bottom-right corner
        bottom: 'max(5.75rem, calc(env(safe-area-inset-bottom, 0px) + 5.75rem))',
        right: 'max(1.25rem, calc(env(safe-area-inset-right, 0px) + 1.25rem))',
      }}
    >
      <div className="flex flex-col items-center gap-2.5 rounded-full border border-soft/15 bg-obsidian/80 p-1.5 shadow-[0_12px_40px_rgba(0,0,0,0.7),0_0_1px_1px_rgba(255,255,255,0.08)] backdrop-blur-xl transition-all duration-300 hover:border-soft/30 hover:bg-obsidian/90">
        {socialLinks.map(({ name, handle, href, ariaLabel, icon: Icon, hoverClass, badgeClass }) => (
          <a
            key={name}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={ariaLabel}
            className={`group relative grid size-11 place-items-center rounded-full bg-soft/[0.04] text-soft/80 transition-all duration-300 ease-cinema hover:scale-110 active:scale-95 sm:size-12 ${hoverClass}`}
          >
            <Icon className="size-5 transition-transform duration-300 ease-cinema group-hover:scale-105 sm:size-5.5" />

            {/* Desktop tooltip flyout to the left */}
            <div
              role="tooltip"
              className="pointer-events-none absolute right-full mr-3.5 top-1/2 hidden -translate-y-1/2 items-center gap-2 whitespace-nowrap rounded-full border border-soft/15 bg-obsidian/95 px-3.5 py-1.5 text-xs font-semibold text-soft shadow-2xl opacity-0 -translate-x-2 transition-all duration-300 ease-cinema group-hover:opacity-100 group-hover:translate-x-0 group-focus-visible:opacity-100 group-focus-visible:translate-x-0 md:flex"
            >
              <span className={`size-1.5 rounded-full bg-current ${badgeClass}`} aria-hidden="true" />
              <span className="font-bold tracking-wide">{name}</span>
              <span className="text-[11px] font-normal text-muted">{handle}</span>
              <span
                className="absolute -right-1 top-1/2 size-2 -translate-y-1/2 rotate-45 border-r border-t border-soft/15 bg-obsidian/95"
                aria-hidden="true"
              />
            </div>

            <span className="sr-only">(opens in a new tab)</span>
          </a>
        ))}
      </div>
    </motion.aside>
  )
}
