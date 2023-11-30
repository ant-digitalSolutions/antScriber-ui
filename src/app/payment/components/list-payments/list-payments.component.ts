import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { InvoiceDto } from '../../dtos/invoice.dto';
import { PaymentService } from '../../services/payment.service';
import { GoogleAnalyticsService } from 'ngx-google-analytics';

@Component({
  selector: 'app-list-payments',
  templateUrl: './list-payments.component.html',
  styleUrls: ['./list-payments.component.scss'],
})
export class ListPaymentsComponent implements OnInit {
  loading = true;

  invoiceList: InvoiceDto[] | undefined;

  displayedColumns: string[] = ['status', 'date', 'amount', 'details'];

  dataSource: MatTableDataSource<InvoiceDto>;

  constructor(
    private _paymentService: PaymentService,
    protected $gaService: GoogleAnalyticsService
  ) {}

  ngOnInit(): void {
    this.listInvoices();
    this.$gaService.event('list_payments', 'load_main_page');
  }

  listInvoices() {
    this._paymentService.listInvoices().subscribe((r) => {
      if (r.success) {
        this.invoiceList = r.data;
        this.dataSource = new MatTableDataSource<InvoiceDto>(this.invoiceList);
      }

      this.loading = false;
    });
  }
}
