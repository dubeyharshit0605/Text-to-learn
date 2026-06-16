function ParagraphBlock({ block }) {
  return (
    <p className="mb-4 leading-7 text-slate-700">
      {block.text}
    </p>
  );
}

export default ParagraphBlock;