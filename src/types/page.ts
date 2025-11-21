/** @format */

// Base component interface
interface BaseComponent {
  id: string;
  type: string;
  gridColumn: number;
  order: number;
}

// Heading Component
interface HeadingComponent extends BaseComponent {
  type: "heading";
  props: {
    content: string;
    level: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
    fontSize: number;
    fontWeight: "normal" | "medium" | "bold" | "semibold";
    color: string;
    backgroundColor: string;
    padding: number;
    textAlign: "left" | "center" | "right" | "justify";
    backgroundImage: {
      url: string;
      public_id: string;
    } | null;
  };
}

// Image Component
interface ImageComponent extends BaseComponent {
  type: "image";
  props: {
    src: string;
    alt: string;
    width: string;
    height: string;
    borderRadius: number;
    objectFit: "cover" | "contain" | "fill" | "none" | "scale-down";
    backgroundImage: null;
    imagePublicId: string;
  };
}

// Button Component
interface ButtonComponent extends BaseComponent {
  type: "button";
  props: {
    text: string;
    backgroundColor: string;
    color: string;
    padding: string;
    borderRadius: number;
    fontSize: number;
    fontWeight: "normal" | "medium" | "bold" | "semibold";
    border: string;
    cursor: string;
    textAlign: "left" | "center" | "right";
    backgroundImage: null;
  };
}

// Text Component (jika ada)
interface TextComponent extends BaseComponent {
  type: "text";
  props: {
    content: string;
    fontSize: number;
    fontWeight: "normal" | "medium" | "bold" | "semibold";
    color: string;
    textAlign: "left" | "center" | "right" | "justify";
    padding: number;
  };
}

// Union type untuk semua component yang mungkin
export type ComponentTemplate =
  | HeadingComponent
  | ImageComponent
  | ButtonComponent
  | TextComponent;

// Metadata interface
export interface Metadata {
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  canonicalUrl: string;
  robotsIndex: string;
}

// Page Props dengan template yang type-safe
export interface PageProps {
  _id: string;
  name: string;
  path: string;
  status: "PUBLISHED" | "DRAFT";
  template: ComponentTemplate[];
  metadata: Metadata[];
}

// Response interface
export interface PageLayoutResponse {
  status: number;
  message: string;
  data: PageProps | null;
}

// Type guards untuk membantu type checking
export const isHeadingComponent = (
  component: ComponentTemplate
): component is HeadingComponent => {
  return component.type === "heading";
};

export const isImageComponent = (
  component: ComponentTemplate
): component is ImageComponent => {
  return component.type === "image";
};

export const isButtonComponent = (
  component: ComponentTemplate
): component is ButtonComponent => {
  return component.type === "button";
};

export const isTextComponent = (
  component: ComponentTemplate
): component is TextComponent => {
  return component.type === "text";
};
