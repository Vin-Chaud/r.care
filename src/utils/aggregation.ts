export function maxBy<A>(value: readonly A[], by: (a: A) => number): A | null {
  if (value.length === 0) {
    return null;
  }
  let max = value[0];
  let maxBy = by(max);
  for (let i = 1; i < value.length; i++) {
    const current = value[i];
    const currentBy = by(current);
    if (currentBy > maxBy) {
      max = current;
      maxBy = currentBy;
    }
  }
  return max;
}
