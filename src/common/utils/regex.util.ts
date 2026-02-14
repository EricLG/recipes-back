/**
 * Échappe les caractères spéciaux regex pour éviter les injections ReDoS
 * @param str Chaîne à échapper
 * @returns Chaîne échappée sûre pour utilisation dans une regex
 */
export function escapeRegExp(str: string): string {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}
