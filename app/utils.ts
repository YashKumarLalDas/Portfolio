export function cx(...classes: (string | boolean | undefined | null)[]) {
  return classes.filter(Boolean).join(' ');
}