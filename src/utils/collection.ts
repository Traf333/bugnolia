
export function group<T extends any[]>(collection: T, size: number): T[] {
  return collection.reduce((r, e, i) =>
      (i % size ? r[r.length - 1].push(e) : r.push([e])) && r
    , []);
}


