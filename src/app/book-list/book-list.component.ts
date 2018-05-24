import {Component, OnDestroy, OnInit} from '@angular/core';
import {Book} from '../models/book.model';
import {Subscription} from 'rxjs';
import {BooksService} from '../services/books.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit, OnDestroy {

  books: Book[];
  booksSubscription: Subscription;

  constructor(private booksService: BooksService,
              private router: Router) {
  }

  ngOnInit() {
    this.booksService.getBooks();
    this.booksSubscription = this.booksService.booksSuject.subscribe(
      (books: Book[]) => {
        this.books = books;
      }
    );
    this.booksService.emitBook();
  }

  ngOnDestroy() {
    this.booksSubscription.unsubscribe();
  }

  onAddBook() {
    this.router.navigate(['/books', 'new']);
  }

  onDeleteBook(book: Book) {
    this.booksService.removeBook(book);
  }

  onViewBook(id: number) {
    this.router.navigate(['/books', 'view', id]);
  }
}
