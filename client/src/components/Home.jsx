import { useEffect, useState } from "react";
import BookBaseURL from "./axiosInstance";

const Home = () => {

  const [bookForm, setBookForm] = useState({
    BookName: "",
    BookTitle: "",
    Author: "",
    SellingPrice: "",
    PublishDate: new Date().toISOString().split('T')[0]
  })

  const [allBooks, setAllBooks] = useState([])

  const fetchAllBooks = async () => {
    try {
      const response = await BookBaseURL.get('/getbooks')
      setAllBooks(response.data.data)
    }

    catch (error) {
      console.log(error, "error fetching books")
    }
  }

  useEffect(() => {
    fetchAllBooks()
  }, [])

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setBookForm((prev) => (
      {
        ...prev,
        [name]: value
      }
    ))
  }

  const handleSubmit = async () => {
    try {
      const data = await BookBaseURL.post("/addbook", bookForm)
      console.log(data)
      alert("book added successfully")
      fetchAllBooks()
    } catch (error) {
      console.log(error, "bhai koi to error hai ")
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm("Bhai, kya sach me aap book delete karna chahte ho?"));
    try {
      const res = await BookBaseURL.delete(`/deletebook/${id}`);
      console.log(res.data.message)
      alert("book deleted successfully...")

      setAllBooks((prevBooks) => prevBooks.filter((book) => book.id !== id))

       await fetchAllBooks()
    } catch (error) {
      console.log(error, "delete karne me kuch error hai...")
    }
  }

  return (
    <div className="w-full px-8 min-h-[calc(100vh - 69px)]">
      <div className="w-full grid grid-cols-5 gap-5 mt-8 mb-4">
        <div className="w-full flex flex-col gap-4">
          <label>Book Name</label>
          <input type="text" placeholder="Book Name" className="text-[14px] px-2 w-full border border-gray-400 rounded-sm  h-8"
            name="BookName"
            value={bookForm.BookName}
            onChange={handleFormChange}
          />
        </div>
        <div className="w-full flex flex-col gap-4">
          <label>Book Title</label>
          <input type="text" placeholder="Book Title" className="text-[14px] px-2 w-full border border-gray-400 rounded-sm  h-8"
            name="BookTitle"
            value={bookForm.BookTitle}
            onChange={handleFormChange}
          />
        </div>
        <div className="w-full flex flex-col gap-4">
          <label>Author</label>
          <input type="text" placeholder="Author" className="text-[14px] px-2 w-full border border-gray-400 rounded-sm  h-8"
            name="Author"
            value={bookForm.Author}
            onChange={handleFormChange}
          />
        </div>
        <div className="w-full flex flex-col gap-4">
          <label>Selling Price</label>
          <input type="text" placeholder="Selling Price" className="text-[14px] px-2 w-full border border-gray-400 rounded-sm  h-8"
            name="SellingPrice"
            value={bookForm.SellingPrice}
            onChange={handleFormChange} />
        </div>
        <div className="w-full flex flex-col gap-4">
          <label>Publish Date</label>
          <input type="date" placeholder="Publish Date" className="text-[14px] px-2 w-full border border-gray-400 rounded-sm  h-8"
            name="PublishDate"
            value={bookForm.PublishDate}
            onChange={handleFormChange}
          />
        </div>
      </div>

      <div className="flex justify-end">
        <button className="bg-gray-200 p-2 px-4 rounded-md"
          onClick={handleSubmit}
        >Submit</button>
      </div>

      <div className="w-full h-full mt-6">
        <table className="w-full bg-white divide-amber-50">
          <thead className="bg-gray-50  border-b-1 border-gray-200">
            <tr className="text-center">
              <th className="tracking-wider px-6 py-3">Book Name</th>
              <th className="tracking-wider px-6 py-3">Book Title</th>
              <th className="tracking-wider px-6 py-3">Author</th>
              <th className="tracking-wider px-6 py-3">Selling Price</th>
              <th className="tracking-wider px-6 py-3">Publish Date</th>
              <th className="tracking-wider px-6 py-3">Action</th>
            </tr>
          </thead>

          <tbody>

            {
              allBooks.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-4 text-red-500">
                    No Books found in the store...
                  </td>
                </tr>
              ) :

                (
                  allBooks.map((book) => (
                    <tr className="text-center" key={book._id}>
                      <td className=" p-3  border-b-1 border-gray-200">{book.BookName}</td>
                      <td className=" p-3  border-b-1 border-gray-200">{book.BookTitle}</td>
                      <td className=" p-3  border-b-1 border-gray-200">{book.Author}</td>
                      <td className=" p-3  border-b-1 border-gray-200">{book.SellingPrice}</td>
                      <td className=" p-3  border-b-1 border-gray-200">
                        {new Date(book.PublishDate).toLocaleDateString('en-GB')}
                      </td>
                      <td className=" p-3  border-b-1 border-gray-200">
                        <button
                          className="bg-red-500 text-white px-3 py-1 rounded-sm text-xs font-semibold hover:bg-red-600 active:scale-95 transition-all"
                          onClick={() => handleDelete(book._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>

                  ))
                )
            }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
