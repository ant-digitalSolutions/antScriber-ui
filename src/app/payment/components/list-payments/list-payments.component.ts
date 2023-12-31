import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { InvoiceDto } from '../../dtos/invoice.dto';
import { PaymentService } from '../../services/payment.service';
import { GoogleAnalyticsService } from 'ngx-google-analytics';
import { NgxSpinnerService } from 'ngx-spinner';

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
    protected $gaService: GoogleAnalyticsService,
    private spinner: NgxSpinnerService,
  ) {}

  ngOnInit(): void {
    this.listInvoices();
    this.$gaService.event('list_payments', 'load_main_page');
  }

  listInvoices() {
    this.spinner.show();
    this._paymentService.listInvoices().subscribe((r) => {
      if (r.success) {
        this.invoiceList = r.data;
        this.dataSource = new MatTableDataSource<InvoiceDto>(this.invoiceList);
      }

      this.loading = false;
      this.spinner.hide()
    });
  }

  goToStripeCustomerPortal() {
    const session = this._paymentService.createCustomerPortalSession().subscribe(r => {
      if (r.success) {
        window.open(r.data, "_blank");
      }
    });
    console.log(JSON.stringify(session));
  }
}
