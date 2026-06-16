import HeadingBlock from "./blocks/HeadingBlock";
import ParagraphBlock from "./blocks/ParagraphBlock";
import CodeBlock from "./blocks/CodeBlock";
import VideoBlock from "./blocks/VideoBlock";
import MCQBlock from "./blocks/MCQBlock";

function LessonRenderer({ content = [] }) {
  const normalizedContent = (Array.isArray(content) ? content : [content])
    .filter(Boolean)
    .map((block) => {
      if (typeof block === "string") {
        return {
          type: "paragraph",
          text: block,
        };
      }

      return {
        ...block,
        type: (block.type || "paragraph").toLowerCase(),
      };
    });

  if (normalizedContent.length === 0) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-6 text-center text-slate-600">
        No lesson content available.
      </div>
    );
  }

  const renderBlock = (block, index) => {
    switch (block.type) {
      case "heading":
        return <HeadingBlock key={index} block={block} />;

      case "paragraph":
        return <ParagraphBlock key={index} block={block} />;

      case "code":
        return <CodeBlock key={index} block={block} />;

      case "video":
        return <VideoBlock key={index} block={block} />;

      case "mcq":
        return <MCQBlock key={index} block={block} />;

      default:
        return (
          <div
            key={index}
            className="my-4 rounded-lg border border-yellow-200 bg-yellow-50 p-4 text-yellow-800"
          >
            Unsupported content block: {block.type || "unknown"}
          </div>
        );
    }
  };

  return <div className="space-y-2">{normalizedContent.map(renderBlock)}</div>;
}

export default LessonRenderer;
