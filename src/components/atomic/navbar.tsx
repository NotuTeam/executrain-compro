/** @format */
"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown, Menu, X } from "lucide-react";

import Promo from "../promo";
import Button from "./button";

import { usePromo } from "@/services/promo/hook";
import { usePages } from "@/services/pages/hook";
import { useServices } from "@/services/service/hook";
import { servicesToNavFormat } from "@/lib/utils";

export default function Navbar() {
  const path = usePathname();
  const { data: promo, isLoading: promoLoading } = usePromo();
  const { data: pages = [], isLoading: pagesLoading } = usePages();
  const { data: services = [], isLoading: servicesLoading } = useServices();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isServiceOpen, setIsServiceOpen] = useState(false);
  const [isExploreOpen, setIsExploreOpen] = useState(false);
  const [isFreeTrialOpen, setIsFreeTrialOpen] = useState(false);
  const [isProductOpen, setIsProductOpen] = useState(false);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Transform services to nav format
  const servicesList = servicesToNavFormat(services);

  const otherPages = pages.filter((page: any) => page.type === "Other");

  // Check if current page is a service page
  const isServicePage = path?.startsWith("/service");

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Lock body scroll when sidebar is open
  useEffect(() => {
    if (isSidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isSidebarOpen]);

  const closeSidebar = () => {
    setIsSidebarOpen(false);
    setIsServiceOpen(false);
  };

  return (
    <>
      <nav className="sticky top-0 left-0 right-0 z-50">
        {/* Promo - Always on top, outside sidebar */}
        {promo && (
          <div className="bg-red-500">
            <Promo data={promo} />
          </div>
        )}

        {/* Navbar */}
        <div
          className={`flex justify-between text-white items-center px-[5%] md:px-[7%] lg:px-[10%] transition-all duration-300 ${
            isScrolled
              ? "bg-primary-500 shadow-lg backdrop-blur-md"
              : "bg-primary-500 md:bg-transparent"
          }`}
        >
          <Link href="/" onClick={closeSidebar}>
            <Image
              src="/logo.png"
              alt="logo"
              width={100}
              height={33}
              className="md:w-[120px] lg:w-[150px] h-auto"
            />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-3 md:space-x-6 lg:space-x-10 py-3 md:py-4 lg:py-5 items-center text-xs md:text-sm lg:text-base">
            {/* Free Trial Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setIsFreeTrialOpen(true)}
              onMouseLeave={() => setIsFreeTrialOpen(false)}
            >
              <button
                className={`flex items-center gap-1 hover:text-gray-200 transition-colors relative pb-1 ${
                  isFreeTrialOpen
                    ? "after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-white after:rounded-full"
                    : ""
                }`}
              >
                Free Trial
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-300 ${
                    isFreeTrialOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              <div
                className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-white rounded-lg shadow-xl overflow-hidden transition-all duration-300 min-w-[200px] ${
                  isFreeTrialOpen
                    ? "opacity-100 visible translate-y-0"
                    : "opacity-0 invisible -translate-y-2"
                }`}
              >
                {[
                  "Data Analytics",
                  "Automation",
                  "Cybersecurity",
                  "Project Management",
                  "Emotional Intelligence",
                ].map((each: string) => (
                  <Link
                    key={each}
                    href={`/free-trial?category=${encodeURIComponent(each.toUpperCase().replaceAll(" ", "_"))}`}
                    className="block px-6 py-3 text-gray-800 hover:bg-primary-500 hover:text-white transition-colors border-b border-gray-100 last:border-b-0"
                  >
                    {each}
                  </Link>
                ))}
              </div>
            </div>

            {/* Services Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setIsServiceOpen(true)}
              onMouseLeave={() => setIsServiceOpen(false)}
            >
              <button
                className={`flex items-center gap-1 hover:text-gray-200 transition-colors relative pb-1 ${
                  isServicePage
                    ? "after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-white after:rounded-full"
                    : ""
                }`}
              >
                Services
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-300 ${
                    isServiceOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Dropdown Menu */}
              <div
                className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-white rounded-lg shadow-xl overflow-hidden transition-all duration-300 min-w-[200px] ${
                  isServiceOpen
                    ? "opacity-100 visible translate-y-0"
                    : "opacity-0 invisible -translate-y-2"
                }`}
              >
                {servicesList.map((service, index) => (
                  <Link
                    key={index}
                    href={`/service?type=${service.slug}`}
                    className="block px-6 py-3 text-gray-800 hover:bg-primary-500 hover:text-white transition-colors border-b border-gray-100 last:border-b-0"
                    onClick={() => setIsServiceOpen(false)}
                  >
                    {service.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Product Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setIsProductOpen(true)}
              onMouseLeave={() => setIsProductOpen(false)}
            >
              <button
                className={`flex items-center gap-1 hover:text-gray-200 transition-colors relative pb-1 ${
                  path === "/product"
                    ? "after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-white after:rounded-full"
                    : ""
                }`}
              >
                Product
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-300 ${
                    isProductOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              <div
                className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-white rounded-lg shadow-xl overflow-hidden transition-all duration-300 min-w-[200px] ${
                  isProductOpen
                    ? "opacity-100 visible translate-y-0"
                    : "opacity-0 invisible -translate-y-2"
                }`}
              >
                <Link
                  href="/product"
                  className="block px-6 py-3 text-gray-800 hover:bg-primary-500 hover:text-white transition-colors border-b border-gray-100 last:border-b-0"
                >
                  Product
                </Link>
                <Link
                  href="/learning-path"
                  className="block px-6 py-3 text-gray-800 hover:bg-primary-500 hover:text-white transition-colors border-b border-gray-100 last:border-b-0"
                >
                  Learning Path
                </Link>
              </div>
            </div>

            <Link
              href="/schedule"
              className={`hover:text-gray-200 transition-colors relative pb-1 ${
                path === "/schedule"
                  ? "after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-white after:rounded-full"
                  : ""
              }`}
            >
              Schedule
            </Link>

            {/* Explore Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setIsExploreOpen(true)}
              onMouseLeave={() => setIsExploreOpen(false)}
            >
              <button
                className={`flex items-center gap-1 hover:text-gray-200 transition-colors relative pb-1 ${
                  isExploreOpen
                    ? "after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-white after:rounded-full"
                    : ""
                }`}
              >
                Explore
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-300 ${
                    isExploreOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Dropdown Menu */}
              <div
                className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-white rounded-lg shadow-xl overflow-hidden transition-all duration-300 min-w-[200px] ${
                  isExploreOpen
                    ? "opacity-100 visible translate-y-0"
                    : "opacity-0 invisible -translate-y-2"
                }`}
              >
                {/* Article */}
                <Link
                  href="/blog"
                  className="block px-6 py-3 text-gray-800 hover:bg-primary-500 hover:text-white transition-colors border-b border-gray-100 last:border-b-0"
                >
                  Blog
                </Link>

                {/* Career */}
                <Link
                  href="/career"
                  className="block px-6 py-3 text-gray-800 hover:bg-primary-500 hover:text-white transition-colors border-b border-gray-100 last:border-b-0"
                >
                  Career
                </Link>
                {otherPages.map((page: any) => (
                  <Link
                    key={page._id}
                    href={`/${page.path}`}
                    className="block px-6 py-3 text-gray-800 hover:bg-primary-500 hover:text-white transition-colors border-b border-gray-100 last:border-b-0"
                  >
                    {page.name}
                  </Link>
                ))}
              </div>
            </div>

            <Link href="/contact">
              <Button label="Contact Us" />
            </Link>
          </div>

          <button
            className="md:hidden px-2 py-5 hover:bg-white/10 rounded-lg transition-colors"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            aria-label="Toggle menu"
          >
            {isSidebarOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </nav>

      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 md:hidden transition-opacity duration-300 ${
          isSidebarOpen
            ? "opacity-100 visible"
            : "opacity-0 invisible pointer-events-none"
        }`}
        onClick={closeSidebar}
      />

      {/* Sidebar */}
      <aside
        className={` bg-white/80 backdrop-blur-md fixed top-0 left-0 h-full w-[280px] shadow-2xl z-50 md:hidden transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-5 border-b border-gray-200">
            <Link href="/" onClick={closeSidebar}>
              <Image src="/logo.png" alt="logo" width={120} height={40} />
            </Link>
            <button
              onClick={closeSidebar}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Close menu"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Sidebar Menu */}
          <nav className="flex-1 overflow-y-auto py-5">
            {/* Free Trial Accordion */}
            <div>
              <button
                className={`w-full flex items-center justify-between px-6 py-3 transition-colors ${
                  isServicePage
                    ? "text-primary-500 bg-blue-50 border-l-4 border-primary-500 font-semibold"
                    : "text-gray-800 hover:bg-gray-100"
                }`}
                onClick={() => setIsFreeTrialOpen(!isFreeTrialOpen)}
              >
                <span>Free Trial</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-300 ${
                    isFreeTrialOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  isFreeTrialOpen ? "max-h-[500px]" : "max-h-0"
                }`}
              >
                {[
                  "Data Analytics",
                  "Automation",
                  "Cybersecurity",
                  "Project Management",
                  "Emotional Intelligence",
                ].map((each: string) => (
                  <Link
                    key={each}
                    href={`/free-trial?category=${encodeURIComponent(each.toUpperCase().replaceAll(" ", "_"))}`}
                    className="block pl-12 pr-6 py-3 text-gray-600 hover:bg-gray-100 hover:text-primary-500 transition-colors"
                    onClick={closeSidebar}
                  >
                    {each}
                  </Link>
                ))}
              </div>
            </div>

            {/* Services Accordion */}
            <div>
              <button
                className={`w-full flex items-center justify-between px-6 py-3 transition-colors ${
                  isServicePage
                    ? "text-primary-500 bg-blue-50 border-l-4 border-primary-500 font-semibold"
                    : "text-gray-800 hover:bg-gray-100"
                }`}
                onClick={() => setIsServiceOpen(!isServiceOpen)}
              >
                <span>Services</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-300 ${
                    isServiceOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Services Submenu */}
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  isServiceOpen ? "max-h-[500px]" : "max-h-0"
                }`}
              >
                {servicesList.map((service, index) => (
                  <Link
                    key={index}
                    href={`/service?type=${service.slug}`}
                    className="block pl-12 pr-6 py-3 text-gray-600 hover:bg-gray-100 hover:text-primary-500 transition-colors"
                    onClick={closeSidebar}
                  >
                    {service.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Product Accordion */}
            <div>
              <button
                className={`w-full flex items-center justify-between px-6 py-3 transition-colors ${
                  isServicePage
                    ? "text-primary-500 bg-blue-50 border-l-4 border-primary-500 font-semibold"
                    : "text-gray-800 hover:bg-gray-100"
                }`}
                onClick={() => setIsProductOpen(!isProductOpen)}
              >
                <span>Product</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-300 ${
                    isProductOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  isProductOpen ? "max-h-[500px]" : "max-h-0"
                }`}
              >
                <Link
                  href={`/product`}
                  className="block pl-12 pr-6 py-3 text-gray-600 hover:bg-gray-100 hover:text-primary-500 transition-colors"
                  onClick={closeSidebar}
                >
                  Product
                </Link>
                <Link
                  href="/learning-path"
                  className="block pl-12 pr-6 py-3 text-gray-600 hover:bg-gray-100 hover:text-primary-500 transition-colors"
                  onClick={closeSidebar}
                >
                  Learning Path
                </Link>
              </div>
            </div>
            <Link
              href="/schedule"
              className={`block px-6 py-3 transition-colors ${
                path === "/schedule"
                  ? "text-primary-500 bg-blue-50 border-l-4 border-primary-500 font-semibold"
                  : "text-gray-800 hover:bg-gray-100"
              }`}
              onClick={closeSidebar}
            >
              Schedule
            </Link>

            {/* Explore Accordion */}
            <div>
              <button
                className={`w-full flex items-center justify-between px-6 py-3 transition-colors ${
                  isServicePage
                    ? "text-primary-500 bg-blue-50 border-l-4 border-primary-500 font-semibold"
                    : "text-gray-800 hover:bg-gray-100"
                }`}
                onClick={() => setIsExploreOpen(!isExploreOpen)}
              >
                <span>Explore</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-300 ${
                    isExploreOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Explore Submenu */}
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  isExploreOpen ? "max-h-[500px]" : "max-h-0"
                }`}
              >
                <Link
                  href="/blog"
                  className="block pl-12 pr-6 py-3 text-gray-600 hover:bg-gray-100 hover:text-primary-500 transition-colors"
                  onClick={closeSidebar}
                >
                  Blog
                </Link>
                <Link
                  href="/career"
                  className="block pl-12 pr-6 py-3 text-gray-600 hover:bg-gray-100 hover:text-primary-500 transition-colors"
                  onClick={closeSidebar}
                >
                  Career
                </Link>
              </div>
            </div>
          </nav>

          {/* Sidebar Footer */}
          <div className="p-5 border-t border-gray-200">
            <Link href="/contact" onClick={closeSidebar}>
              <Button label="Contact Us" type="primary" />
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
}
