"use client";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
}

const InstallPopup: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [showPopup, setShowPopup] = useState<boolean>(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      const event = e as BeforeInstallPromptEvent;
      event.preventDefault();
      setDeferredPrompt(event);

      setTimeout(() => {
        setShowPopup(true);
      }, 3000); // Show popup after 3 seconds
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      console.log("User response to install prompt:", outcome);
      setDeferredPrompt(null);
      setShowPopup(false);
    }
  };

  if (!showPopup) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/60 p-4">
      <div className="bg-gray-900 text-white p-8 rounded-2xl shadow-xl max-w-sm w-full text-center border border-gray-700">
        <h2 className="text-3xl font-bold mb-4">
          Install <span className="text-blue-400">LearnWithShawn</span>
        </h2>
        <p className="text-gray-300 mb-6 text-sm">
          Get the best experience by installing our app on your device.
        </p>
        <div className="flex justify-center gap-4">
          <Button
            onClick={handleInstallClick}
            className="bg-blue-600 hover:bg-blue-700 transition px-6 py-2 rounded-lg font-semibold"
          >
            Install
          </Button>
          <Button
            onClick={() => setShowPopup(false)}
            className="bg-gray-700 hover:bg-gray-600 transition px-6 py-2 rounded-lg font-semibold"
          >
            Later
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InstallPopup;
