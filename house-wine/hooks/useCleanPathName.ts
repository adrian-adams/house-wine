"use client"

import { usePathname } from 'next/navigation';

export function useCleanPathname() {
  const pathname = usePathname();

  // Regex matches a slash, followed by 2 letters, followed by another slash or end of string
  // Examples: "/en/marketplace" -> "/marketplace", "/fr" -> "/"
  const cleanPathname = pathname.replace(/^\/[a-zA-Z]{2}(\/|$)/, '/');

  return {
    pathname: cleanPathname,     // The cleaned path (e.g., "/marketplace")
    rawPathname: pathname,       // The original path with locale if you still need it
  };
}
