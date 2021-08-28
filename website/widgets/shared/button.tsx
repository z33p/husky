export default function Button(
  props: React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >
) {
  const btnCssClasses = "px-3 py-2 bg-primary hover:bg-primary-light border rounded text-white";

  return (
    <button {...props} className={`${props.className} ${btnCssClasses}`} />
  );
}
