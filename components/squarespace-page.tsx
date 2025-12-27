type SquarespacePageProps = {
  html: string;
};

export function SquarespacePage({ html }: SquarespacePageProps) {
  return (
    <main
      id="page"
      className="container"
      role="main"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
