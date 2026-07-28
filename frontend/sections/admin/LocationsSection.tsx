"use client";

import { MapPin, User, Users, Navigation, Radar, ExternalLink, Clock } from "lucide-react";
import { useGetLocationsQuery, type VisitorLocation } from "@/services/locationsService";
import { AdminPageWrapper } from "@/custom-components/layout/PageWrapper";
import { Badge } from "@/custom-components/ui/Badge";
import { Button } from "@/custom-components/ui/Button";
import { EmptyState } from "@/custom-components/ui/EmptyState";

function timeAgo(iso: string): string {
  const seconds = Math.floor((Date.now() - new Date(iso).getTime()) / 1000);
  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

function mapsUrl(lat: number, lng: number): string {
  return `https://www.google.com/maps?q=${lat},${lng}`;
}

function LocationCard({ loc }: { loc: VisitorLocation }) {
  const isUser = Boolean(loc.userId);

  return (
    <div className="surface-glass border border-zinc-200 rounded-2xl p-5">
      <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
        <div className="min-w-0 flex items-center gap-2.5">
          <div className="h-9 w-9 rounded-xl bg-violet-100 dark:bg-violet-950 flex items-center justify-center shrink-0">
            {isUser ? (
              <User className="h-4 w-4 text-violet-600 dark:text-violet-400" />
            ) : (
              <Users className="h-4 w-4 text-zinc-500 dark:text-zinc-400" />
            )}
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <p className="text-sm font-bold text-zinc-900 dark:text-zinc-50">
                {isUser ? loc.userName ?? "Account" : "Guest visitor"}
              </p>
              <Badge variant={isUser ? "info" : "default"} size="sm">
                {isUser ? "Account" : "Guest"}
              </Badge>
            </div>
            {isUser ? (
              <p className="text-xs text-zinc-500 dark:text-zinc-400">{loc.userEmail}</p>
            ) : (
              <p className="text-xs text-zinc-400 dark:text-zinc-500 font-mono truncate max-w-55">
                {loc.guestId}
              </p>
            )}
          </div>
        </div>
        <span className="flex items-center gap-1 text-xs text-zinc-400 dark:text-zinc-500 shrink-0">
          <Clock className="h-3 w-3" /> {timeAgo(loc.updatedAt)}
        </span>
      </div>

      <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-600 dark:text-zinc-400 mb-4">
        <span className="flex items-center gap-1 font-mono">
          <MapPin className="h-3.5 w-3.5 text-zinc-400" />
          {loc.latitude.toFixed(5)}, {loc.longitude.toFixed(5)}
        </span>
        {loc.accuracy != null && (
          <span className="flex items-center gap-1">
            <Radar className="h-3.5 w-3.5 text-zinc-400" /> ±{Math.round(loc.accuracy)}m
          </span>
        )}
        {loc.path && (
          <span className="flex items-center gap-1 truncate max-w-50">
            <Navigation className="h-3.5 w-3.5 text-zinc-400" /> {loc.path}
          </span>
        )}
      </div>

      <Button
        variant="secondary"
        size="sm"
        leftIcon={<ExternalLink className="h-3.5 w-3.5" />}
        onClick={() => window.open(mapsUrl(loc.latitude, loc.longitude), "_blank", "noopener,noreferrer")}
      >
        Open in Maps
      </Button>
    </div>
  );
}

export default function LocationsSection() {
  const { data: locations = [], isLoading } = useGetLocationsQuery(undefined, {
    pollingInterval: 15000,
  });

  const accountCount = locations.filter((l) => l.userId).length;
  const guestCount = locations.length - accountCount;

  return (
    <AdminPageWrapper
      title="Locations"
      description="Live location of visitors who granted browser location access"
    >
      <div className="flex flex-wrap gap-3">
        <Badge variant="outline" size="md">Tracked: {locations.length}</Badge>
        <Badge variant="info" size="md">Accounts: {accountCount}</Badge>
        <Badge variant="default" size="md">Guests: {guestCount}</Badge>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="surface-glass border border-zinc-200 rounded-2xl p-5">
              <div className="h-4 w-40 rounded skeleton-shimmer mb-3" />
              <div className="h-3.5 w-2/3 rounded skeleton-shimmer mb-2" />
              <div className="h-3.5 w-1/3 rounded skeleton-shimmer" />
            </div>
          ))}
        </div>
      ) : locations.length === 0 ? (
        <EmptyState
          icon={<MapPin className="h-6 w-6" />}
          title="No locations yet"
          description="Locations appear here once a visitor allows browser location access on the storefront."
        />
      ) : (
        <div className="space-y-4">
          {locations.map((loc) => (
            <LocationCard key={loc._id} loc={loc} />
          ))}
        </div>
      )}
    </AdminPageWrapper>
  );
}
