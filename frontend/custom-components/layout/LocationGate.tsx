"use client";

import { useCallback, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { MapPin, ShieldAlert, RotateCcw } from "lucide-react";
import { useReportLocationMutation } from "@/services/locationsService";
import { Button } from "@/custom-components/ui/Button";

const GUEST_ID_KEY = "shophub-guest-id";

function getGuestId(): string {
  let id = localStorage.getItem(GUEST_ID_KEY);
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(GUEST_ID_KEY, id);
  }
  return id;
}

type Status = "checking" | "granted" | "denied" | "error";

/**
 * Blocks the entire site — storefront, auth, and admin — behind a full-screen
 * gate until the visitor allows browser location access. Denying keeps
 * re-showing this screen with a retry button instead of letting them through.
 */
export function LocationGate({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [reportLocation] = useReportLocationMutation();
  // can't gate on a feature the browser doesn't support at all
  const [status, setStatus] = useState<Status>(() =>
    typeof window !== "undefined" && !navigator.geolocation ? "granted" : "checking",
  );
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const requestLocation = useCallback(() => {
    if (typeof window === "undefined" || !navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setStatus("granted");
        reportLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
          guestId: getGuestId(),
          path: pathname,
        });
      },
      (err) => {
        if (err.code === err.PERMISSION_DENIED) {
          setStatus("denied");
        } else {
          setStatus("error");
          setErrorMessage(err.message || "Could not get your location.");
        }
      },
      { enableHighAccuracy: false, timeout: 10000, maximumAge: 5 * 60 * 1000 },
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    requestLocation();
  }, [requestLocation]);

  const handleRetry = () => {
    setStatus("checking");
    setErrorMessage(null);
    requestLocation();
  };

  if (status === "granted") return <>{children}</>;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white dark:bg-zinc-950 px-4">
      <div className="max-w-sm w-full text-center space-y-4">
        <div className="mx-auto h-14 w-14 rounded-2xl bg-violet-100 dark:bg-violet-950 flex items-center justify-center">
          {status === "checking" ? (
            <MapPin className="h-6 w-6 text-violet-600 dark:text-violet-400 animate-pulse" />
          ) : (
            <ShieldAlert className="h-6 w-6 text-amber-500" />
          )}
        </div>

        {status === "checking" && (
          <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-50">
            Requesting location access…
          </h2>
        )}

        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          {status === "checking" &&
            "Allow location access in the browser prompt to continue to ShopHub."}
          {status === "denied" &&
            "You blocked location access for this site. Click the icon next to the address bar, allow Location, then try again."}
          {status === "error" && (errorMessage ?? "We couldn't get your location. Please try again.")}
        </p>

        {status !== "checking" && (
          <Button variant="primary" onClick={handleRetry} leftIcon={<RotateCcw className="h-4 w-4" />}>
            Allow location access
          </Button>
        )}
      </div>
    </div>
  );
}
