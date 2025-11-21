/** @format */

import React from "react";
import {
  ComponentTemplate,
  PageProps,
  isHeadingComponent,
  isImageComponent,
  isButtonComponent,
  isTextComponent,
} from "@/types/page";

/**
 * Parse background image dari berbagai format
 */
const parseBackgroundImage = (
  backgroundImage: { url: string; public_id: string } | null
): string | null => {
  if (!backgroundImage) return null;
  return backgroundImage.url || null;
};

/**
 * Generate style object untuk Text Component
 */
const generateTextStyle = (
  component: ComponentTemplate
): React.CSSProperties => {
  if (!isTextComponent(component)) return {};

  const { props } = component;

  return {
    fontSize: `${props.fontSize}px`,
    fontWeight: props.fontWeight,
    color: props.color,
    textAlign: props.textAlign,
    padding: `${props.padding}px`,
  };
};

/**
 * Generate style object untuk Heading Component
 */
const generateHeadingStyle = (
  component: ComponentTemplate
): React.CSSProperties => {
  if (!isHeadingComponent(component)) return {};

  const { props } = component;
  const bgImage = parseBackgroundImage(props.backgroundImage);

  return {
    fontSize: `${props.fontSize}px`,
    fontWeight: props.fontWeight,
    color: props.color,
    backgroundColor: bgImage ? "transparent" : props.backgroundColor,
    backgroundImage: bgImage ? `url(${bgImage})` : "none",
    backgroundSize: bgImage ? "cover" : undefined,
    backgroundPosition: bgImage ? "center" : undefined,
    backgroundRepeat: bgImage ? "no-repeat" : undefined,
    padding: `${props.padding}px`,
    textAlign: props.textAlign,
  };
};

/**
 * Generate style object untuk Image Component
 */
const generateImageStyle = (
  component: ComponentTemplate
): React.CSSProperties => {
  if (!isImageComponent(component)) return {};

  const { props } = component;

  return {
    width: props.width,
    height: props.height,
    borderRadius: `${props.borderRadius}px`,
    objectFit: props.objectFit,
  };
};

/**
 * Generate style object untuk Button Component
 */
const generateButtonStyle = (
  component: ComponentTemplate
): React.CSSProperties => {
  if (!isButtonComponent(component)) return {};

  const { props } = component;

  return {
    backgroundColor: props.backgroundColor,
    color: props.color,
    padding: props.padding,
    borderRadius: `${props.borderRadius}px`,
    fontSize: `${props.fontSize}px`,
    fontWeight: props.fontWeight,
    border: props.border,
    cursor: props.cursor,
    textAlign: props.textAlign,
    display: "inline-block",
  };
};

/**
 * Render Text Component
 */
const renderTextComponent = (component: ComponentTemplate): React.ReactNode => {
  if (!isTextComponent(component)) return null;

  const style = generateTextStyle(component);

  return (
    <p key={component.id} style={style}>
      {component.props.content}
    </p>
  );
};

/**
 * Render Heading Component
 */
const renderHeadingComponent = (
  component: ComponentTemplate
): React.ReactNode => {
  if (!isHeadingComponent(component)) return null;

  const style = generateHeadingStyle(component);
  const HeadingTag = component.props.level;

  return React.createElement(
    HeadingTag,
    { key: component.id, style },
    component.props.content
  );
};

/**
 * Render Image Component
 */
const renderImageComponent = (
  component: ComponentTemplate
): React.ReactNode => {
  if (!isImageComponent(component)) return null;

  const style = generateImageStyle(component);

  return (
    <img
      key={component.id}
      src={component.props.src}
      alt={component.props.alt}
      style={style}
      loading="lazy"
    />
  );
};

/**
 * Render Button Component
 */
const renderButtonComponent = (
  component: ComponentTemplate
): React.ReactNode => {
  if (!isButtonComponent(component)) return null;

  const style = generateButtonStyle(component);

  return (
    <div
      key={component.id}
      style={{ textAlign: component.props.textAlign, padding: 0 }}
    >
      <button style={style}>{component.props.text}</button>
    </div>
  );
};

/**
 * Render individual component berdasarkan type
 */
export const renderComponent = (
  component: ComponentTemplate
): React.ReactNode => {
  if (isTextComponent(component)) {
    return renderTextComponent(component);
  }

  if (isHeadingComponent(component)) {
    return renderHeadingComponent(component);
  }

  if (isImageComponent(component)) {
    return renderImageComponent(component);
  }

  if (isButtonComponent(component)) {
    return renderButtonComponent(component);
  }

  // Fallback untuk component type yang tidak dikenali
  return (
    <div className="p-4 bg-red-50 text-red-600 rounded">
      Unknown component type
    </div>
  );
};

/**
 * Parse dan render dynamic page template
 */
export const parseDynamicPage = (data: PageProps): React.ReactNode => {
  if (!data || !data.template || data.template.length === 0) {
    return (
      <div className="text-center py-20 text-gray-500">
        <p>No content available</p>
      </div>
    );
  }

  // Sort components berdasarkan order
  const sortedTemplate = [...data.template].sort((a, b) => a.order - b.order);

  return (
    <div className="dynamic-page-content">
      <div className="grid grid-cols-12 gap-4">
        {sortedTemplate.map((component) => (
          <div
            key={component.id}
            className="col-span-12"
            style={{
              gridColumn:
                typeof window !== "undefined" && window.innerWidth >= 768
                  ? `span ${component.gridColumn}`
                  : "span 12",
            }}
          >
            {renderComponent(component)}
          </div>
        ))}
      </div>
    </div>
  );
};

/**
 * Hook untuk parsing dynamic page dengan responsive behavior
 */
export const useDynamicPageParser = (data: PageProps | null) => {
  const [content, setContent] = React.useState<React.ReactNode>(null);

  React.useEffect(() => {
    if (data) {
      setContent(parseDynamicPage(data));
    }
  }, [data]);

  return content;
};

/**
 * Component wrapper untuk dynamic page
 */
interface DynamicPageRendererProps {
  data: PageProps;
  className?: string;
}

export const DynamicPageRenderer: React.FC<DynamicPageRendererProps> = ({
  data,
  className = "",
}) => {
  const content = useDynamicPageParser(data);

  return <div className={`dynamic-page-wrapper ${className}`}>{content}</div>;
};

// Export functions untuk flexibility
export {
  generateTextStyle,
  generateHeadingStyle,
  generateImageStyle,
  generateButtonStyle,
  parseBackgroundImage,
};
