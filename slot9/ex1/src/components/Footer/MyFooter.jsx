
import Button from "react-bootstrap/Button";
import "./Footer.css";

function MyFooter({ author, email, linkGithub }) {
    return (
        <footer>
            <p>Author: {author}</p>
            <p>Created by: {email} </p>
            <p>&copy; {new Date().getFullYear()} Đoàn Quang Huy. All rights reserved </p>
            <Button variant="link" href="https://github.com/huydoan19102005/code" >My Link Github: {linkGithub}</Button>
        </footer>
    )
}
export default MyFooter;