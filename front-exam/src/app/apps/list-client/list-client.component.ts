import { animate, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TreeNode } from 'primeng/api';
import { TreeTable } from 'primeng/treetable';
import Swal from 'sweetalert2';
import { ClientDTO } from '../common/model/clientDTO';
import { ClientManagementService } from '../common/service/clientManagement.service';
import { ClientListDTO } from '../common/model/clientListDTO';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-list-client',
    templateUrl: './list-client.component.html',
    styleUrls: ['./list-client.component.css'],
    animations: [
        trigger('toggleAnimation', [
            transition(':enter', [style({ opacity: 0, transform: 'scale(0.95)' }), animate('100ms ease-out', style({ opacity: 1, transform: 'scale(1)' }))]),
            transition(':leave', [animate('75ms', style({ opacity: 0, transform: 'scale(0.95)' }))]),
        ]),
    ],
})
export class ClientListComponent implements OnInit {
    clients: TreeNode[] = [];
    files: TreeNode[] = [];
    filteredClients: TreeNode[] = [];
    cols: any[] = [];
    rows: any[] = [];
    @ViewChild('tt') tt: any;
    filterMode = 'lenient';
    totalElements: number = 0;
    page: number = 0;
    size: number = 5;
    filter: string = '';
    form: FormGroup;
    isSubmitForm = false;
    isLoading = false;
    selectedClient: any;
    @ViewChild('editModal') editModal: any;
    constructor(private clientService: ClientManagementService,
        private fb: FormBuilder,
        private router: Router) {
        this.form = this.fb.group({
            cin: ['', Validators.required],
            firstName: [''],
            lastName: [''],
            rib: [''],
            solde: [0, Validators.min(0)]
        });
    }

    ngOnInit() {
        this.cols = [
            { field: 'id', title: 'ID', width: '15%' },
            { field: 'cin', title: 'CIN', width: '10%' },
            { field: 'firstName', title: 'First Name', width: '15%' },
            { field: 'lastName', title: 'Last Name', width: '15%' },
            { field: 'rib', title: 'RIB', width: '15%' },
            { field: 'solde', title: 'Solde', width: '15%' },
            { field: 'action', title: 'Action', width: '15%', sort: false },
        ];
        this.loadClients();
    }

    loadClients(): void {
        this.clientService.getAllClients(this.page, this.size).subscribe({
            next: (response: ClientListDTO) => {
                if (response.clients) {
                    this.rows = this.mapClientDTOToRows(response.clients);
                    this.filteredClients = [...this.rows];
                }
                this.totalElements = response.totalElements || 0;
            },
            error: err => {
                this.showMessage('Error loading clients', 'error');
                console.error('Error fetching clients:', err);
            }
        });
    }

    mapClientDTOToRows(clients: ClientDTO[]): any[] {
        return clients.map(client => ({
            id: client.id,
            cin: client.cin,
            firstName: client.firstName,
            lastName: client.lastName,
            rib: client.comptes?.[0]?.rib || 'N/A',
            solde: client.comptes?.[0]?.solde || 0
        }));
    }


    onPageChange(event: any): void {
        this.page = event.page;
        this.size = event.rows;
        this.loadClients();
    }

    onFilterChange(event: any): void {
        this.filter = event.target.value;
        this.page = 0;
        this.applyFilter();
    }

    applyFilter() {
        if (this.filter.trim() === '') {
            this.filteredClients = [...this.clients];
        } else {
            this.filteredClients = this.clients.filter(client =>
                client.data.firstName.toLowerCase().includes(this.filter.toLowerCase()) ||
                client.data.lastName.toLowerCase().includes(this.filter.toLowerCase()) ||
                client.data.cin.toLowerCase().includes(this.filter.toLowerCase())
            );
        }
    }

    openEditModal(client: any): void {
        this.selectedClient = client;
        this.form.patchValue(client);
        this.isSubmitForm = false;
        this.editModal.open();
    }

    submitForm(): void {
        this.isSubmitForm = true;
        if (this.form.valid && this.selectedClient?.id) {
            this.isLoading = true;

            console.log("selected value ",this.selectedClient);

            const updatedClient: ClientDTO = {
                id: this.selectedClient?.id,
                cin: this.form.value.cin,
                firstName: this.form.value.firstName,
                lastName: this.form.value.lastName,
                comptes: [
                    {
                        rib: this.form.value.rib,
                        solde: this.form.value.solde,
                        clientId: this.selectedClient?.id,
                    },
                ],
            };


            this.clientService.updateClient(updatedClient, this.selectedClient.id).subscribe({
                next: () => {
                    this.isLoading = false;
                    this.showMessage('Client updated successfully', 'success');
                    this.loadClients();
                    this.closeEditModal();
                },
                error: err => {
                    this.isLoading = false;
                    this.showMessage('Error updating client', 'error');
                    console.error('Error updating client:', err);
                },
            });
        } else {
            this.showMessage('Form is invalid or client ID is missing', 'error');
        }
    }


    closeEditModal(): void {
        this.editModal.close();
    }


    deleteClient(clientId: string): void {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You won’t be able to revert this!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(result => {
            if (result.isConfirmed) {
                this.clientService.deleteClient(clientId).subscribe({
                    next: () => {
                        this.showMessage('Client deleted successfully', 'success');
                        this.loadClients(); 
                    },
                    error: err => {
                        this.showMessage('Error deleting client', 'error');
                        console.error('Error deleting client:', err);
                    }
                });
            }
        });
    }

    showMessage(msg = '', type = 'success') {
        const toast: any = Swal.mixin({
            toast: true,
            position: 'top',
            showConfirmButton: false,
            timer: 3000,
            customClass: { container: 'toast' },
        });
        toast.fire({
            icon: type,
            title: msg,
            padding: '10px 20px',
        });
    }

    onGlobalFilterChange(event: Event) {
        const inputValue = (event.target as HTMLInputElement).value;
        this.tt.filterGlobal(inputValue, 'contains');
    }
}
