export interface Dienst {
    readonly icon: string;
    readonly title: string;
    readonly description: string;
    readonly tags: readonly string[];
    readonly image?: string | null;
}
