/** NEXT_PUBLIC_* is inlined for client bundles. */
export function getSiteFullName(): string {
  return process.env.NEXT_PUBLIC_FULL_NAME?.trim() ?? ''
}

/** Two-line hero: given names, then surname (single string if one token). */
export function splitHeroName(fullName: string): {
  line1: string | null
  line2: string
} {
  const parts = fullName.split(/\s+/).filter(Boolean)
  if (parts.length === 0) return { line1: null, line2: '' }
  if (parts.length === 1) return { line1: null, line2: parts[0]! }
  const last = parts.pop()!
  return { line1: parts.join(' '), line2: last }
}
