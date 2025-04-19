"use client";

import { Button } from "@/components/ui/button";
import {
  SignInButton,
  SignOutButton,
  UserButton,
  useAuth,
} from "@clerk/nextjs";
import { Skull } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Menu } from "lucide-react"; // Hamburger Icon
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { DialogTitle } from "@radix-ui/react-dialog"; // DialogTitle for accessibility
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"; // For hiding the title visually

export function Navbar() {
  const { userId } = useAuth();
  const [open, setOpen] = useState(false);

  // Define the navigation links
  const links = [
    { href: "/ebook", label: "Your eBooks" },
    { href: "/about", label: "About Us" },
  ];

  return (
    <nav className="border-b bg-white shadow-md sticky top-0">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <a href="/" className="text-2xl font-bold text-black">
          LearnWithShawn
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          {links.map(({ href, label }) => (
            <Button key={href} variant="ghost" asChild>
              <Link href={href} className="text-lg hover:text-black">
                {label}
              </Link>
            </Button>
          ))}

          <Button variant="ghost" asChild>
            <Link href="/admin" className="text-lg">
              <Skull size={32} className="text-black" />{" "}
              {/* Larger Skull Icon */}
            </Link>
          </Button>

          {userId ? (
            <>
              <UserButton afterSignOutUrl="/" />
              <SignOutButton>
                <Button variant="outline" className="bg-teal-600 text-white">
                  Sign Out
                </Button>
              </SignOutButton>
            </>
          ) : (
            <SignInButton mode="modal">
              <Button variant="outline" className="bg-indigo-500 text-white">
                Sign In
              </Button>
            </SignInButton>
          )}
        </div>

        {/* Mobile Nav - Hamburger Menu */}
        <div className="md:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu size={24} className="text-black" /> {/* Hamburger Icon */}
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-64 bg-gray-100">
              {/* Adding DialogTitle for accessibility */}
              <DialogTitle>
                <VisuallyHidden>Navigation Menu</VisuallyHidden>
              </DialogTitle>

              <div className="flex flex-col gap-6 mt-8 p-4">
                {links.map(({ href, label }) => (
                  <Button
                    key={href}
                    variant="ghost"
                    asChild
                    onClick={() => setOpen(false)}
                    className="text-lg hover:text-black"
                  >
                    <Link href={href}>{label}</Link>
                  </Button>
                ))}

                <Button variant="ghost" asChild onClick={() => setOpen(false)}>
                  <Link href="/admin">
                    <Skull size={32} className="text-black" />{" "}
                    {/* Larger Skull Icon */}
                  </Link>
                </Button>

                {userId ? (
                  <>
                    <Button className="flex items-center justify-center bg-white text-gray-700">
                      <UserButton afterSignOutUrl="/" />
                    </Button>
                    <SignOutButton>
                      <Button
                        variant="outline"
                        className="bg-teal-600 text-white font-bold"
                      >
                        Sign Out
                      </Button>
                    </SignOutButton>
                  </>
                ) : (
                  <SignInButton mode="modal">
                    <Button
                      variant="outline"
                      className="w-full bg-black text-white"
                    >
                      Sign In
                    </Button>
                  </SignInButton>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
