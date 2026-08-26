import { Link } from "react-router-dom"

export default function Export() {
    return (
        <aside className="sidebar">
            <h3>vocab.io</h3>
            <nav>
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/exercises">Exercises</Link>
                <Link to="/wordbank">Word Bank</Link>
                <Link to="/profile">See Profile</Link>
                <Link to="/input">Input Text</Link>
            </nav>
        </aside>
    )
}