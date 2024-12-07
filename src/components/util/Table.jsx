import React from 'react';

function Table({ columns, data }) {
    return (
        <div className="overflow-x-auto">
            <table className="mx-auto w-full">
                <thead className="bg-gray-100 dark:bg-gray-800">
                    <tr>
                        {columns.map((column, index) => (
                            <th key={index} className="pb-4 pt-4 px-4 font-bold text-lg">
                                {column}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, rowIndex) => (
                        <tr
                            key={rowIndex}
                            className={`hover:bg-gray-50 dark:hover:bg-gray-600 ${
                                rowIndex % 2 === 0 ? 'bg-gray-50 dark:bg-gray-700' : 'bg-white dark:bg-gray-800'
                            }`}
                        >
                            {Object.values(row).map((value, colIndex) => (
                                <td key={colIndex} className="pt-4 pb-4 px-4 font-light">
                                    {value}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Table;
