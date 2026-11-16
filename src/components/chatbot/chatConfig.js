import { siteConfig, whatsappHref } from '../../data/siteConfig'

/** Everything site-specific about the chat widget. The knowledge the AI answers from lives in api/_chatKnowledge.js. */
export const chatConfig = {
  siteKey: 'vks',
  apiPath: '/api/chat',
  name: 'VKS Assistant',
  subtitle: 'Online · Ask about our films & services',
  avatar: '/favicon.svg',
  greeting:
    "Hi, I'm the **VKS Film Production** assistant 🎬\n\nAsk me about our services, our creative process, or how to start a project with producer S. Vijay Krishnan.",
  teaser: 'Got a film idea? Ask me anything 🎬',
  placeholder: 'Ask about our films & services…',
  disclaimer: 'AI assistant · answers may be imperfect. For project details, please speak to the producer.',
  suggestions: [
    'What services do you offer?',
    'How do I start a project?',
    'Tell me about the producer',
    'What is your creative process?',
  ],
  actions: [
    { label: '💬 WhatsApp', href: whatsappHref() },
    { label: '📞 Call', href: siteConfig.contact.phoneHref },
    { label: '✉️ Contact form', href: '/contact' },
  ],
  theme: {
    '--cbx-accent': '#ff168f',
    '--cbx-accent-2': '#8b4dff',
    '--cbx-bg': '#121218',
    '--cbx-surface': '#1b1b25',
    '--cbx-text': '#f8f7fc',
    '--cbx-muted': '#a7a7b4',
    '--cbx-border': 'rgba(248, 247, 252, 0.13)',
    '--cbx-user-bg': 'linear-gradient(135deg, #ff168f, #8b4dff)',
    '--cbx-link': '#00d9ff',
    '--cbx-font': "'Manrope Variable', 'Manrope', ui-sans-serif, system-ui, sans-serif",
    '--cbx-right': '1.25rem',
    '--cbx-bottom': '1.25rem',
  },
}
