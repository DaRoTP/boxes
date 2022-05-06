export { default } from "./Table";

export type HeaderProps = {
  label: String;
  row?: (rowData: any) => any;
};

export type HeadingProps = Record<string, HeaderProps>

export type PaginationType = {

}

export interface FetchTableProps {
    pagination: { page: number, rowsPerPage: number },
    isLoading: boolean,
    setLoading: (state: boolean) => void
}

export interface BasicTableProps {
  headers: Record<string, HeaderProps>;
  data: Record<string, any>[];
  pagination?: {
    rowsPerPage?: number,
    page?: ''
  },
  fetchTableData: (props: FetchTableProps) => void
}
