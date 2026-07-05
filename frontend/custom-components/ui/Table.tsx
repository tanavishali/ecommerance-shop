import { cn } from "@/lib/utils";
import { SkeletonTable } from "./Skeleton";
import { Paragraph } from "./Typography";

export interface TableColumn<T> {
  key: string;
  header: string;
  width?: string;
  align?: "left" | "center" | "right";
  hideOnMobile?: boolean;
  render?: (row: T, index: number) => React.ReactNode;
}

interface TableProps<T> {
  columns: TableColumn<T>[];
  data: T[];
  loading?: boolean;
  emptyMessage?: string;
  rowKey?: (row: T, index: number) => string;
  onRowClick?: (row: T) => void;
  className?: string;
}

export function Table<T>({
  columns,
  data,
  loading = false,
  emptyMessage = "No data found.",
  rowKey,
  onRowClick,
  className,
}: TableProps<T>) {
  const align = { left: "text-left", center: "text-center", right: "text-right" };

  if (loading) return <SkeletonTable rows={5} cols={columns.length} />;

  return (
    // Horizontal scroll on small screens
    <div className={cn("w-full overflow-x-auto border border-zinc-200 dark:border-zinc-700 rounded-xl -webkit-overflow-scrolling-touch", className)}>
      <table className="w-full text-sm min-w-[480px]">
        <thead>
          <tr className="bg-zinc-50 dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-700">
            {columns.map((col) => (
              <th
                key={col.key}
                className={cn(
                  "px-3 sm:px-4 py-3 font-semibold text-zinc-600 dark:text-zinc-400 whitespace-nowrap",
                  align[col.align ?? "left"],
                  col.hideOnMobile && "hidden sm:table-cell"
                )}
                style={col.width ? { width: col.width } : undefined}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="px-4 py-12 text-center">
                <Paragraph variant="muted">{emptyMessage}</Paragraph>
              </td>
            </tr>
          ) : (
            data.map((row, i) => (
              <tr
                key={rowKey ? rowKey(row, i) : i}
                className={cn(
                  "border-b border-zinc-100 dark:border-zinc-800 last:border-0 transition-colors",
                  onRowClick && "cursor-pointer hover:bg-zinc-50 dark:bg-zinc-900 active:bg-zinc-100 dark:bg-zinc-800"
                )}
                onClick={() => onRowClick?.(row)}
              >
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className={cn(
                      "px-3 sm:px-4 py-3.5 text-zinc-700 dark:text-zinc-300",
                      align[col.align ?? "left"],
                      col.hideOnMobile && "hidden sm:table-cell"
                    )}
                  >
                    {col.render
                      ? col.render(row, i)
                      : String((row as Record<string, unknown>)[col.key] ?? "")}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
