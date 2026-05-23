export function matchesRoute( currentPath: string, protectedPath: string): boolean {
    return (
        currentPath === protectedPath || currentPath.startsWith(`${protectedPath}/`)
    );
}