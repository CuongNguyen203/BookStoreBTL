import { useState, useEffect } from "react";
import ConfirmMenu from "../ConfirmMenu";
import { Link } from "react-router-dom";
import { GetToken, IsLogged } from "../JWTToken";
import "bootstrap/dist/css/bootstrap.min.css";

const AdminHome = () => {
    const isLogger = IsLogged();
    const [books, setBooks] = useState([]);
    const [booksPlus, setBooksPlus] = useState([]);
    const [confirmObject, setConfirmObject] = useState({ state: false });
    const [text, setText] = useState("");
    const [refreshData, setRefreshData] = useState(false);
    const confirmDel = (book) => {
        setConfirmObject({
            title: "Xóa sách",
            str1: "Bạn có chắc chắn xóa sách?",
            str2: "\"" + book.title + "\" sẽ bị xóa khỏi csdl",
            state: true,
            act: () => delBook(book.id),
        });
    };
    const delBook = async (id) => {
        await fetch(`http://localhost:8080/admin/book/delete/${id}`, { 
            method: 'DELETE' ,
            headers:{
                'Authorization' : `Bearer ${GetToken()}`,
            }
        });
        setRefreshData(!refreshData);
    };
    useEffect(() => {
        document.title = "Admin";
        fetch(`http://localhost:8080`)
            .then((res) => res.json())
            .then((book) => {
                setBooks(book);
                setBooksPlus(book);
            });
    }, [refreshData]);
    useEffect(() => {
        setBooks(
            booksPlus.filter(
                (book) =>
                    book.author.toLowerCase().includes(text.toLowerCase()) ||
                    book.title.toLowerCase().includes(text.toLowerCase())
            )
        );
        // eslint-disable-next-line
    }, [text]);
    return (
        <div className="container">
            {confirmObject.state && <ConfirmMenu obj={confirmObject} setObj={setConfirmObject} />}
            {!isLogger && <Link to={"/admin/login"} className="btn btn-outline-info mx-2 bi bi-person-vcard admin-login-btn">&nbsp;Đăng nhập</Link>}
            <h1 className="display-3">Quản Lý Sách</h1>
            <input onChange={(e) => setText(e.target.value)} type="text" className="form-control search-bar-admin" placeholder="Tìm kiếm sách theo từ khóa trong tên sách hoặc tác giả" />
            <table className="table table-striped table-bordered">
                <thead className="cus-thead">
                    <tr>
                        <th>Tên sách </th>
                        <th>Tác giả </th>
                        <th>Thể loại</th>
                        <th>Ngày phát hành </th>
                        <th>Số trang</th>
                        <th>Đã bán</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {books.map((book) => (
                        <tr key={book.id}>
                            <td>{book.title}</td>
                            <td>{book.author}</td>
                            <td>{book.category}</td>
                            <td>{book.releaseDate.split("-").reverse().join("-")}</td>
                            <td>{book.totalPage === 0 ? null : book.totalPage}</td>
                            <td>{book.sold}</td>
                            <td>
                                {
                                    isLogger &&
                                    <div>
                                        <Link to={"/admin/book/edit/" + book.id} className="btn btn-outline-primary mx-2">Xem</Link>
                                        <button className="btn btn-outline-danger" onClick={() => confirmDel(book)}>Xóa</button>
                                    </div>
                                }
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default AdminHome;