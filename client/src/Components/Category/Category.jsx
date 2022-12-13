import Accordion from "react-bootstrap/Accordion";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Category.module.css";

const Category = ({ onClose }) => {
  const navigate = useNavigate();
  const onTop = () => {
    window.scrollTo(0, 0);
    onClose();
  };
  return (
    <div className={styles.category}>
      <h1 className={styles.header}>Categories</h1>
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0">
          <Accordion.Header onClick={() => navigate("/myanmar-books")}>
            <span className={styles.catHeader}> Myanamr Books</span>
          </Accordion.Header>
          <Accordion.Body className={styles.details}>
            <ul className={styles.items}>
              <Link
                onClick={onTop}
                className={styles.item}
                to="/myanmar-stories"
              >
                ပုံပြင် စာအုပ်များ
              </Link>
              <Link
                onClick={onTop}
                className={styles.item}
                to="/myanmar-novels"
              >
                ဝတ္ထု စာအုပ်များ
              </Link>
              <Link
                onClick={onTop}
                className={styles.item}
                to="/myanmar-technologies"
              >
                နည်းပညာ စာအုပ်များ
              </Link>
              <Link
                onClick={onTop}
                className={styles.item}
                to="/myanmar-religious"
              >
                သာသာရေး စာအုပ်များ
              </Link>
            </ul>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header onClick={() => navigate("/english-books")}>
            <span className={styles.catHeader}>English Books</span>
          </Accordion.Header>
          <Accordion.Body className={styles.details}>
            <ul className={styles.items}>
              <Link
                onClick={onTop}
                className={styles.item}
                to="/english-stories"
              >
                Story Books
              </Link>
              <Link
                onClick={onTop}
                className={styles.item}
                to="/english-novels"
              >
                Novel Books
              </Link>
              <Link
                onClick={onTop}
                className={styles.item}
                to="/english-technologies"
              >
                Technology Books
              </Link>
              <Link
                onClick={onTop}
                className={styles.item}
                to="/english-religious"
              >
                Religious Books
              </Link>
            </ul>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
};

export default Category;
