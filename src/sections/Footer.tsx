interface FooterLink {
  name: string;
  href: string;
  badge?: string;
}

interface FooterLinks {
  [key: string]: FooterLink[];
}

const footerLinks: FooterLinks = {
  Product: [
    { name: 'Intake', href: '#intake' },
    { name: 'Plan', href: '#plan' },
    { name: 'Build', href: '#build' },
    { name: 'Diffs', href: '#diffs' },
    { name: 'Monitor', href: '#monitor' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'Security', href: '#security' },
  ],
  Features: [
    { name: 'Asks', href: '#asks' },
    { name: 'Agents', href: '#agents' },
    { name: 'Customer Requests', href: '#customer-requests' },
    { name: 'Insights', href: '#insights' },
    { name: 'Mobile', href: '#mobile' },
    { name: 'Integrations', href: '#integrations' },
    { name: 'Changelog', href: '#changelog' },
  ],
  Company: [
    { name: 'About', href: '#about' },
    { name: 'Customers', href: '#customers' },
    { name: 'Careers', href: '#careers' },
    { name: 'Blog', href: '#blog' },
    { name: 'Method', href: '#method' },
    { name: 'Quality', href: '#quality' },
    { name: 'Brand', href: '#brand' },
  ],
  Resources: [
    { name: 'Switch', href: '#switch' },
    { name: 'Download', href: '#download' },
    { name: 'Documentation', href: '#docs', badge: 'Docs' },
    { name: 'Developers', href: '#developers' },
    { name: 'Status', href: '#status' },
    { name: 'Enterprise', href: '#enterprise' },
    { name: 'Startups', href: '#startups' },
  ],
  Connect: [
    { name: 'Contact us', href: '#contact' },
    { name: 'Community', href: '#community' },
    { name: 'X (Twitter)', href: '#twitter' },
    { name: 'GitHub', href: '#github' },
    { name: 'YouTube', href: '#youtube' },
  ],
};

export default function Footer() {
  return (
    <footer className="py-16 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <div className="mb-12">
          <a href="/" className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-4 h-4 text-black" fill="currentColor">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>
            <span className="text-white font-semibold text-lg">Linear</span>
          </a>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-12">
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-white font-medium mb-4">{category}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-white/50 hover:text-white text-sm transition-colors inline-flex items-center gap-2"
                    >
                      {link.name}
                      {link.badge && (
                        <span className="px-1.5 py-0.5 bg-white/10 rounded text-xs text-white/60">
                          {link.badge}
                        </span>
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/5 gap-4">
          <div className="flex items-center gap-2 text-white/40 text-sm">
            <div className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse" />
            <span>Degraded performance</span>
          </div>
          <div className="flex items-center gap-6 text-white/40 text-sm">
            <a href="#privacy" className="hover:text-white transition-colors">Privacy</a>
            <a href="#terms" className="hover:text-white transition-colors">Terms</a>
            <a href="#dpa" className="hover:text-white transition-colors">DPA</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
