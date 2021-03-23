import React, { useState } from "react";
import {
  useTable,
  useFilters,
  useGlobalFilter,
  useAsyncDebounce,
  useSortBy,
  usePagination,
} from "react-table";
import RemoveRoomButton from "components/Modals/RemoveRoomButton";
import RoomUpdation from "components/Modals/RoomUpdation";
import CreateRoomButton from "components/Modals/CreateRoom";
import ToggleDarkMode from "components/Inputs/ToggleDarkMode";

function GlobalFilter({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
  isLight,
}) {
  const count = preGlobalFilteredRows.length;
  const [value, setValue] = React.useState(globalFilter);
  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 200);

  return (
    <span className="text-gray-700 font-normal ml-2 ">
      {/* Search:{" "} */}
      <i
        class={
          isLight
            ? "fas fa-search mr-4 text-gray-700"
            : "fas fa-search mr-4 text-white"
        }
      ></i>
      <input
        className="px-2 py-1  placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline ease-linear transition-All duration-150"
        value={value || ""}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        placeholder={`${count} records...`}
      />
    </span>
  );
}

function DefaultColumnFilter({
  column: { filterValue, preFilteredRows, setFilter },
}) {
  const count = preFilteredRows.length;

  return (
    <input
      value={filterValue || ""}
      onChange={(e) => {
        setFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
      }}
      placeholder={`Search ${count} records...`}
    />
  );
}

function SelectColumnFilter({
  column: { filterValue, setFilter, preFilteredRows, id },
}) {
  // Calculate the options for filtering
  // using the preFilteredRows
  const options = React.useMemo(() => {
    const options = new Set();
    preFilteredRows.forEach((row) => {
      options.add(row.values[id]);
    });
    return [...options.values()];
  }, [id, preFilteredRows]);

  // Render a multi-select box
  return (
    <select
      value={filterValue}
      onChange={(e) => {
        setFilter(e.target.value || undefined);
      }}
    >
      <option value="">All</option>
      {options.map((option, i) => (
        <option key={i} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}

export default function App() {
  const [isLight, setIsLight] = useState(1);
  const data = React.useMemo(
    () => [
      {
        roomName: "Cricket Tournament",
        readable: "Moderator",
        writable: "All",
        location: "Ahmedabad",
        description: "pending",
        actions: " ",
      },
      {
        roomName: "Cricket Tournament",
        readable: "All",
        writable: "All",
        location: "Ahmedabad",
        description: "approved",
        actions: " ",
      },
      {
        roomName: "Cricket Tournament",
        readable: "Moderator",
        writable: "All",
        location: "Ahmedabad",
        description: "pending",
        actions: " ",
      },
      {
        roomName: "Cricket Tournament",
        readable: "Moderator",
        writable: "All",
        location: "Ahmedabad",
        description: "pending",
        actions: " ",
      },
      {
        roomName: "Cricket Tournament",
        readable: "All",
        writable: "All",
        location: "Ahmedabad",
        description: "approved",
        actions: " ",
      },
      {
        roomName: "Cricket Tournament",
        readable: "Moderator",
        writable: "All",
        location: "Ahmedabad",
        description: "pending",
        actions: " ",
      },
      {
        roomName: "Cricket Tournament",
        readable: "Moderator",
        writable: "All",
        location: "Ahmedabad",
        description: "pending",
        actions: " ",
      },
      {
        roomName: "Cricket Tournament",
        readable: "All",
        writable: "All",
        location: "Ahmedabad",
        description: "approved",
        actions: " ",
      },
      {
        roomName: "Cricket Tournament",
        readable: "Moderator",
        writable: "All",
        location: "Ahmedabad",
        description: "pending",
        actions: " ",
      },
      {
        roomName: "Cricket Tournament",
        readable: "Moderator",
        writable: "All",
        location: "Ahmedabad",
        description: "pending",
        actions: " ",
      },
      {
        roomName: "Cricket Tournament",
        readable: "All",
        writable: "All",
        location: "Ahmedabad",
        description: "approved",
        actions: " ",
      },
      {
        roomName: "Cricket Tournament",
        readable: "Moderator",
        writable: "All",
        location: "Ahmedabad",
        description: "pending",
        actions: " ",
      },
      {
        roomName: "Cricket Tournament",
        readable: "Moderator",
        writable: "All",
        location: "Ahmedabad",
        description: "pending",
        actions: " ",
      },
      {
        roomName: "Cricket Tournament",
        readable: "All",
        writable: "All",
        location: "Ahmedabad",
        description: "approved",
        actions: " ",
      },
      {
        roomName: "Cricket Tournament",
        readable: "Moderator",
        writable: "All",
        location: "Ahmedabad",
        description: "pending",
        actions: " ",
      },
      {
        roomName: "Cricket Tournament",
        readable: "Moderator",
        writable: "All",
        location: "Ahmedabad",
        description: "pending",
        actions: " ",
      },
      {
        roomName: "Cricket Tournament",
        readable: "All",
        writable: "All",
        location: "Ahmedabad",
        description: "approved",
        actions: " ",
      },
      {
        roomName: "Cricket Tournament",
        readable: "Moderator",
        writable: "All",
        location: "Ahmedabad",
        description:
          "pendingpendingpendingpendingpendingpendingpendingpendingpendingpendingpendingpendingpendingpendingpendingpendingpendingpendingpendingpendingpendingpendingpendingpendingpendingpending",
        actions: " ",
      },
    ],
    []
  );

  const columns = React.useMemo(
    () => [
      {
        Header: "Name",
        accessor: "roomName", // accessor is the "key" in the data
        disableFilters: true,
        Cell: ({ value }) => {
          return <span className="font-semibold text-sm">{value}</span>;
        },
      },
      {
        Header: "Readable",
        accessor: "readable",
        disableFilters: true,
      },
      {
        Header: "Writable",
        accessor: "writable", // accessor is the "key" in the data

        disableFilters: true,
      },
      {
        Header: "Description",
        accessor: "description", // accessor is the "key" in the data
        Cell: ({ value }) => (
          <div className="break-words max-w-210-px overflow-hidden">
            {value}
          </div>
        ),
        disableFilters: true,
      },

      {
        Header: "Actions",
        accessor: "actions", // here add _id of event request so easy to attach with the buttons
        Cell: ({ value }) => (
          <div className="flex ">
            <RoomUpdation
              updateRoom={() =>
                console.log("pass id to update info in the modal")
              }
              name="insert here"
              description="insert here"
              readable="Moderator"
              writable="Moderator"
            />
            <RemoveRoomButton
              removeRoom={() =>
                console.log(
                  "GOLU MAKE THIS function to remove current clicked room"
                )
              }
            ></RemoveRoomButton>
          </div>
        ),
        disableFilters: true,
        disableSortBy: true,
      },
    ],
    []
  );
  const defaultColumn = React.useMemo(
    () => ({
      Filter: DefaultColumnFilter,
    }),
    []
  );
  const filterTypes = React.useMemo(
    () => ({
      text: (rows, id, filterValue) => {
        return rows.filter((row) => {
          const rowValue = row.values[id];
          return rowValue !== undefined
            ? String(rowValue)
                .toLowerCase()
                .startsWith(String(filterValue).toLowerCase())
            : true;
        });
      },
    }),
    []
  );
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,

    prepareRow,
    state,

    preGlobalFilteredRows,
    setGlobalFilter,

    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPagereadable,
    state: { pageIndex, pagereadable },
  } = useTable(
    {
      columns,
      data,

      defaultColumn, // Be sure to pass the defaultColumn option
      filterTypes,
    },

    useFilters, // useFilters!
    useGlobalFilter, // useGlobalFilter!
    useSortBy,
    usePagination
  );

  return (
    <>
      <div
        className={
          "relative flex flex-col min-w-0 break-words w-full mb-6 shadow rounded " +
          (isLight ? "bg-white" : "bg-blue-900 text-white")
        }
      >
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <div className="flex flex-row">
                {" "}
                <div>
                  <h3
                    className={
                      "font-semibold text-lg " +
                      (isLight ? "text-gray-800" : "text-white")
                    }
                  >
                    Rooms Info
                  </h3>
                </div>
                <div className="inline-block ml-2">
                  <ToggleDarkMode
                    isOn={!isLight}
                    onClick={() => setIsLight(!isLight)}
                  />
                </div>
                <div className="ml-auto">
                  <div className="inline-block">
                    <CreateRoomButton />
                  </div>
                  <span className="ml-2 "></span>
                  <GlobalFilter
                    isLight={isLight}
                    preGlobalFilteredRows={preGlobalFilteredRows}
                    globalFilter={state.globalFilter}
                    setGlobalFilter={setGlobalFilter}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="block w-full overflow-x-auto">
          <table
            {...getTableProps()}
            className="items-center w-full bg-transparent border-collapse"
          >
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                      className={
                        "px-6 align-middle border border-solid py-3 text-xs  uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left " +
                        (isLight
                          ? "bg-gray-100 text-gray-600 border-gray-200"
                          : "bg-blue-800 text-blue-300 border-blue-700")
                      }
                    >
                      {column.render("Header")}
                      <span>
                        {column.isSorted
                          ? column.isSortedDesc
                            ? " 🔽"
                            : " 🔼"
                          : ""}
                      </span>
                      {/* Render the columns filter UI */}
                      <div>
                        {column.canFilter ? column.render("Filter") : null}
                      </div>
                    </th>
                  ))}
                </tr>
              ))}
              <tr></tr>
            </thead>
            <tbody {...getTableBodyProps()}>
              {page.map((row, i) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map((cell) => {
                      return (
                        <td
                          {...cell.getCellProps()}
                          className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xsm whitespace-no-wrap p-4"
                        >
                          {cell.render("Cell")}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="mt-2 flex flex-row justify-center">
            <div className="mr-auto pl-4">
              Show entries : &nbsp;&nbsp;
              <select
                value={pagereadable}
                onChange={(e) => {
                  setPagereadable(Number(e.target.value));
                }}
                className="border bg-white rounded px-3 py-1 outline-none text-sm"
              >
                {[10, 20, 30, 40, 50].map((pagereadable) => (
                  <option key={pagereadable} value={pagereadable}>
                    {pagereadable}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <button
                className="rounded-lg shadow bg-blue-600 text-white px-2 py-1"
                onClick={() => gotoPage(0)}
                disabled={!canPreviousPage}
              >
                <i class="fas fa-step-backward"></i>
              </button>{" "}
              <button
                className="rounded-lg shadow bg-blue-600 text-white px-2 py-1"
                onClick={() => previousPage()}
                disabled={!canPreviousPage}
              >
                <i class="fas fa-chevron-left"></i>
              </button>{" "}
              <span className="mx-4">
                <strong>{pageIndex + 1}</strong>{" "}
              </span>
              <button
                className="rounded-lg shadow bg-blue-600 text-white px-2 py-1"
                onClick={() => nextPage()}
                disabled={!canNextPage}
              >
                <i class="fas fa-chevron-right"></i>
              </button>{" "}
              <button
                className="rounded-lg shadow bg-blue-600 text-white px-2 py-1"
                onClick={() => gotoPage(pageCount - 1)}
                disabled={!canNextPage}
              >
                <i class="fas fa-step-forward"></i>
              </button>{" "}
            </div>
            <div className="ml-auto mr-4 mt-1 overflow">
              <span>
                Go to page:{" "}
                <input
                  className="px-2 py-1 mr-2 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline ease-linear transition-All duration-150"
                  type="number"
                  defaultValue={pageIndex + 1}
                  onChange={(e) => {
                    const page = e.target.value
                      ? Number(e.target.value) - 1
                      : 0;
                    gotoPage(page);
                  }}
                  style={{ width: "100px" }}
                />
                of {pageOptions.length}
              </span>{" "}
            </div>
          </div>
          <br />
        </div>
      </div>
    </>
  );
}
