import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UrlParameterStandardI } from 'src/app/model/generalParameter.interface';
import { Product, ProductResponseI } from 'src/app/model/product.interface';
import { LoginService } from 'src/app/services/auth/login.service';
import { ProductoService } from 'src/app/services/fcpc/producto.service';
import Swal from 'sweetalert2';
// import { LazyLoadEvent } from "primeng/api";

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css'],
})
export class ProductoComponent implements OnInit, OnDestroy {
  page: number = 1;
  pageSize: number = 5;
  collectionSize: number = 0;
  @Input() objGetProductos: Product[] = [];

  disabled = true;

  productoForm: Product = {
    id: 0,
    nombre: '',
    descripcion: '',
    categoria: '',
    codigo: '',
    stock: 0,
    precio: '',
  };

  //formularios
  formGroupProductos = this.fb.group({
    fcn_nombre: ['', [Validators.required]],
    fcn_descripcion: ['', [Validators.required]],
    fnc_codigo: ['', [Validators.required]],
    fnc_stock: ['', [Validators.required]],
    fnc_precio: ['', [Validators.required]],
    fcn_categoria: ['', [Validators.required]],
  });

  userLoginOn: boolean = true;
  constructor(
    private loginService: LoginService,
    private productoService: ProductoService,
    private router: Router,
    private fb: FormBuilder
  ) {
    // this.validateForm();
    this.productos();
  }

  // validateForm()
  // {
  //   return this.formGroupProductos = this.fb.group({
  //     nombre: ["", [Validators.required]],
  //   });
  // }
  get f() {
    return this.formGroupProductos.controls;
  }

  ngOnDestroy(): void {
    this.loginService.currentUserLogiOn.unsubscribe();
  }

  ngOnInit(): void {
    this.loginService.currentUserLogiOn.subscribe({
      next: (dataUserLoginOn) => {
        console.log(1 + '' + dataUserLoginOn);
        this.userLoginOn = dataUserLoginOn;
      },
    });
  }

  productos() {
    // this.loading = true;
    let parameterUrl: UrlParameterStandardI = {
      page: this.page,
      size: this.pageSize, // this.rows,
      sort: 'id',
      type_sort: 'desc',
    };

    this.productoService.getProductPaginate(parameterUrl).subscribe({
      next: (rpt: ProductResponseI) => {
        // console.log(rpt);
        this.objGetProductos = rpt.data;
        this.collectionSize = rpt.total;
      },
      error: (e) => {
        console.log(e);
        // this.loading = false;
      },
    });
  }

  loadPage(page: number) {
    this.productos();
  }

  dataPersonRow(data: Product) {
    // console.log(data);
    this.productoForm = data;
    this.disabled = false;/* !this.disabled */;
  }

  guardarProducto() {
    Swal.fire({
      title: 'Esta seguro de guardar producto?',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: 'Guardar',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.confirmarSave();
      } else if (result.isDenied) {
        this.cancelarProducto();
        Swal.fire(
          'accion cancelada, los datos feuron borrados del formulario',
          '',
          'info'
        );
      }
    });
  }

  confirmarSave() {
    if (this.formGroupProductos.valid) {
      let data = {
        id: 0,
        nombre: this.formGroupProductos.get('fcn_nombre')?.value,
        descripcion: this.formGroupProductos.get('fcn_descripcion')?.value,
        categoria: this.formGroupProductos.get('fcn_categoria')?.value,
        codigo: this.formGroupProductos.get('fnc_codigo')?.value,
        stock: this.formGroupProductos.get('fnc_stock')?.value,
        precio: this.formGroupProductos.get('fnc_precio')?.value,
      };
      this.productoService.saveProducto(data as any).subscribe({
        next: (rpt) => {
          this.productos();
          // console.log(rpt);
        },
        error: (errorData) => {
          console.log(errorData);
          // this.loginError = errorData?.error?.detail;
        },
        complete: () => {
          this.formGroupProductos.reset();
          this.formGroupProductos.get('fcn_categoria')?.setValue('');
          Swal.fire('Guardado!', '', 'success');
        },
      });
    } else {
      this.formGroupProductos.markAllAsTouched();
    }
  }

  decimalFilter(event: any) {
    const reg = /^-?\d*(\.\d{0,2})?$/;
    let input = event.target.value + String.fromCharCode(event.charCode);

    if (!reg.test(input)) {
      event.preventDefault();
    }
  }

  selection(event: any) {
    console.log(event.target.value);
    // let option = event.target.value;
  }

  cancelarProducto() {
    this.formGroupProductos.reset();
    this.formGroupProductos.get('fcn_categoria')?.setValue('');
    this.disabled = !this.disabled;
  }

  deleteProductRow(data: Product) {
    Swal.fire({
      title: 'Esta seguro de borrar producto?',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: 'Borrar',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.deleteProduct(data);
      } else if (result.isDenied) {
        this.cancelarProducto();
        Swal.fire('Accion cancelada', '', 'info');
      }
    });
  }

  deleteProduct(data: Product) {
    this.productoService.deleteProducto(data).subscribe({
      next: (rpt) => {
        this.productos();
        // console.log(rpt);
      },
      error: (errorData) => {
        console.log(errorData);
        // this.loginError = errorData?.error?.detail;
      },
      complete: () => {
        this.formGroupProductos.reset();
        this.formGroupProductos.get('fcn_categoria')?.setValue('');
        Swal.fire('Producto Borrado!', '', 'success');
      },
    });
  }

  editarProducto() {
    if (this.formGroupProductos.valid) {
      Swal.fire({
        title: 'Esta seguro de editar producto?',
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: 'Editar',
        denyButtonText: `Cancelar`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          this.confirmarEdit();
        } else if (result.isDenied) {
          this.cancelarProducto();
          Swal.fire(
            'Accion cancelada, los datos feuron borrados del formulario',
            '',
            'info'
          );
        }
      });
    } else {
      this.formGroupProductos.markAllAsTouched();
    }
  }

  confirmarEdit() {
    let data = {
      id: this.productoForm.id,
      nombre: this.formGroupProductos.get('fcn_nombre')?.value,
      descripcion: this.formGroupProductos.get('fcn_descripcion')?.value,
      categoria: this.formGroupProductos.get('fcn_categoria')?.value,
      codigo: this.formGroupProductos.get('fnc_codigo')?.value,
      stock: this.formGroupProductos.get('fnc_stock')?.value,
      precio: this.formGroupProductos.get('fnc_precio')?.value,
    };
    this.productoService.updateProducto(data as any).subscribe({
      next: (rpt) => {
        this.productos();
        // console.log(rpt);
      },
      error: (errorData) => {
        console.log(errorData);
        // this.loginError = errorData?.error?.detail;
      },
      complete: () => {
        this.formGroupProductos.reset();
        this.formGroupProductos.get('fcn_categoria')?.setValue('');
        Swal.fire('Producto Editado!', '', 'success');
      },
    });
  }
  /**
   * get
   */

  get fcn_nombre() {
    return this.formGroupProductos.controls.fcn_nombre;
  }
  get fcn_descripcion() {
    return this.formGroupProductos.controls.fcn_nombre;
  }
  get fnc_codigo() {
    return this.formGroupProductos.controls.fnc_codigo;
  }
  get fnc_stock() {
    return this.formGroupProductos.controls.fnc_stock;
  }
  get fnc_precio() {
    return this.formGroupProductos.controls.fnc_precio;
  }
  get fcn_categoria() {
    return this.formGroupProductos.controls.fcn_categoria;
  }
}
