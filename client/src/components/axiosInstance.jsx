import axios  from 'axios'

const BookBaseURL = axios.create({
    baseURL: "http://localhost:8080/book/",
})

export default BookBaseURL