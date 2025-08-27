export interface User {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  role: "user" | "admin" | "sysAdmin";
}


export type TableColumn<T> = {
  key: keyof T;
  label: string;
};
