import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

export default function BooksTable({ books }) {
  const [expandedRow, setExpandedRow] = useState(null);

  const toggleRow = (idx) => {
    setExpandedRow(expandedRow === idx ? null : idx);
  };

  if (!books || books.length === 0) {
    return (
      <main>
        <div className="overflow-x-auto">
          <table className="w-full rounded-lg overflow-hidden border">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2">#</th>
                <th className="p-2">ISBN</th>
                <th className="p-2">Title</th>
                <th className="p-2">Author(s)</th>
                <th className="p-2">Likes</th>
                <th className="p-2">Reviews</th>
                <th className="p-2">Publisher</th>
              </tr>
            </thead>
          </table>
          <p className="text-gray-500 text-center mt-4">
            No books generated yet.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main>
      <div className="overflow-x-auto">
        <table className="w-full rounded-lg text-center overflow-hidden">
          <thead className="bg-gray-100">
            <tr className="text-zinc-600">
              <th className="p-2">#</th>
              <th className="p-2">ISBN</th>
              <th className="p-2">Title</th>
              <th className="p-2">Author(s)</th>
              <th className="p-2">Likes</th>
              <th className="p-2">Reviews</th>
              <th className="p-2">Publisher</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book, idx) => (
              <>
                {/* Main row */}
                <tr
                  key={idx}
                  className="hover:bg-blue-100 cursor-pointer border-y border-zinc-200"
                  onClick={() => toggleRow(idx)}
                >
                  <td className="p-2"><IoIosArrowDown />{idx + 1}</td>
                  <td className="p-2">{book.isbn}</td>
                  <td className="p-2">{book.title}</td>
                  <td className="p-2">{book.author}</td>
                  <td className="p-2">{book.likes}</td>
                  <td className="p-2">{book.reviews?.length || 0}</td>
                  <td className="p-2">{book.publisher}</td>
                </tr>

                {/* Expanded row */}
                {expandedRow === idx && (
                  <tr>
                    <td colSpan={7} className="bg-gray-50 p-4 text-left">
                      <div className="flex gap-4">
                        {/* Simulated book image */}
                        <img
                          src={`https://picsum.photos/seed/${book.isbn}/120/160`}
                          alt="Book Cover"
                          className="rounded border"
                        />
                        <div>
                          <h3 className="text-lg font-semibold mb-2">{book.title}</h3>
                          <p><strong>Author:</strong> {book.author}</p>
                          <p><strong>Publisher:</strong> {book.publisher}</p>
                          <p><strong>ISBN:</strong> {book.isbn}</p>

                          {/* Reviews */}
                          <div className="mt-4">
                            <h4 className="font-semibold">Reviews:</h4>
                            {book.reviews.length > 0 ? (
                              <ul className="list-disc list-inside">
                                {book.reviews.map((r, i) => (
                                  <li key={i}>
                                    <strong>{r.author}:</strong> {r.text}
                                  </li>
                                ))}
                              </ul>
                            ) : (
                              <p className="text-gray-500 italic">No reviews available.</p>
                            )}
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
