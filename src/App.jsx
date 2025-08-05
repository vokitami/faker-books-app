import { useState, useEffect, useRef } from 'react';
import BooksTable from './components/BooksTable.jsx';
import BooksGallery from './components/BooksGallery.jsx'; // <- new vist
import { TbArrowsExchange } from "react-icons/tb";
import { CSVLink } from "react-csv"; // <- CSV export

function App() {
  const [language, setLanguage] = useState('en-US');
  const [seed, setSeed] = useState('');
  const [likes, setLikes] = useState(5);
  const [reviews, setReviews] = useState(0); 
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(1);
  const [viewMode, setViewMode] = useState('table'); // "table" o "gallery"

  const generateSeed = () => {
    const randomSeed = Math.floor(Math.random() * 100000).toString();
    setSeed(randomSeed);
  };

  const fetchBooks = async (pageNum) => {
    const res = await fetch(
      `http://localhost:5000/api/books?lang=${language}&seed=${seed}&likes=${likes}&reviews=${reviews}&page=${pageNum}`
    );
    const data = await res.json();
    if (pageNum === 1) {
      setBooks(data);
    } else {
      setBooks((prev) => [...prev, ...data]);
    }
  };

  const observerRef = useRef(null);

  // Scroll infinito
  useEffect(() => {
    observerRef.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setPage((prev) => {
          const nextPage = prev + 1;
          fetchBooks(nextPage);
          return nextPage;
        });
      }
    });
  }, []);

  useEffect(() => {
    const sentinel = document.getElementById("sentinel");
    if (sentinel) observerRef.current.observe(sentinel);
  }, [books]);

  // Llamar fetchBooks cuando cambian filtros
  useEffect(() => {
    fetchBooks(1);
    setPage(1);
  }, [language, seed, likes, reviews]);

  return (
    <>
      {/* HEADER */}
      <header className="bg-zinc-100 text-zinc-700 p-4 shadow rounded-lg flex flex-wrap gap-4 items-center justify-evenly pb-10">

        {/* Language */}
        <select 
          value={language} 
          onChange={(e) => setLanguage(e.target.value)} 
          className="border p-2 rounded bg-white cursor-pointer outline-0">
          <option value="en-US">English (USA)</option>
          <option value="es-MX">Español (México)</option>
          <option value="de-DE">German (Germany)</option>
          <option value="ja-JP">Japanese (Japan)</option>
        </select>

        {/* Seed */}
        <div className="flex gap-2 p-2 border border-zinc-600 rounded-[5px] bg-white">
          <label htmlFor='seed' className='pl-2'>Seed</label>
          <input 
            type="text" 
            className="flex text-center rounded h-[30px] outline-0"
            name='seed'
            value={seed}
            onChange={(e) => setSeed(e.target.value)}
          />
          <button 
            onClick={generateSeed} 
            className="flex justify-center items-center bg-blue-500 text-amber-50 px-4 rounded cursor-pointer hover:bg-blue-600">
            <TbArrowsExchange className='text-[20px] ml-1'/>
          </button>
        </div>

        {/* Likes */}
        <div className="flex flex-col">
          <label>Likes: {likes}</label>
          <input 
            type="range" 
            min="0" 
            max="10" 
            step="1" 
            className="w-32" 
            value={likes} 
            onChange={(e) => setLikes(e.target.value)}
          />
        </div>

        {/* Reviews */}
        <div>
          <label>Reviews:</label>
          <input 
            type="number" 
            step="0.1" 
            className="border p-2 ml-4 rounded w-20 outline-0 bg-white" 
            value={reviews} 
            onChange={(e) => setReviews(parseFloat(e.target.value))}
          />
        </div>

        {/* Botón Exportar CSV */}
        <CSVLink
          data={books}
          filename="books.csv"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Export to CSV
        </CSVLink>

        {/* Botón cambiar vista */}
        <button
          onClick={() => setViewMode(viewMode === 'table' ? 'gallery' : 'table')}
          className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
        >
          {viewMode === 'table' ? 'Gallery View' : 'Table View'}
        </button>

      </header>

      {/* Vista dinámica */}
      {viewMode === 'table' ? (
        <BooksTable books={books.filter(book => book.likes >= likes)} />
      ) : (
        <BooksGallery books={books.filter(book => book.likes >= likes)} />
      )}

      {/* Sentinel */}
      <div id="sentinel" className="h-10"></div>
    </>
  );
}

export default App;
