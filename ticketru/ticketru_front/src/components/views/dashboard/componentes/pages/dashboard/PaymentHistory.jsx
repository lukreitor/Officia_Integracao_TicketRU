import React from 'react';
import { Container, Table, Button } from 'react-bootstrap';
import { useTable } from 'react-table';
import { useSortBy, usePagination, useGlobalFilter } from 'react-table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortDown, faSortUp } from '@fortawesome/free-solid-svg-icons';
import { CSVLink } from 'react-csv';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { FormControl } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import fetchHistoryData from './fetchHistory';

function PaymentHistory() {
    const ra = localStorage.getItem('ra'); // Get RA from localStorage
    const [historyData, setHistoryData] = useState([]);

    const columns = React.useMemo(
        () => [
            {
                Header: 'Data',
                accessor: 'data'
            },
            {
                Header: 'Valor',
                accessor: 'valor'
            },
            {
                Header: 'Quantidade',
                accessor: 'quantidade'
            }
        ],
        []
    );

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchHistoryData();
            if (data) {
                setHistoryData(data);
            }
        };

        fetchData();
    }, []);

    const data = React.useMemo(() => historyData || [], [historyData]);

    // discover data type of data
    // print the object structure, including nested objects

    const {
        getTableBodyProps,
        headerGroups,
        prepareRow,
        rows,
        setGlobalFilter,
        state,
        page,
        nextPage,
        previousPage,
        canNextPage,
        canPreviousPage
    } = useTable(
        {
            columns,
            data: historyData,
            initialState: { pageSize: 5 }
        },
        useGlobalFilter,
        useSortBy,
        usePagination
    );
    console.log(state.pageSize); // Check the value of pageSize in the console

    const { globalFilter, pageIndex, pageSize } = state;

    const exportToCSV = () => {
        const csvData = rows.map((row) => ({
            Quantity: row.values.quantity,
            'Data de Compra': row.values.date,
            'Valor Total': row.values.value
        }));

        const csvHeaders = [
            { label: 'Quantidade', key: 'Quantity' },
            { label: 'Data de Compra', key: 'Data de Compra' },
            { label: 'Valor Total', key: 'Valor Total' }
        ];

        const csvReport = {
            data: csvData,
            headers: csvHeaders
        };

        return (
            <CSVLink
                data={csvReport.data}
                headers={csvReport.headers}
                filename={'payment_history.csv'}
            >
                Export to CSV
            </CSVLink>
        );
    };

    const exportToPDF = () => {
        const doc = new jsPDF();

        const tableData = rows.map((row) => {
            return [
                row.original.quantidade,
                row.original.updatedAt,
                row.original.preco
            ];
        });

        // Add custom title
        doc.setFontSize(18);
        doc.text('Histórico de Pagamentos', 10, 10);

        // Add page number in footer
        const pageCount = doc.internal.getNumberOfPages();
        for (let i = 1; i <= pageCount; i++) {
            doc.setPage(i);
            doc.setFontSize(10);
            doc.text(
                `Page ${i} of ${pageCount}`,
                doc.internal.pageSize.getWidth() - 20,
                doc.internal.pageSize.getHeight() - 10
            );
        }

        doc.autoTable({
            head: [['Quantidade', 'Data de Compra', 'Valor Total']],
            body: tableData
        });

        doc.save('historico.pdf');
    };

    return (
        <Container>
            <h1 className="text-center">Histórico de Compras</h1>
            <div className="mb-3">
                <FormControl
                    type="text"
                    value={globalFilter || ''}
                    onChange={(e) => setGlobalFilter(e.target.value)}
                    placeholder="Pesquisar..."
                />
            </div>
            <Table striped bordered hover responsive>
                <thead>
                    {headerGroups.map((headerGroup, index) => (
                        <tr {...headerGroup.getHeaderGroupProps()} key={index}>
                            {headerGroup.headers.map((column, columnIndex) => (
                                <th
                                    {...column.getHeaderProps()}
                                    key={columnIndex}
                                >
                                    {column.render('Header')}
                                    <span>
                                        {column.isSorted ? (
                                            column.isSortedDesc ? (
                                                <FontAwesomeIcon
                                                    icon={faSortDown}
                                                />
                                            ) : (
                                                <FontAwesomeIcon
                                                    icon={faSortUp}
                                                />
                                            )
                                        ) : (
                                            ''
                                        )}
                                    </span>
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {page.map((row, rowIndex) => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()} key={rowIndex}>
                                <td {...row.cells[0].getCellProps()}>
                                    {row.original.updatedAt}
                                </td>
                                <td {...row.cells[1].getCellProps()}>
                                    {row.original.preco}
                                </td>
                                <td {...row.cells[2].getCellProps()}>
                                    {row.original.quantidade}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
            <div className="text-center mt-3">
                <Button
                    className="bg-e-gradient"
                    variant="success"
                    onClick={exportToCSV}
                    disabled={data.length === 0}
                >
                    Baixar em CSV
                </Button>{' '}
                <Button
                    className="bg-e-gradient"
                    variant="success"
                    onClick={exportToPDF}
                    disabled={data.length === 0}
                >
                    Baixar em PDF
                </Button>
            </div>
            <div className="text-center mt-3">
                <Button
                    className="btn-previous "
                    onClick={() => previousPage()}
                    disabled={!canPreviousPage}
                >
                    Anterior
                </Button>{' '}
                <span className="mx-2 ">
                    Página{' '}
                    <strong>
                        {pageIndex + 1} de {Math.ceil(rows.length / pageSize)}
                    </strong>{' '}
                </span>
                <Button
                    className="btn-next "
                    onClick={() => nextPage()}
                    disabled={!canNextPage}
                >
                    Próximo
                </Button>
            </div>
        </Container>
    );
}

export default PaymentHistory;
