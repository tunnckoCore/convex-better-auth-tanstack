import type { RankingInfo } from "@tanstack/match-sorter-utils";
import { compareItems, rankItem } from "@tanstack/match-sorter-utils";
import { createFileRoute } from "@tanstack/react-router";
import type {
  Column,
  ColumnDef,
  ColumnFiltersState,
  FilterFn,
  SortingFn,
} from "@tanstack/react-table";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  sortingFns,
  useReactTable,
} from "@tanstack/react-table";
import { ChevronDown, ChevronUp } from "lucide-react";
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Person } from "@/data/demo-table-data";
import { makeData } from "@/data/demo-table-data";

export const Route = createFileRoute("/demo/table")({
  component: TableDemo,
});

declare module "@tanstack/react-table" {
  interface FilterFns {
    fuzzy: FilterFn<unknown>;
  }
  interface FilterMeta {
    itemRank: RankingInfo;
  }
}

// Define a custom fuzzy filter function that will apply ranking info to rows (using match-sorter utils)
const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  // Rank the item
  const itemRank = rankItem(row.getValue(columnId), value);

  // Store the itemRank info
  addMeta({
    itemRank,
  });

  // Return if the item should be filtered in/out
  return itemRank.passed;
};

// Define a custom fuzzy sort function that will sort by rank if the row has ranking information
const fuzzySort: SortingFn<any> = (rowA, rowB, columnId) => {
  let dir = 0;

  // Only sort by rank if the column has ranking information
  if (rowA.columnFiltersMeta[columnId]) {
    dir = compareItems(
      rowA.columnFiltersMeta[columnId]?.itemRank,
      rowB.columnFiltersMeta[columnId]?.itemRank
    );
  }

  // Provide an alphanumeric fallback for when the item ranks are equal
  return dir === 0 ? sortingFns.alphanumeric(rowA, rowB, columnId) : dir;
};

function TableDemo() {
  const rerender = React.useReducer(() => ({}), {})[1];

  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [globalFilter, setGlobalFilter] = React.useState("");

  const columns = React.useMemo<ColumnDef<Person, any>[]>(
    () => [
      {
        accessorKey: "id",
        filterFn: "equalsString", //note: normal non-fuzzy filter column - exact match required
      },
      {
        accessorKey: "firstName",
        cell: (info) => info.getValue(),
        filterFn: "includesStringSensitive", //note: normal non-fuzzy filter column - case sensitive
      },
      {
        accessorFn: (row) => row.lastName,
        id: "lastName",
        cell: (info) => info.getValue(),
        header: () => <span>Last Name</span>,
        filterFn: "includesString", //note: normal non-fuzzy filter column - case insensitive
      },
      {
        accessorFn: (row) => `${row.firstName} ${row.lastName}`,
        id: "fullName",
        header: "Full Name",
        cell: (info) => info.getValue(),
        filterFn: "fuzzy", //using our custom fuzzy filter function
        // filterFn: fuzzyFilter, //or just define with the function
        sortingFn: fuzzySort, //sort by fuzzy rank (falls back to alphanumeric)
      },
    ],
    []
  );

  const [data, setData] = React.useState<Person[]>(() => makeData(5000));
  const refreshData = () => setData((_old) => makeData(50_000)); //stress test

  const table = useReactTable({
    data,
    columns,
    filterFns: {
      fuzzy: fuzzyFilter, //define as a filter function that can be used in column definitions
    },
    state: {
      columnFilters,
      globalFilter,
    },
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: "fuzzy", //apply fuzzy filter to the global filter (most common use case for fuzzy filter)
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(), //client side filtering
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    debugTable: true,
    debugHeaders: true,
    debugColumns: false,
  });

  //apply the fuzzy sort if the fullName column is being filtered
  React.useEffect(() => {
    if (
      table.getState().columnFilters[0]?.id === "fullName" &&
      table.getState().sorting[0]?.id !== "fullName"
    ) {
      table.setSorting([{ id: "fullName", desc: false }]);
    }
  }, [table.getState().columnFilters[0]?.id]);

  return (
    <div className="min-h-screen bg-background p-6">
      <Card>
        <CardHeader>
          <CardTitle>TanStack Table Demo</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <DebouncedInput
              className="w-full"
              onChange={(value) => setGlobalFilter(String(value))}
              placeholder="Search all columns..."
              value={globalFilter ?? ""}
            />
          </div>

          <div className="overflow-x-auto rounded-md border">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead colSpan={header.colSpan} key={header.id}>
                          {header.isPlaceholder ? null : (
                            <div className="space-y-2">
                              {header.column.getCanSort() ? (
                                <Button
                                  className="flex h-auto justify-start gap-1 p-0 text-left font-normal hover:text-primary"
                                  onClick={header.column.getToggleSortingHandler()}
                                  variant="ghost"
                                >
                                  {flexRender(
                                    header.column.columnDef.header,
                                    header.getContext()
                                  )}
                                  {header.column.getIsSorted() === "asc" && (
                                    <ChevronUp className="h-4 w-4" />
                                  )}
                                  {header.column.getIsSorted() === "desc" && (
                                    <ChevronDown className="h-4 w-4" />
                                  )}
                                </Button>
                              ) : (
                                <div>
                                  {flexRender(
                                    header.column.columnDef.header,
                                    header.getContext()
                                  )}
                                </div>
                              )}
                              {header.column.getCanFilter() ? (
                                <Filter column={header.column} />
                              ) : null}
                            </div>
                          )}
                        </TableHead>
                      );
                    })}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows.map((row) => {
                  return (
                    <TableRow key={row.id}>
                      {row.getVisibleCells().map((cell) => {
                        return (
                          <TableCell key={cell.id}>
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Button
                disabled={!table.getCanPreviousPage()}
                onClick={() => table.setPageIndex(0)}
                size="sm"
                variant="outline"
              >
                {"<<"}
              </Button>
              <Button
                disabled={!table.getCanPreviousPage()}
                onClick={() => table.previousPage()}
                size="sm"
                variant="outline"
              >
                {"<"}
              </Button>
              <Button
                disabled={!table.getCanNextPage()}
                onClick={() => table.nextPage()}
                size="sm"
                variant="outline"
              >
                {">"}
              </Button>
              <Button
                disabled={!table.getCanNextPage()}
                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                size="sm"
                variant="outline"
              >
                {">>"}
              </Button>
            </div>

            <div className="flex items-center gap-2 text-muted-foreground text-sm">
              <span>
                Page {table.getState().pagination.pageIndex + 1} of{" "}
                {table.getPageCount()}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-muted-foreground text-sm">Go to page:</span>
              <Input
                className="w-16"
                defaultValue={table.getState().pagination.pageIndex + 1}
                onChange={(e) => {
                  const page = e.target.value ? Number(e.target.value) - 1 : 0;
                  table.setPageIndex(page);
                }}
                type="number"
              />
              <Select
                onValueChange={(value) => {
                  table.setPageSize(Number(value));
                }}
                value={table.getState().pagination.pageSize.toString()}
              >
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Page size" />
                </SelectTrigger>
                <SelectContent>
                  {[10, 20, 30, 40, 50].map((pageSize) => (
                    <SelectItem key={pageSize} value={pageSize.toString()}>
                      Show {pageSize}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="text-muted-foreground text-sm">
            {table.getPrePaginationRowModel().rows.length} Rows
          </div>

          <div className="flex gap-2">
            <Button onClick={() => rerender()}>Force Rerender</Button>
            <Button onClick={() => refreshData()}>Refresh Data</Button>
          </div>

          <div className="overflow-auto rounded-lg bg-muted p-4 text-sm">
            <pre>
              {JSON.stringify(
                {
                  columnFilters: table.getState().columnFilters,
                  globalFilter: table.getState().globalFilter,
                },
                null,
                2
              )}
            </pre>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function Filter({ column }: { column: Column<any, unknown> }) {
  const columnFilterValue = column.getFilterValue();

  return (
    <DebouncedInput
      onChange={(value) => column.setFilterValue(value)}
      placeholder="Search..."
      type="text"
      value={(columnFilterValue ?? "") as string}
    />
  );
}

// A typical debounced input react component
function DebouncedInput({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}: {
  value: string | number;
  onChange: (value: string | number) => void;
  debounce?: number;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange">) {
  const [value, setValue] = React.useState(initialValue);

  React.useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);

    return () => clearTimeout(timeout);
  }, [value]);

  return (
    <Input
      {...props}
      onChange={(e) => setValue(e.target.value)}
      value={value}
    />
  );
}
