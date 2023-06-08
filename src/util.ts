export function wrapAsyncComponent<T>(Element: (props: T) => Promise<JSX.Element>) {
  return Element as unknown as (props: T) => JSX.Element;
}
