import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import {
  Phone,
  Mail,
  MapPin,
  Briefcase,
  Facebook,
  Twitter,
  Youtube,
  Instagram,
  Shield,
  FileText,
  ExternalLink,
  Building2,
  Globe,
  Heart,
  Loader2,
} from "lucide-react";
import { useGetCategories } from "@/hooks/useGetCategories";
import Ads from "../ads";
import { useGetWebsiteStats } from "@/hooks/useGetWebsiteStats";

// Custom TikTok Icon Component
export const TikTokIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M19.321 5.562a5.122 5.122 0 0 1-.443-.258 6.228 6.228 0 0 1-1.137-.966c-.849-.849-1.374-2.019-1.374-3.338h-3.021v13.513c0 .956-.388 1.823-.999 2.434a3.415 3.415 0 0 1-2.434 1.002c-1.891 0-3.423-1.532-3.423-3.423s1.532-3.423 3.423-3.423c.347 0 .68.052.999.149V7.788a6.817 6.817 0 0 0-.999-.075c-3.759 0-6.807 3.048-6.807 6.807s3.048 6.807 6.807 6.807 6.807-3.048 6.807-6.807V9.068c1.248.829 2.735 1.317 4.342 1.317V7.003c-.827 0-1.607-.194-2.294-.532a5.122 5.122 0 0 1-.948-.909z" />
  </svg>
);

export const socialLinks = [
  {
    href: "https://www.facebook.com/profile.php?id=61572641124016&mibextid=wwXIfr",
    icon: Facebook,
    label: "Facebook",
    color: "hover:text-blue-400",
  },
  {
    href: "https://x.com/journalpre51006?s=21",
    icon: Twitter,
    label: "Twitter",
    color: "hover:text-blue-300",
  },
  {
    href: "https://www.tiktok.com/@journalbyprestige?_t=ZS-8xROXq1VoA9&_r=1",
    icon: TikTokIcon,
    label: "Tiktok",
    color: "hover:text-red-400",
  },
  {
    href: "https://www.instagram.com/journalbyprestige?igsh=cHd3ZG81b3l5dTF2",
    icon: Instagram,
    label: "Instagram",
    color: "hover:text-pink-400",
  },
];

const Footer = () => {
  const [formattedDate, setFormattedDate] = useState<string | null>(null);
  const { categories, loading } = useGetCategories();

  useEffect(() => {
    setFormattedDate(new Date().toLocaleDateString("ne-NP"));
  }, []);

  const currentYear = new Date().getFullYear();

  // Get footer categories (limit to 6 for better layout)
  const footerCategories =
    categories
      ?.filter((category) => !category.disabled)
      ?.sort((a, b) => a.order - b.order)
      ?.slice(0, 6) || [];

  const contactInfo = [
    // { icon: Phone, label: "फोन", value: "+977-1-4444444" },
    { icon: Mail, label: "इमेल", value: "info@prestigejournalmedia.com" },
    { icon: MapPin, label: "ठेगाना", value: "भरतपुर - चितवन, नेपाल" },
    {
      icon: Briefcase,
      label: "व्यापारिक सम्पर्क",
      value: "ads@prestigejournalmedia.com",
    },
  ];

  const legalLinks = [
    { href: "#", label: "गोपनीयता नीति", icon: Shield },
    { href: "#", label: "सेवाका सर्तहरू", icon: FileText },
  ];

  const { websiteStats, loading: statsLoading } = useGetWebsiteStats();

  return (
    <>
      <footer className="bg-secondary border-t border-border mt-16">
        <div className="max-w-7xl mx-auto px-4 py-12">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {/* Brand Section */}
            <div className="lg:col-span-1 space-y-4">
              <img
                src="/prestige-logo.png"
                alt="Prestige Logo"
                className="w-[180px] h-[60px] object-contain hover:opacity-90 transition-opacity"
              />
              <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                नेपालको अग्रणी अनलाइन समाचार पोर्टल। सत्य, निष्पक्ष र भरपर्दो
                समाचारको लागि हामीसँग जोडिनुहोस्।
              </p>

              {/* Newsletter Signup */}
              {/* <div className="bg-muted/50 p-4 rounded-lg border">
              <h5 className="font-medium text-sm mb-2">
                दैनिक समाचार प्राप्त गर्नुहोस्
              </h5>
              <p className="text-xs text-muted-foreground mb-3">
                नयाँ समाचारको जानकारी सिधै इमेलमा पाउनुहोस्
              </p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="तपाईंको इमेल"
                  className="flex-1 px-3 py-2 text-xs border border-input rounded-md bg-background"
                />
                <button className="px-3 py-2 bg-primary text-primary-foreground text-xs rounded-md hover:bg-primary/90 transition-colors">
                  सदस्यता
                </button>
              </div>
            </div> */}
            </div>

            {/* Categories Section */}
            <div className="lg:col-span-1">
              <h4 className="font-semibold mb-6 text-foreground flex items-center gap-2">
                <Building2 className="h-4 w-4" />
                मुख्य श्रेणीहरू
              </h4>
              <nav className="space-y-3">
                {/* Loading State */}
                {loading && (
                  <>
                    {[...Array(6)].map((_, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <div className="h-4 bg-muted rounded w-16 animate-pulse"></div>
                        <div className="h-3 w-3 bg-muted rounded animate-pulse"></div>
                      </div>
                    ))}
                  </>
                )}

                {/* Dynamic Categories */}
                {!loading &&
                  footerCategories.map((category) => (
                    <Link
                      key={category.id}
                      to={`/categories/${category.slug}`}
                      className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors group"
                    >
                      <span>{category.name}</span>
                      <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  ))}

                {/* Empty State */}
                {!loading && footerCategories.length === 0 && (
                  <p className="text-sm text-muted-foreground">
                    श्रेणीहरू लोड भइरहेको छ...
                  </p>
                )}
              </nav>
            </div>

            {/* Contact Section */}
            <div className="lg:col-span-1">
              <h4 className="font-semibold mb-6 text-foreground flex items-center gap-2">
                <Phone className="h-4 w-4" />
                सम्पर्क विवरण
              </h4>
              <div className="space-y-4">
                {contactInfo.map((contact, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <contact.icon className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">
                        {contact.label}
                      </div>
                      <div className="text-sm text-foreground font-medium">
                        {contact.value}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Social Media Section */}
            <div className="lg:col-span-1">
              <h4 className="font-semibold mb-6 text-foreground flex items-center gap-2">
                <Globe className="h-4 w-4" />
                सामाजिक सञ्जाल
              </h4>
              <div className="grid grid-cols-2 gap-3">
                {socialLinks.map((social, idx) => (
                  <a
                    key={idx}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`
                    flex items-center gap-3 p-3 rounded-lg border border-border
                    bg-background hover:bg-muted transition-colors group
                    ${social.color}
                  `}
                  >
                    <social.icon className="h-4 w-4" />
                    <span className="text-sm font-medium">{social.label}</span>
                  </a>
                ))}
              </div>

              {/* Quick Stats */}
              {statsLoading ? (
                <div className="flex items-center justify-center h-24">
                  <Loader2 className="h-6 w-6 animate-spin" />
                </div>
              ) : (
                <div className="mt-6 p-4 bg-muted/30 rounded-lg border">
                  <h5 className="font-medium text-sm mb-3">आज सम्म</h5>
                  <div className="grid grid-cols-2 gap-3 text-center">
                    <div>
                      <div className="text-lg font-bold text-primary">
                        {websiteStats?.totalArticles}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        समाचार
                      </div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-primary">
                        {websiteStats?.totalViews}
                      </div>
                      <div className="text-xs text-muted-foreground">पाठक</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="border-t border-border mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              {/* Copyright */}
              <div className="text-center md:text-left">
                <p className="text-sm text-muted-foreground">
                  &copy; २०८१ प्रेस्टिज डट कम। सबै अधिकार सुरक्षित।
                </p>
              </div>

              {/* Legal Links */}
              <div className="flex items-center gap-1">
                {legalLinks.map((link, idx) => (
                  <React.Fragment key={idx}>
                    <Link
                      to={link.href}
                      className="flex items-center gap-1 px-3 py-1 text-xs text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-muted"
                    >
                      <link.icon className="h-3 w-3" />
                      {link.label}
                    </Link>
                    {idx < legalLinks.length - 1 && (
                      <span className="text-muted-foreground">|</span>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* Additional Footer Info */}
            <div className="mt-4 pt-4 border-t border-border/50">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-muted-foreground">
                <p>वेबसाइट डिजाइन र विकास: प्रेस्टिज टेक टिम</p>
                {formattedDate && <p>अन्तिम अपडेट: {formattedDate}</p>}
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
