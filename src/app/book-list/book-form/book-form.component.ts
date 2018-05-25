import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BooksService} from '../../services/books.service';
import {Router} from '@angular/router';
import {Book} from '../../models/book.model';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.scss']
})
export class BookFormComponent implements OnInit {

  bookForm: FormGroup;
  imageUrl: string;
  imageIsUploading = false;
  imageUploaded = false;

  constructor(private formBuilder: FormBuilder,
              private booksService: BooksService,
              private router: Router) {
  }

  ngOnInit() {
    this.initForm();
  }

  private initForm() {
    this.bookForm = this.formBuilder
      .group({
        title: ['', Validators.required],
        author: ['', Validators.required],
        synopsis: ''
      });
  }

  onSaveBook() {
    const title = this.bookForm.get('title').value;
    const author = this.bookForm.get('author').value;
    const synopsis = this.bookForm.get('synopsis').value;
    const newBook = new Book(title, author);
    newBook.sysnopsis = synopsis;
    if (this.imageUrl && this.imageUrl !== '') {
      newBook.photo = this.imageUrl;
    }
    this.booksService.createBook(newBook);
    this.router.navigate(['/books']);
  }

  detectImage(event) {
    this.onUploadImage(event.target.files[0]);
  }

  onUploadImage(image: File) {
    this.imageIsUploading = true;
    this.imageUploaded = false;
    this.imageUrl = '';
    this.booksService.uploadImage(image)
      .then((url: string) => {
        this.imageUrl = url;
        this.imageIsUploading = false;
        this.imageUploaded = true;
      });
  }
}
