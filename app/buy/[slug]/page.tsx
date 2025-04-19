"use client";

import Image from "next/image";
import { useRouter, useParams } from "next/navigation";
import { books } from "@/lib/bookData";
import { Button } from "@/components/ui/button";
import { SignInButton, useUser } from "@clerk/nextjs";

export default function BuyPage() {
  const { isSignedIn } = useUser();
  const router = useRouter();
  const params = useParams();

  const slug = params.slug as string; // Ensure it's a string
  const book = books.find((b) => b.slug === slug);

  if (!book) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Book Not Found</h1>
        <Button onClick={() => router.push("/")}>Go Home</Button>
      </div>
    );
  }

  if (!isSignedIn) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Please Sign In</h1>
        <p className="mb-6">You need to be logged in to purchase this eBook.</p>
        <SignInButton mode="modal">
          <Button>Sign In</Button>
        </SignInButton>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Purchase eBook</h1>
      <p className="mb-6">
        To purchase <strong>{book.title}</strong> for {book.price}, please scan
        the eSewa QR code below and complete the payment.
      </p>
      <Image
        src="/esewa-qr.jpg"
        alt="eSewa QR Code for Payment"
        width={200}
        height={200}
        className="mx-auto mb-6"
      />
      <p className="mb-6">
        After payment, email your transaction ID with your ShawnLearn account
        email to{" "}
        <a
          href="mailto:shudarsanpoudel25@gmail.com"
          className="text-blue-600 underline"
        >
          shudarsanpoudel25@gmail.com
        </a>{" "}
        for verification. Access will be granted within 2 hours.
      </p>
      <Button asChild>
        <a href={`/ebook/${slug}`}>Check eBook Access</a>
      </Button>
    </div>
  );
}
