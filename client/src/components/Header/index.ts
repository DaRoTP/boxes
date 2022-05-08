export { default } from "./Header";

export type NavLinkType = {
  label: string;
  callback?: (props?: any) => void;
  isAuth?: boolean;
};
export interface AppBarProps {
  pages: NavLinkType[];
}
