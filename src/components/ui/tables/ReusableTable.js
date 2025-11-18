import { useMemo } from "react";
import { useTable, useSortBy, useGlobalFilter } from "react-table";
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";

export default function ReusableTable({ columnsDef, data, actions }) {
  const columns = useMemo(() => columnsDef, [columnsDef]);
  const tableData = useMemo(() => data, [data]);
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow, state, setGlobalFilter } =
    useTable({ columns, data: tableData }, useGlobalFilter, useSortBy);

  return (
    <div className="overflow-x-auto rounded shadow bg-white">
      <div className="flex items-center justify-end px-3 mt-2 mb-2">
        <input
          value={state.globalFilter || ""}
          onChange={e => setGlobalFilter(e.target.value)}
          placeholder="Search…"
          className="px-3 py-1 border rounded focus:ring"
        />
      </div>
      <table className="w-full text-left border-separate border-spacing-y-1" {...getTableProps()}>
        <thead>
          {headerGroups.map(hg => (
            <tr {...hg.getHeaderGroupProps()}>
              {hg.headers.map(col => (
                <th {...col.getHeaderProps(col.getSortByToggleProps())} className="px-4 py-2 bg-gray-50 font-bold cursor-pointer">
                  <span>{col.render("Header")}</span>
                  <span className="ml-1 inline-block align-middle">
                    {col.isSorted ? (col.isSortedDesc ? <FaSortDown /> : <FaSortUp />) : <FaSort className="text-gray-400" />}
                  </span>
                </th>
              ))}
              {actions && <th className="px-4 py-2 bg-gray-50 font-bold">Action</th>}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, idx) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} className="hover:bg-primary50 rounded-lg">
                {row.cells.map(cell => (
                  <td {...cell.getCellProps()} className="px-4 py-2">{cell.render("Cell")}</td>
                ))}
                {actions && (
                  <td className="flex gap-2 px-4 py-2 items-center">
                    {actions.map(({ icon: Icon, label, onClick, color }) => (
                      <button onClick={() => onClick(row.original)} key={label} className={`rounded p-[6px] ${color ? `text-${color}` : ""}`}>
                        <Icon />
                      </button>
                    ))}
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
