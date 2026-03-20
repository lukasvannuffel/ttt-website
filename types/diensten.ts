export interface Dienst {
  icon: string;
  title: string;
  description: string;
  tags: string[];
  href?: string;
  
  image?: string | null;
  imagePosition?: "top" | "center" | "bottom";
}
