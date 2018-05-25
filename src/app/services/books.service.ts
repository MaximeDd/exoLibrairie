import {Injectable} from '@angular/core';
import {Book} from '../models/book.model';
import {Subject} from 'rxjs';
import * as firebase from 'firebase';
import DataSnapshot = firebase.database.DataSnapshot;

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  books: Book[] = [];
  booksSuject = new Subject<Book[]>();

  emitBook() {
    this.booksSuject.next(this.books);
  }

  getBooks() {
    firebase.database()
      .ref('/books')
      .on('value', (data: DataSnapshot) => {
        const dataValue = data.val();
        this.books = dataValue ? dataValue : [];
        this.emitBook();
      });
  }

  getBook(id: number) {
    return new Promise(
      (resolve, reject) => {
        firebase.database()
          .ref('/books/' + id)
          .once('value')
          .then((data: DataSnapshot) => {
            resolve(data.val());
          }, (error) => {
            reject(error);
          });
      }
    );
  }

  saveBooks() {
    firebase.database()
      .ref('/books')
      .set(this.books);
    this.emitBook();
  }

  createBook(newBook: Book) {
    this.books.push(newBook);
    this.saveBooks();
  }

  removeBook(oldBook: Book) {
    if (oldBook.photo) {
      const storageRef = firebase.storage().refFromURL(oldBook.photo);
      storageRef.delete().then(
        () => {
          console.log('Photo supprimée');
        },
        (error) => {
          console.log('Impossible de supprimer la photo : ' + error);
        }
      );
    }

    const bookIndex = this.books.findIndex(
      (book) => {
        return book === oldBook;
      }
    );
    this.books.splice(bookIndex, 1);
    this.saveBooks();
  }

  uploadImage(image: File) {
    return new Promise(
      (resolve, reject) => {
        const date = Date.now().toString();
        const upload = firebase.storage()
          .ref()
          .child('images/' + date + image.name).put(image);
        upload.on(firebase.storage.TaskEvent.STATE_CHANGED,
          () => {
            console.log('Chargement...');
          },
          (error) => {
            console.log('Erreur de chargement : ' + error);
          },
          () => {
            resolve(upload.snapshot.ref.getDownloadURL());
          });
      }
    );
  }
}
