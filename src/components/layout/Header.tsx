"use client";

import Link from "next/link";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { useState } from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import svgPaths from "@/lib/svgPaths";

function LineiconsGoogleMeet() {
  return (
    <div
      className="relative shrink-0 size-[24px]"
      data-name="lineicons:google-meet"
    >
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        height="24"
        preserveAspectRatio="none"
        viewBox="0 0 24 24"
        width="24"
      >
        <g id="lineicons:google-meet">
          <path
            clipRule="evenodd"
            d={svgPaths.p2a901680}
            fill="var(--fill-0, white)"
            fillRule="evenodd"
            id="Vector"
          />
        </g>
      </svg>
    </div>
  );
}

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <header className="z-50 w-full pt-3 px-4 md:px-8">
      <div className="max-w-[1380px] mx-auto">
        {/* Framed Outer Container matching template design structure */}
        <div className="relative bg-white border border-[rgba(174,174,174,0.3)] shadow-[0px_4px_20px_0px_rgba(0,0,0,0.03)] h-[76px] md:h-[83px] flex items-center justify-between px-4 md:px-6">
          {/* Architectural Corner Accents from Template */}
          <div className="absolute bg-[#292c2e] size-[6px] -top-[3px] -left-[3px]" />
          <div className="absolute bg-[#292c2e] size-[6px] -top-[3px] -right-[3px]" />
          <div className="absolute bg-[#292c2e] size-[6px] -bottom-[3px] -left-[3px]" />
          <div className="absolute bg-[#292c2e] size-[6px] -bottom-[3px] -right-[3px]" />

          {/* Logo Section */}
          <div className="flex items-center h-full pr-6 border-r border-[rgba(174,174,174,0.2)] relative">
            <Link
              href="/"
              className="flex items-center gap-3 font-space text-lg md:text-xl font-medium tracking-tight text-[#292c2e]"
            >
              <div className="w-8 h-8 bg-[#292c2e] rounded-[4px] flex items-center justify-center text-[#98ff03] font-bold text-base shadow-sm">
                M
              </div>
              <span className="font-space uppercase tracking-[0.1em] text-sm md:text-base font-semibold text-[#292c2e]">
                Motion
              </span>
            </Link>
            <div className="absolute bg-[#292c2e] size-[6px] -top-[3px] -right-[3px]" />
            <div className="absolute bg-[#292c2e] size-[6px] -bottom-[3px] -right-[3px]" />
          </div>

          {/* Desktop Navigation Section */}
          <div className="hidden lg:flex items-center justify-center flex-1 px-6">
            <NavigationMenu>
              <NavigationMenuList className="gap-2 lg:gap-6">
                <NavigationMenuItem>
                  <NavigationMenuLink
                    href="/services"
                    className="group/nmlink inline-flex h-9 w-max items-center justify-center rounded-none bg-transparent px-3 py-2 font-space text-[14px] font-light uppercase tracking-[0.1em] text-[#2a2a2b] transition-colors hover:text-black hover:font-normal focus:outline-none"
                  >
                    Services
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink
                    href="/about"
                    className="group/nmlink inline-flex h-9 w-max items-center justify-center rounded-none bg-transparent px-3 py-2 font-space text-[14px] font-light uppercase tracking-[0.1em] text-[#2a2a2b] transition-colors hover:text-black hover:font-normal focus:outline-none"
                  >
                    About Us
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger className="font-space text-[14px] font-light uppercase tracking-[0.1em] text-[#2a2a2b] hover:text-black bg-transparent hover:bg-transparent focus:bg-transparent data-[state=open]:bg-transparent">
                    Products
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[380px] gap-3 p-4 md:w-[460px] md:grid-cols-2 bg-white border border-[rgba(174,174,174,0.3)] shadow-lg rounded-[4px]">
                      <li>
                        <NavigationMenuLink
                          href="/products/pro"
                          className="block select-none space-y-1 rounded-[4px] p-3 leading-none no-underline outline-none transition-colors hover:bg-[#f3f4f6]"
                        >
                          <div className="font-inter text-sm font-medium leading-none text-[#292c2e]">
                            Pro
                          </div>
                          <p className="line-clamp-2 text-xs leading-snug text-zinc-500 mt-1">
                            Professional motion plan for creative teams
                          </p>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink
                          href="/products/enterprise"
                          className="block select-none space-y-1 rounded-[4px] p-3 leading-none no-underline outline-none transition-colors hover:bg-[#f3f4f6]"
                        >
                          <div className="font-inter text-sm font-medium leading-none text-[#292c2e]">
                            Enterprise
                          </div>
                          <p className="line-clamp-2 text-xs leading-snug text-zinc-500 mt-1">
                            Custom solutions for high-scale organizations
                          </p>
                        </NavigationMenuLink>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger className="font-space text-[14px] font-light uppercase tracking-[0.1em] text-[#2a2a2b] hover:text-black bg-transparent hover:bg-transparent focus:bg-transparent data-[state=open]:bg-transparent">
                    Case Studies
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[380px] gap-3 p-4 md:w-[460px] md:grid-cols-2 bg-white border border-[rgba(174,174,174,0.3)] shadow-lg rounded-[4px]">
                      <li>
                        <NavigationMenuLink
                          href="/case-studies/one"
                          className="block select-none space-y-1 rounded-[4px] p-3 leading-none no-underline outline-none transition-colors hover:bg-[#f3f4f6]"
                        >
                          <div className="font-inter text-sm font-medium leading-none text-[#292c2e]">
                            Study One
                          </div>
                          <p className="line-clamp-2 text-xs leading-snug text-zinc-500 mt-1">
                            Digital transformation showcase
                          </p>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink
                          href="/case-studies/two"
                          className="block select-none space-y-1 rounded-[4px] p-3 leading-none no-underline outline-none transition-colors hover:bg-[#f3f4f6]"
                        >
                          <div className="font-inter text-sm font-medium leading-none text-[#292c2e]">
                            Study Two
                          </div>
                          <p className="line-clamp-2 text-xs leading-snug text-zinc-500 mt-1">
                            Brand identity & product launch
                          </p>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink
                          href="/case-studies/two"
                          className="block select-none space-y-1 rounded-[4px] p-3 leading-none no-underline outline-none transition-colors hover:bg-[#f3f4f6]"
                        >
                          <div className="font-inter text-sm font-medium leading-none text-[#292c2e]">
                            Study Two
                          </div>
                          <p className="line-clamp-2 text-xs leading-snug text-zinc-500 mt-1">
                            Brand identity & product launch
                          </p>
                        </NavigationMenuLink>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink
                    href="/contact"
                    className="group/nmlink inline-flex h-9 w-max items-center justify-center rounded-none bg-transparent px-3 py-2 font-space text-[14px] font-light uppercase tracking-[0.1em] text-[#2a2a2b] transition-colors hover:text-black hover:font-normal focus:outline-none"
                  >
                    Contact
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Desktop Action Buttons matching Template */}
          <div className="hidden lg:flex items-center gap-3 pl-6 border-l border-[rgba(174,174,174,0.2)] h-full relative">
            <Link
              target="_blank"
              href="https://calendly.com/motiondigitals/30min"
              className="font-inter text-[14px] font-medium bg-[#292c2e] text-white hover:bg-[#1a1c1d] rounded-[4px] px-4 py-2 inline-flex items-center gap-2 shadow-sm transition-all border border-[#292c2e]"
            >
              <LineiconsGoogleMeet />
              <span>Book A Call</span>
            </Link>
            <div className="absolute bg-[#292c2e] size-[6px] -top-[3px] -left-[3px]" />
            <div className="absolute bg-[#292c2e] size-[6px] -bottom-[3px] -left-[3px]" />
          </div>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            className="lg:hidden inline-flex items-center justify-center rounded-[4px] p-2 text-[#292c2e] hover:bg-[#f3f4f6]"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation Drawer with Smooth Transition */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isOpen
              ? "max-h-[400px] opacity-100 mt-2 translate-y-0"
              : "max-h-0 opacity-0 mt-0 -translate-y-2 pointer-events-none"
          }`}
        >
          <div className="bg-white border border-[rgba(174,174,174,0.3)] p-4 shadow-lg rounded-[4px]">
            <nav className="flex flex-col gap-2 font-space uppercase text-[14px] tracking-[0.1em] text-[#2a2a2b]">
              <Link
                href="/services"
                className="px-3 py-2 rounded-[4px] hover:bg-[#f3f4f6] transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Services
              </Link>

              <Link
                href="/about"
                className="px-3 py-2 rounded-[4px] hover:bg-[#f3f4f6] transition-colors"
                onClick={() => setIsOpen(false)}
              >
                About Us
              </Link>

              <Link
                href="/products"
                className="px-3 py-2 rounded-[4px] hover:bg-[#f3f4f6] transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Products
              </Link>

              <Link
                href="/case-studies"
                className="px-3 py-2 rounded-[4px] hover:bg-[#f3f4f6] transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Case Studies
              </Link>

              <Link
                href="/contact"
                className="px-3 py-2 rounded-[4px] hover:bg-[#f3f4f6] transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Contact
              </Link>

              <div className="flex flex-col gap-2 pt-3 mt-2 border-t border-[rgba(174,174,174,0.2)] font-inter normal-case tracking-normal">
                <Link
                  target="_blank"
                  href="https://calendly.com/motiondigitals/30min"
                  className="font-inter text-[14px] font-medium bg-[#292c2e] text-white hover:bg-[#1a1c1d] rounded-[4px] px-4 py-2.5 flex items-center justify-center gap-2 shadow-sm"
                  onClick={() => setIsOpen(false)}
                >
                  <LineiconsGoogleMeet />
                  <span>Book A Call</span>
                </Link>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
