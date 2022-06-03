export interface Link {
  label: string;
  route: string | string[];
  routerLinkActiveOptions?: { exact: boolean };
  disabled?: boolean;
  hidden?: boolean;
}
