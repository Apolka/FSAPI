import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable, Subject } from 'rxjs';
import { Document } from '../models/document.model';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  documents: Observable<string[]> = this.socket.fromEvent<string[]>('documents');
  // documents: Subject<string[]>
  currentDocument: Observable<Document> = this.socket.fromEvent<Document>('document');

  constructor(private socket: Socket) { }

  newDocument() {
    const doc = {id: DocumentService.docId(), doc: ''};
    this.socket.emit('addDoc', doc);

    /*
    this.socket.on('documents', (docIds: string[]) => {   // ha fent a documents-et observable helyett subject-re írjuk át, ez kell a kitörölt fél sor helyett
      this.documents.next(docIds);
    })
    */
  }

  getDocument(docId: string) {
    this.socket.emit('getDoc', docId);
  }

  editDocument(doc: Document) {
    this.socket.emit('editDoc', doc);
  }

  private static docId() {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < 5; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
  }
}


