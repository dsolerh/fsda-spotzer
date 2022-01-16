export function* combine<T1, T2>(arr1: T1[], arr2: T2[]) {
  const length = arr1.length > arr2.length ? arr2.length : arr1.length;
  for (let i = 0; i < length; i++) {
    yield {
      arr1: arr1[i],
      arr2: arr2[i],
    };
  }
}
