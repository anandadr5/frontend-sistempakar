import React from "react";

const Table = ({
  columns,
  data,
  onDetail,
  onDelete,
  showDetailAction = true,
}) => {
  return (
    <div className="w-full overflow-x-auto px-4">
      <div className="w-full min-w-[600px]">
        <table className="w-full border-collapse border border-gray-400 rounded-lg shadow-sm">
          <thead className="bg-[#d6eadf]">
            <tr>
              {columns.map((col, index) => (
                <th
                  key={index}
                  className="border border-gray-400 px-3 py-2 text-sm sm:text-base font-bold text-black text-center"
                >
                  {col.label}
                </th>
              ))}
              <th className="border border-gray-400 px-3 py-2 text-sm sm:text-base font-bold text-black text-center">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + 1}
                  className="text-center py-6 text-gray-500 border border-gray-300"
                >
                  Tidak ada data.
                </td>
              </tr>
            ) : (
              data.map((row, rowIndex) => (
                <tr
                  key={row.id || rowIndex}
                  className="even:bg-white odd:bg-gray-100 hover:bg-gray-200 transition-colors duration-150"
                >
                  {columns.map((col, i) => (
                    <td
                      key={i}
                      className="border border-gray-400 px-3 py-2 text-sm text-black text-center break-words max-w-[250px]"
                    >
                      {row[col.field]}
                    </td>
                  ))}
                  <td className="border border-gray-400 text-center p-2 sm:p-2.5 text-xs sm:text-sm text-black">
                    {showDetailAction && (
                      <span
                        onClick={() => onDetail?.(row)}
                        className="cursor-pointer mr-2"
                        title="Lihat Detail"
                      >
                        🔍
                      </span>
                    )}
                    <span
                      onClick={() => onDelete?.(row)}
                      className="cursor-pointer"
                      title="Hapus Data"
                    >
                      🗑️
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
