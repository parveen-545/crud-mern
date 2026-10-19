import { useEffect, useState } from "react";
import BookBaseURL from "./axiosInstance";

const Home = () => {
  // ✅ 1. initialFormState को सबसे ऊपर रखा ताकि स्टेट को ये मिल सके
const initialFormState = {
  BookName: "",
  BookTitle: "",
  Author: "",
  SellingPrice: "",
  PublishDate: new Date().toISOString().split('T')[0] // ⚡ [0] लगाना ज़रूरी है
};


  const [bookForm, setBookForm] = useState(initialFormState);
  const [allBooks, setAllBooks] = useState([]);

  // editing/updating status
  const [isEditing, setIsEditing] = useState(false);
  const [editBookId, setEditBookId] = useState(null);

  const fetchAllBooks = async () => {
    try {
      const response = await BookBaseURL.get('/getbooks');
      setAllBooks(response.data.data);
    } catch (error) {
      console.log(error, "error fetching books");
    }
  };

  useEffect(() => {
    fetchAllBooks();
  }, []);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setBookForm((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // submit and update both control
  const handleSubmit = async () => {
    try {
      if (isEditing) {
        const res = await BookBaseURL.put(`/updatebook/${editBookId}`, bookForm);
        console.log(res.data);
        alert('book updated successfully...');
        setIsEditing(false);
        setEditBookId(null);
      } else {
        const data = await BookBaseURL.post('/addbook', bookForm);
        console.log(data);
        alert("book added successfully...");
      }
      setBookForm(initialFormState);
      fetchAllBooks();
    } catch (error) {
      console.log(error, "bhai koi to error hai ");
    }
  };

  // ✅ 2. इस फ़ंक्शन में डेट फॉर्मेट और वैल्यू असाइनमेंट को एकदम सही किया
  const handleEditClick = (book) => {
    setIsEditing(true);
    setEditBookId(book._id);

    // HTML डेट इनपुट (YYYY-MM-DD) के लिए फ़ॉर्मेटिंग
    let formatDate = "";
    if (book.PublishDate) {
      formatDate = book.PublishDate.includes('T') 
        ? book.PublishDate.split('T')[0] 
        : new Date(book.PublishDate).toISOString().split('T')[0];
    }

    setBookForm({
      BookName: book.BookName || "",
      BookTitle: book.BookTitle || "",
      Author: book.Author || "",
      SellingPrice: book.SellingPrice || "",
      PublishDate: formatDate
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Bhai, kya sach me aap book delete karna chahte ho?")) {
      try {
        const res = await BookBaseURL.delete(`/deletebook/${id}`);
        console.log(res.data.message);
        alert("book deleted successfully...");
        setAllBooks((prevBooks) => prevBooks.filter((book) => book._id !== id));
        await fetchAllBooks();
      } catch (error) {
        console.log(error, "delete karne me kuch error hai...");
      }
    }
  };

  return (
    <div className="w-full px-8 min-h-[calc(100vh - 69px)]">
      {isEditing && (
        <div className="mt-4 p-2 bg-yellow-100 text-yellow-800 rounded flex justify-between items-center">
          <span>you are currently editing a book.</span>
          <button
            className="text-xs bg-yellow-200 text-yellow-900 px-3 py-1 rounded hover:bg-yellow-300 transition-all"
            onClick={() => {
              setIsEditing(false);
              setEditBookId(null);
              setBookForm(initialFormState);
            }}
          >
            Cancel Edit
          </button>
        </div>
      )}

      <div className="w-full grid grid-cols-5 gap-5 mt-8 mb-4">
        <div className="w-full flex flex-col gap-4">
          <label>Book Name</label>
          <input type="text" placeholder="Book Name" className="text-[14px] px-2 w-full border border-gray-400 rounded-sm h-8"
            name="BookName"
            value={bookForm.BookName}
            onChange={handleFormChange}
          />
        </div>
        <div className="w-full flex flex-col gap-4">
          <label>Book Title</label>
          <input type="text" placeholder="Book Title" className="text-[14px] px-2 w-full border border-gray-400 rounded-sm h-8"
            name="BookTitle"
            value={bookForm.BookTitle}
            onChange={handleFormChange}
          />
        </div>
        <div className="w-full flex flex-col gap-4">
          <label>Author</label>
          <input type="text" placeholder="Author" className="text-[14px] px-2 w-full border border-gray-400 rounded-sm h-8"
            name="Author"
            value={bookForm.Author}
            onChange={handleFormChange}
          />
        </div>
        <div className="w-full flex flex-col gap-4">
          <label>Selling Price</label>
          <input type="text" placeholder="Selling Price" className="text-[14px] px-2 w-full border border-gray-400 rounded-sm h-8"
            name="SellingPrice"
            value={bookForm.SellingPrice}
            onChange={handleFormChange}
          />
        </div>
        <div className="w-full flex flex-col gap-4">
          <label>Publish Date</label>
          <input type="date" placeholder="Publish Date" className="text-[14px] px-2 w-full border border-gray-400 rounded-sm h-8"
            name="PublishDate"
            value={bookForm.PublishDate}
            onChange={handleFormChange}
          />
        </div>
      </div>

      {/* ✅ 3. 'Update Book' बटन का स्टाइल विज़िबल (visible) किया */}
      <div className="flex justify-end mt-4">
        <button className={`${isEditing ? 'bg-yellow-500 text-white hover:bg-yellow-600' : 'bg-gray-200 text-black hover:bg-gray-300'} p-2 px-6 rounded font-semibold transition-all`}
          onClick={handleSubmit}
        >
          {isEditing ? "Update Book" : "Submit"}
        </button>
      </div>

      <div className="w-full h-full mt-6">
        <table className="w-full bg-white divide-amber-50">
          <thead className="bg-gray-50 border-b-1 border-gray-200">
            <tr className="text-center">
              <th className="tracking-wider px-6 py-3 text-left">Book Name</th>
              <th className="tracking-wider px-6 py-3 text-left">Book Title</th>
              <th className="tracking-wider px-6 py-3 text-left">Author</th>
              <th className="tracking-wider px-6 py-3 text-left">Selling Price</th>
              <th className="tracking-wider px-6 py-3 text-left">Publish Date</th>
              <th className="tracking-wider px-6 py-3 text-right">Action</th>
            </tr>
          </thead>

          <tbody>
            {allBooks.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-4 text-red-500 text-center">
                  No Books found in the store...
                </td>
              </tr>
            ) : (
              allBooks.map((book) => (
                <tr className="text-left" key={book._id}>
                  <td className="p-3 border-b-1 border-gray-200">{book.BookName}</td>
                  <td className="p-3 border-b-1 border-gray-200">{book.BookTitle}</td>
                  <td className="p-3 border-b-1 border-gray-200">{book.Author}</td>
                  <td className="p-3 border-b-1 border-gray-200">{book.SellingPrice}</td>
                  <td className="p-3 border-b-1 border-gray-200">
                    {new Date(book.PublishDate).toLocaleDateString('en-GB')}
                  </td>
                  <td className="p-3 flex gap-2 border-b-1 border-gray-200 justify-end">
                    {/* ✅ 4. यहाँ फ़ंक्शन का नाम सुधार कर handleEditClick(book) किया */}
                    <button
                      className="bg-blue-600 text-white px-3 py-1 rounded-sm text-xs font-semibold hover:bg-blue-700 active:scale-95 transition-all"
                      onClick={() => handleEditClick(book)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded-sm text-xs font-semibold hover:bg-red-600 active:scale-95 transition-all"
                      onClick={() => handleDelete(book._id)}
                    >
                      Delete
                    </button>
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

export default Home;
