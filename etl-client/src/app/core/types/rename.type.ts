type Rename<T, K extends keyof T, N extends string> = Omit<T, K> & {
  [P in N]: T[K];
};

export default Rename;
