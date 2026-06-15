import { cn } from "@/lib/utils";

interface TableProps {
  headers: string[];
  children: React.ReactNode;
  className?: string;
}

export function Table({ headers, children, className }: TableProps) {
  return (
    <div className={cn("overflow-x-auto", className)}>
      <table className="w-full">
        <thead>
          <tr className="border-b border-primary-100 dark:border-primary-800">
            {headers.map((header) => (
              <th
                key={header}
                className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-primary-50 dark:divide-primary-800/50">
          {children}
        </tbody>
      </table>
    </div>
  );
}

export function TableRow({ children, className, onClick }: { children: React.ReactNode; className?: string; onClick?: () => void }) {
  return (
    <tr className={cn("hover:bg-primary-50/50 dark:hover:bg-primary-900/10 transition-colors", className)} onClick={onClick}>
      {children}
    </tr>
  );
}

export function TableCell({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <td className={cn("px-4 py-3 text-sm text-gray-700 dark:text-gray-300", className)}>
      {children}
    </td>
  );
}
