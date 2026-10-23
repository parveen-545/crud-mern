import axios from 'axios';

// 1. Book Base URL
export const BookBaseURL = axios.create({
    baseURL: "http://localhost:8000/book/",
});

// 2. User Base URL
export const UserBaseURL = axios.create({
    baseURL: "http://localhost:8000/user/",
});

// Purana "export default BookBaseURL" agar niche laga hai toh use hata dein, 
// ya fir aap dono ko ek sath niche aise bhi export kar sakte hain:
// export { BookBaseURL, UserBaseURL };
