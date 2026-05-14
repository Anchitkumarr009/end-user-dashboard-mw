export function PageHeader({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <div className="mb-8">
      <h1 className="font-serif text-2xl font-semibold tracking-tight text-[#4A1414] sm:text-3xl">
        {title}
      </h1>
      {description ? (
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#4A1414]/65">
          {description}
        </p>
      ) : null}
    </div>
  );
}
