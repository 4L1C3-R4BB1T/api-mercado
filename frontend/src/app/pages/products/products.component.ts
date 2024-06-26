import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NavigationEnd, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { ConfirmDialogComponent } from 'src/app/components/confirm-dialog/confirm-dialog.component';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  private routerSubscription: Subscription | undefined;

  displayedColumns: string[] = ['id', 'name', 'description', 'price', 'stock', 'category', 'actions'];
  dataSource = new MatTableDataSource<Product>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private service: ProductService,
    private toast: ToastrService,
    private router: Router,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.findAll();
    this.routerSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd && this.router.url === '/products') {
        this.findAll();
      }
    });
  }

  ngOnDestroy(): void {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }

  findAll() {
    this.service.findAll().subscribe(response => {
      response.sort((a, b) => parseInt(a.id) - parseInt(b.id));
      this.dataSource.data = response;
      this.dataSource.paginator = this.paginator;
    });
  }

  delete(id: string): void {
    this.service.delete(id).subscribe(() => {
      this.findAll();
      this.toast.success('Produto deletado com sucesso!', 'Delete');
      this.router.navigate(['products']);
    }, ex => {
      if (ex.error.errors) {
        ex.error.errors.forEach((element: any) => {
          this.toast.error(element);
        });
      } else {
        this.toast.error(ex.error);
      }
    })
  }

  openDialog(id: string): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, { width: '350px', height: '160px', data: { id } });
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) this.delete(id);
    });
  }

}
