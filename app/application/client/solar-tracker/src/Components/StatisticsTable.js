import ReactTable, { useTable, usePagination } from "react-table";
import React, {useState, useEffect} from 'react';
import "../Style/StatisticsTable.css";

function StatisticsTable(props) {
    const [data, setData] = useState(props.data);

    useEffect(() => {
        setData(props.data);
        //console.log(props.data);
    })

    const columns = React.useMemo(
        () => [
            {
                Header: 'Time',
                accessor: 'Time', // accessor is the "key" in the data
            },
            {
                Header: 'Date',
                accessor: 'Date',
            },
            {
                Header: 'Panel One Avg.',
                accessor: 'PanelOneValue', // accessor is the "key" in the data
            },
            {
                Header: 'Panel Two Avg.',
                accessor: 'PanelTwoValue', // accessor is the "key" in the data
            }
        ],
        []
    )

    const {
        //Table needs
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page,

        //Pagination needs
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        state: { pageIndex, pageSize },

    } = useTable({
        columns,
        data,
        initialState: { pageIndex: 0, pageSize: 15 }
    },
        usePagination
    )

    return (
        <div>
            <table className="table"{...getTableProps()}>
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th scope="col" {...column.getHeaderProps()}>
                                    {column.render('Header')}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {page.map(row => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map(cell => {
                                    return (
                                        <td
                                            {...cell.getCellProps()}>
                                            {cell.render('Cell')}
                                        </td>
                                    )
                                })}
                            </tr>
                        )
                    })}
                </tbody>
                </table>
            <div className="pagination">
                <div>
                    <button className="btn btn-outline-primary" onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                        {'<<'}
                    </button>
                    <button className="btn btn-outline-primary" onClick={() => previousPage()} disabled={!canPreviousPage}>
                        {'<'}
                    </button>
                    <button className="btn btn-outline-primary" onClick={() => nextPage()} disabled={!canNextPage}>
                        {'>'}
                    </button>
                    <button className="btn btn-outline-primary" onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                        {'>>'}
                    </button>
                    <span className="pageSpan">
                        Page {pageIndex + 1} of {pageOptions.length}
                    </span>
                </div>
                <div className="">
                    <span className="pageSpan">
                        Go to page:
                        </span>
                        <input
                            className="form-control-sm"
                            type="number"
                            defaultValue={pageIndex + 1}
                            onChange={e => {
                                const page = e.target.value ? Number(e.target.value) - 1 : 0
                                gotoPage(page)
                            }} />
                    <select
                        className="form-control-sm"
                        value={pageSize}
                        onChange={e => {
                            setPageSize(Number(e.target.value))
                        }}
                    >
                        {[15, 30].map(pageSize => (
                            <option key={pageSize} value={pageSize}>
                                Show {pageSize}
                            </option>
                        ))}
                    </select>
                </div>

            </div>
        </div>
    );

}

export default StatisticsTable;
