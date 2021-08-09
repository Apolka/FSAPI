import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DocumentService } from 'src/app/services/document.service';

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.scss']
})
export class DocumentListComponent implements OnInit {
  // documents: string[] | undefined;
  documents: Observable<string[]> | undefined;
  currentDocId: string | undefined;

  constructor(private documentService: DocumentService) { }

  ngOnInit(): void {
    // this.documentService.documents.subscribe(docIds => this.documents = docIds);
    this.documents = this.documentService.documents;  // a felette lévő sor helyett ez is elég, ha a documents observable
    this.documentService.currentDocument
     .subscribe(doc => this.currentDocId = doc.id)
  }

  // when add doc is clicked
  newDoc() {
    this.documentService.newDocument();
  }

  // when doc is selected
  loadDoc(id: string) {
    this.documentService.getDocument(id);
  }

}
