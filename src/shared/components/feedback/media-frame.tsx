export function MediaFrame({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement {
  return (
    <div className="aspect-video w-full overflow-hidden rounded-md border">
      {children}
    </div>
  );
}
