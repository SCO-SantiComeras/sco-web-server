import { Component, OnDestroy, OnInit } from '@angular/core';
import { ScoPdfViewerService, ScoSpinnerService } from 'sco-angular-components';

@Component({
  template: ''
})
export class PdfExampleComponent implements OnInit, OnDestroy {

  constructor(
    private readonly pdfViewerService: ScoPdfViewerService,
    private readonly spinnerService: ScoSpinnerService,
  ) { }

  ngOnInit(): void {
    this.spinnerService.showSpinner();
    
    this.pdfViewerService.loadPdf({
      pdfSrc: 'https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf',
      isBase64: false,
      fileName: 'vadimdez_pdf_viewer.pdf',
      startPage: undefined,
      showTotalPages: true,
      canDownload: true,
    });
  }

  ngOnDestroy(): void {
    this.pdfViewerService.unLoadPdf();
  }
}
