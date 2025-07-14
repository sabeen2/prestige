import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronRight, Clock, MapPin, Cloud } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useWeatherLocation } from "@/hooks/useWeatherLocation";
import { useGetCategories } from "@/hooks/useGetCategories";
import useNepaliDate from "@/hooks/useNepaliDate";

export default function Navbar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const pathname = location.pathname;
  const { weather, weatherLoading, getWeatherDescriptionNepali } =
    useWeatherLocation();
  const { nepaliDate, loading: dateLoading } = useNepaliDate();

  const { categories, loading, error } = useGetCategories();

  // Sort categories by order and filter out disabled ones
  const sortedCategories =
    categories
      ?.filter((category) => !category.disabled)
      ?.sort((a, b) => a.order - b.order) || [];

  const navCategories = sortedCategories;

  // Helper function to check if category is active
  const isActiveCategory = (slug: string) => {
    return pathname === `/categories/${slug}`;
  };

  return (
    <>
      {/* Top Header Bar - Mobile Responsive */}
      <header className="bg-background border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 md:py-4">
          {/* Mobile Layout */}
          <div className="md:hidden">
            <div className="flex items-center justify-between mb-3">
              {/* Menu Button */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSidebarOpen(true)}
                className="hover:bg-muted transition-colors"
                aria-label="मेनु खोल्नुहोस्"
              >
                <Menu className="h-5 w-5" />
              </Button>

              {/* Weather Info - Compact */}
              <div className="text-xs text-muted-foreground text-right">
                <div className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  <span>{weather?.name || "काठमाडौं"}</span>
                  <Cloud className="h-3 w-3 ml-1" />
                  <span>
                    {weatherLoading
                      ? "..."
                      : weather?.main?.temp
                      ? `${Math.round(weather.main.temp)}°C`
                      : "२१°C"}
                  </span>
                </div>
              </div>
            </div>

            {/* Logo - Centered */}
            <div className="flex justify-center">
              <Link to="/" className="block">
                <img
                  src="/prestige-logo.png"
                  alt="Prestige Logo"
                  className="w-[140px] h-[46px] object-contain hover:opacity-90 transition-opacity"
                />
              </Link>
            </div>

            {/* Date - Centered */}
            <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground mt-2">
              <Clock className="h-3 w-3" />
              <span>{dateLoading ? "मिति लोड गर्दै..." : nepaliDate}</span>
            </div>
          </div>

          {/* Desktop Layout */}
          <div className="hidden md:flex items-center justify-between">
            {/* Left Section - Menu and Date */}
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSidebarOpen(true)}
                className="hover:bg-muted transition-colors"
                aria-label="मेनु खोल्नुहोस्"
              >
                <Menu className="h-5 w-5" />
              </Button>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>{dateLoading ? "मिति लोड गर्दै..." : nepaliDate}</span>
              </div>
            </div>

            {/* Center Logo */}
            <div className="flex-1 flex justify-center">
              <Link to="/" className="block">
                <img
                  src="/prestige-logo.png"
                  alt="Prestige Logo"
                  className="w-[180px] h-[60px] object-contain hover:opacity-90 transition-opacity"
                />
              </Link>
            </div>

            {/* Right Section - Weather Info */}
            <div className="text-sm text-muted-foreground text-right">
              <div className="flex items-center gap-2 justify-end mb-1">
                <MapPin className="h-4 w-4" />
                <span className="font-medium">
                  {weather?.name || "काठमाडौं"}
                </span>
              </div>
              <div className="flex items-center gap-2 justify-end">
                <Cloud className="h-4 w-4" />
                <span>
                  {weatherLoading
                    ? "मौसम लोड गर्दै..."
                    : weather?.weather?.[0]?.main && weather?.main?.temp
                    ? `${getWeatherDescriptionNepali(
                        weather.weather[0].main,
                        weather.weather[0].description
                      )}, ${Math.round(weather.main.temp)}°C`
                    : "मध्यम वर्षा, २१°C"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Menu - Improved design */}
      <nav className="bg-primary/95 backdrop-blur-sm border-b border-border sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-center">
            <div className="flex items-center overflow-x-auto scrollbar-hide">
              {/* Home link */}
              <Link
                to="/"
                className={`
                  flex items-center gap-2 py-3 px-4 whitespace-nowrap text-sm font-medium
                  transition-all duration-200 border-b-2 border-transparent
                  ${
                    pathname === "/"
                      ? "text-primary-foreground bg-primary-foreground/10 border-primary-foreground"
                      : "text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/5 hover:border-primary-foreground/50"
                  }
                `}
              >
                <span>मुख्य</span>
              </Link>

              {/* Dynamic categories */}
              {!loading &&
                navCategories.map((category) => {
                  return (
                    <Link
                      key={category.id}
                      to={`/categories/${category.slug}`}
                      className={`
                  flex items-center gap-2 py-3 px-4 whitespace-nowrap text-sm font-medium
                  transition-all duration-200 border-b-2 border-transparent
                  ${
                    isActiveCategory(category.slug)
                      ? "text-primary-foreground bg-primary-foreground/10 border-primary-foreground"
                      : "text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/5 hover:border-primary-foreground/50"
                  }
                `}
                    >
                      <span>{category.name}</span>
                    </Link>
                  );
                })}

              {/* Contact Us link - with spacing */}
              {!loading && (
                <div className="ml-6 pl-4 border-l  text-primary border-primary-foreground/30">
                  <Link
                    to="/contact-us"
                    className={`
                      flex items-center gap-2 py-3 px-4 whitespace-nowrap text-sm font-medium
                      transition-all duration-200 border-b-2 border-transparent
                      ${
                        pathname === "/contact-us"
                          ? "text-primary bg-white  h-6 rounded border-primary-foreground"
                          : "text-primary/80 bg-white h-6 rounded hover:border-primary-foreground/50"
                      }
                    `}
                  >
                    <span>सम्पर्क</span>
                  </Link>
                </div>
              )}

              {/* Loading skeleton for navigation */}
              {loading &&
                [...Array(6)].map((_, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 py-3 px-4 whitespace-nowrap"
                  >
                    <div className="h-4 bg-primary-foreground/20 rounded w-16 animate-pulse"></div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 transition-opacity"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Improved Sidebar */}
      <aside
        className={`
          fixed left-0 top-0 h-full w-80 bg-background border-r border-border shadow-xl
          transform transition-transform duration-300 ease-in-out z-50
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Sidebar Header */}
        <div className="p-4 border-b border-border bg-muted/50">
          <div className="flex items-center justify-between">
            <Link to="/" onClick={() => setSidebarOpen(false)}>
              <img
                src="/prestige-logo.png"
                alt="Prestige Logo"
                className="w-[120px] h-[40px] object-contain hover:opacity-90 transition-opacity"
              />
            </Link>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(false)}
              className="hover:bg-muted transition-colors"
              aria-label="मेनु बन्द गर्नुहोस्"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Sidebar Content */}
        <div className="p-4 h-full overflow-y-auto">
          <h3 className="font-semibold mb-4 text-foreground flex items-center gap-2">
            <Menu className="h-4 w-4" />
            श्रेणीहरू
          </h3>

          {/* Loading State */}
          {loading && (
            <div className="space-y-1">
              {[...Array(5)].map((_, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 p-3 rounded-lg animate-pulse"
                >
                  <div className="flex-1 min-w-0">
                    <div className="h-4 bg-muted rounded w-24 mb-1"></div>
                    <div className="h-3 bg-muted rounded w-32"></div>
                  </div>
                  <div className="h-4 w-4 bg-muted rounded"></div>
                </div>
              ))}
            </div>
          )}

          {/* Error State */}
          {error && !loading && (
            <div className="text-center py-4 text-destructive">
              <p className="text-sm">श्रेणीहरू लोड गर्न सकिएन</p>
            </div>
          )}

          {/* Categories Navigation */}
          {!loading && !error && (
            <nav className="space-y-1">
              {/* Home link in sidebar */}
              <Link
                to="/"
                onClick={() => setSidebarOpen(false)}
                className={`
                  flex items-center gap-3 p-3 rounded-lg text-foreground
                  hover:bg-muted transition-colors group
                  border border-transparent hover:border-border
                  ${pathname === "/" ? "bg-muted border-border" : ""}
                `}
              >
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm">मुख्य पृष्ठ</div>
                  <div className="text-xs text-muted-foreground truncate">
                    सबै समाचार
                  </div>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
              </Link>

              {/* Dynamic categories */}
              {sortedCategories.map((category) => (
                <Link
                  key={category.id}
                  to={`/categories/${category.slug}`}
                  onClick={() => setSidebarOpen(false)}
                  className={`
                    flex items-center gap-3 p-3 rounded-lg text-foreground
                    hover:bg-muted transition-colors group
                    border border-transparent hover:border-border
                    ${
                      isActiveCategory(category.slug)
                        ? "bg-muted border-border"
                        : ""
                    }
                  `}
                >
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm">{category.name}</div>
                    {category.description && (
                      <div className="text-xs text-muted-foreground truncate">
                        {category.description}
                      </div>
                    )}
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                </Link>
              ))}

              {/* Contact Us link in sidebar - with spacing */}
              <div className="mt-6 pt-4 border-t border-border">
                <Link
                  to="/contact-us"
                  onClick={() => setSidebarOpen(false)}
                  className={`
                    flex items-center gap-3 p-3 rounded-lg text-foreground
                    hover:bg-muted transition-colors group
                    border border-transparent hover:border-border
                    ${
                      pathname === "/contact-us" ? "bg-muted border-border" : ""
                    }
                  `}
                >
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm">सम्पर्क गर्नुहोस्</div>
                    <div className="text-xs text-muted-foreground truncate">
                      हामीसँग सम्पर्क गर्नुहोस्
                    </div>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                </Link>
              </div>
            </nav>
          )}

          {/* Empty State (optional, since we always have home link) */}
          {!loading && !error && sortedCategories.length === 0 && (
            <div className="text-center py-4 text-muted-foreground">
              <p className="text-sm">थप श्रेणीहरू चाँडै आउँदैछन्</p>
            </div>
          )}

          {/* Footer section in sidebar */}
          <div className="mt-8 pt-4 border-t border-border">
            <div className="text-center text-xs text-muted-foreground">
              © प्रेस्टिज अनलाइन
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
