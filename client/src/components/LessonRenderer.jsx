import HeadingBlock from "./blocks/HeadingBlock";
import ParagraphBlock from "./blocks/ParagraphBlock";
import CodeBlock from "./blocks/CodeBlock";
import VideoBlock from "./blocks/VideoBlock";
import MCQBlock from "./blocks/MCQBlock";

function LessonRenderer({ content = [] }) {
  if (!Array.isArray(content) || content.length === 0) {
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
            Unsupported content block: {block.type}
          </div>
        );
    }
  };

  return <div className="space-y-2">{content.map(renderBlock)}</div>;
}

export default LessonRenderer;