import {
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table";

export default function DataTable({
    columns,
    data,
    onRowClick,
    striped = true,
    isLoading,
}) {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <div className="w-full overflow-x-auto">
            <div className="min-w-[600px] rounded-md border border-gray-200 overflow-hidden">
                <table className="w-full border-collapse text-sm md:text-base">
                    <thead className="bg-gray-100">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup.id}>
                                <th className="p-3 w-4"></th>
                                {headerGroup.headers.map((header) => (
                                    <th
                                        key={header.id}
                                        className="p-3 text-left font-semibold text-gray-600 whitespace-nowrap"
                                    >
                                        {flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>

                    {isLoading ? (
                        <tbody>
                            <tr>
                                <td
                                    colSpan={columns.length + 1}
                                    className="text-center p-6 text-gray-500"
                                >
                                    Loading...
                                </td>
                            </tr>
                        </tbody>
                    ) : data.length === 0 ? (
                        <tbody>
                            <tr>
                                <td
                                    colSpan={columns.length + 1}
                                    className="text-center p-6 text-gray-500"
                                >
                                    No data found.
                                </td>
                            </tr>
                        </tbody>
                    ) : (
                        <tbody>
                            {table.getRowModel().rows.map((row, index) => (
                                <tr
                                    key={row.id}
                                    onClick={() => onRowClick?.(row.original)}
                                    className={`cursor-pointer h-14 ${striped && index % 2 === 1
                                        ? "bg-gray-50"
                                        : "bg-white"
                                        } hover:bg-gray-100 border-b transition`}
                                >
                                    <td className="p-3 w-4"></td>
                                    {row.getVisibleCells().map((cell) => (
                                        <td
                                            key={cell.id}
                                            className="p-3 text-sm whitespace-nowrap"
                                        >
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    )}
                </table>
            </div>
        </div>
    );
}
