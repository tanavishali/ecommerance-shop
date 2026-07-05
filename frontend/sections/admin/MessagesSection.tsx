"use client";

import { useState } from "react";
import { Mail, MailOpen, CheckCircle2, Inbox, User, Clock } from "lucide-react";
import {
  useGetContactMessagesQuery,
  useUpdateContactStatusMutation,
  type ContactMessage,
  type ContactStatus,
} from "@/services/contactService";
import { AdminPageWrapper } from "@/custom-components/layout/PageWrapper";
import { Badge } from "@/custom-components/ui/Badge";
import { Button } from "@/custom-components/ui/Button";
import { EmptyState } from "@/custom-components/ui/EmptyState";

const STATUS_VARIANT: Record<ContactStatus, "warning" | "info" | "success"> = {
  new: "warning",
  read: "info",
  resolved: "success",
};

const FILTERS: Array<{ key: ContactStatus | "all"; label: string }> = [
  { key: "all", label: "All" },
  { key: "new", label: "New" },
  { key: "read", label: "Read" },
  { key: "resolved", label: "Resolved" },
];

function formatDate(iso: string): string {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit",
  }).format(new Date(iso));
}

function MessageCard({ msg }: { msg: ContactMessage }) {
  const [updateStatus, { isLoading }] = useUpdateContactStatusMutation();
  const set = (status: ContactStatus) => updateStatus({ id: msg._id, status });

  return (
    <div className="surface-glass border border-zinc-200 rounded-2xl p-5">
      <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <p className="text-sm font-bold text-zinc-900 dark:text-zinc-50">{msg.name}</p>
            <Badge variant={msg.userId ? "info" : "default"} size="sm">
              {msg.userId ? "Account" : "Guest"}
            </Badge>
          </div>
          <a href={`mailto:${msg.email}`} className="text-xs text-violet-600 dark:text-violet-400 hover:underline">
            {msg.email}
          </a>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <Badge variant={STATUS_VARIANT[msg.status]} dot>
            {msg.status.charAt(0).toUpperCase() + msg.status.slice(1)}
          </Badge>
          <span className="flex items-center gap-1 text-xs text-zinc-400 dark:text-zinc-500">
            <Clock className="h-3 w-3" /> {formatDate(msg.createdAt)}
          </span>
        </div>
      </div>

      <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-200 mb-1">{msg.subject}</p>
      <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed whitespace-pre-wrap">{msg.message}</p>

      <div className="flex items-center gap-2 mt-4">
        {msg.status !== "read" && (
          <Button variant="secondary" size="sm" loading={isLoading} onClick={() => set("read")} leftIcon={<MailOpen className="h-3.5 w-3.5" />}>
            Mark read
          </Button>
        )}
        {msg.status !== "resolved" && (
          <Button variant="primary" size="sm" loading={isLoading} onClick={() => set("resolved")} leftIcon={<CheckCircle2 className="h-3.5 w-3.5" />}>
            Resolve
          </Button>
        )}
        {msg.status !== "new" && (
          <Button variant="ghost" size="sm" loading={isLoading} onClick={() => set("new")} leftIcon={<Mail className="h-3.5 w-3.5" />}>
            Mark new
          </Button>
        )}
      </div>
    </div>
  );
}

export default function MessagesSection() {
  const { data: messages = [], isLoading } = useGetContactMessagesQuery();
  const [filter, setFilter] = useState<ContactStatus | "all">("all");

  const counts = messages.reduce<Record<string, number>>((acc, m) => {
    acc[m.status] = (acc[m.status] ?? 0) + 1;
    return acc;
  }, {});

  const filtered = filter === "all" ? messages : messages.filter((m) => m.status === filter);

  return (
    <AdminPageWrapper title="Messages" description="Contact enquiries from customers and guests">
      {/* Filter tabs */}
      <div className="flex flex-wrap gap-1.5">
        {FILTERS.map((f) => {
          const active = filter === f.key;
          const count = f.key === "all" ? messages.length : counts[f.key] ?? 0;
          return (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                active
                  ? "bg-violet-600 border-violet-600 text-white shadow-sm shadow-violet-600/25"
                  : "bg-white dark:bg-white/[0.04] border-zinc-200 dark:border-white/10 text-zinc-600 dark:text-zinc-400 hover:border-violet-300 dark:hover:border-violet-600 hover:text-violet-600 dark:hover:text-violet-400"
              }`}
            >
              {f.label} <span className="opacity-70">({count})</span>
            </button>
          );
        })}
      </div>

      {isLoading ? (
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="surface-glass border border-zinc-200 rounded-2xl p-5">
              <div className="h-4 w-40 rounded skeleton-shimmer mb-3" />
              <div className="h-3.5 w-2/3 rounded skeleton-shimmer mb-2" />
              <div className="h-3.5 w-full rounded skeleton-shimmer" />
            </div>
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <EmptyState
          icon={<Inbox className="h-6 w-6" />}
          title="No messages"
          description={filter === "all" ? "No contact enquiries yet." : `No ${filter} messages.`}
        />
      ) : (
        <div className="space-y-4">
          {filtered.map((msg) => (
            <MessageCard key={msg._id} msg={msg} />
          ))}
        </div>
      )}
    </AdminPageWrapper>
  );
}
