function HeadingBlock({ block }) {
  return (
    <h2 className="mt-8 mb-3 text-2xl font-bold text-slate-950">
      {block.text}
    </h2>
  );
}

export default HeadingBlock;