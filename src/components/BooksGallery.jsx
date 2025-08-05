export default function BooksGallery({ books }) {
  if (!books || books.length === 0) {
    return <p className="text-center mt-4 text-gray-500">No books generated yet.</p>;
  }

  return (
    <main className="p-4">
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {books.map((book, idx) => (
          <div key={idx} className="border rounded shadow hover:shadow-lg transition bg-white">
            <img
              src={`https://picsum.photos/seed/${book.isbn}/200/280`}
              alt={book.title}
              className="rounded-t w-full h-40 object-cover"
            />
            <div className="p-3">
              <h3 className="font-semibold text-sm mb-1">{book.title}</h3>
              <p className="text-xs text-gray-600">{book.author}</p>
              <p className="text-xs mt-1">Likes: {book.likes}</p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
