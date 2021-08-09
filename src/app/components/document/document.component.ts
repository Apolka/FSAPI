import { Component, OnInit } from '@angular/core';
import { DocumentService } from 'src/app/services/document.service';
import { Document } from 'src/app/models/document.model';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.scss']
})
export class DocumentComponent implements OnInit {

  document: Document = {id: '', doc: ''};

  constructor(private documentService: DocumentService) { }

  ngOnInit(): void {
    this.documentService.currentDocument.subscribe(doc => this.document = doc);
  }

  // called on each key up
  editDoc() {
    this.documentService.editDocument(this.document);
  }
}
