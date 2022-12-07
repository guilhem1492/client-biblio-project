import React from "react";
import { useState, useEffect } from "react";
import { useParams, Link, Routes, Route, useNavigate } from "react-router-dom";
import service from "../api/apiHandler";
import BackButton from "../components/BackButton/BackButton";
import Footer from "../components/Footer/Footer";
import ButtonAddFav from "../components/ButtonAddFav/ButtonAddFav";
import "../styles/BookDetails.css";

const BookDetails = () => {
  const [foundBook, setFoundBook] = useState(null);
  const { bookId } = useParams();
  console.log("bookId", bookId);
  console.log("foundBook", foundBook);

  useEffect(() => {
    service.get(`/api/books/${bookId}`).then(({ data }) => {
      console.log(data);
      setFoundBook(data);
    });
  }, [bookId]);

  const navigate = useNavigate();

  return (
    <div className="book-details">
      <BackButton />
      <div className="book-img-and-details">
        {!foundBook && <h3>Ebook non trouvé !</h3>}
        {foundBook && (
          <>
            <img
              className="cover-book-details"
              src={foundBook.formats["image/jpeg"]}
              alt={foundBook.title}
            />
            <ButtonAddFav
              id={bookId}
              isFaved={foundBook.isFaved}
              setFoundBook={setFoundBook}
            />

            <div>
              <h3>{foundBook.title}</h3>
              <p>
                {foundBook.author?.name}({foundBook.author?.birth_year}-
                {foundBook.author?.death_year})
              </p>

              <h4>Sujets du livre (en anglais) :</h4>
              <p>
                {foundBook.subjects.map((subject) => {
                  return <p key={foundBook.id}>{subject}</p>;
                })}
              </p>
              <h4>Ebook :</h4>

              <ul>
                <li>
                  <a href={foundBook.formats["text/html"]} target="_blank">
                    Format HTML
                  </a>
                </li>
                <li>
                  <a
                    href={foundBook.formats["application/epub+zip"]}
                    target="_blank"
                    download
                  >
                    Format ePub à télécharger
                  </a>
                </li>
                <li>
                  <a
                    href={foundBook.formats["application/x-mobipocket-ebook"]}
                    target="_blank"
                    download
                  >
                    Format Mobi à télécharger
                  </a>
                </li>
              </ul>
            </div>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default BookDetails;
