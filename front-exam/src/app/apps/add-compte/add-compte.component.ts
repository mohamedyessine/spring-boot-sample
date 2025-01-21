import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ClientDTO } from '../common/model/clientDTO';
import { ClientManagementService } from '../common/service/clientManagement.service';
import { CompteManagementService } from '../common/service/compteManagement.service';
import { CompteDTO } from '../common/model/compteDTO';
import { ClientListDTO } from '../common/model/clientListDTO';

@Component({
    selector: 'app-add-compte',
    templateUrl: './add-compte.component.html',
    styleUrls: ['./add-compte.component.css']
})
export class AddCompteComponent {
    compte: CompteDTO = {
        rib: '',
        solde: 0,
        clientId: '',
    };
    clients!: any;
    selectedClient: ClientDTO = {
        id: '',
        firstName: "",
        lastName: '',
    };
    isLoading = false;
    totalElements: number = 0;
    page: number = 0;
    size: number = 10;
    constructor(
        private router: Router,
        private compteService: CompteManagementService,
        private clientService: ClientManagementService,
    ) { }

    ngOnInit(): void {
        this.loadClients(); // Fetch the list of clients on initialization
    }

    loadClients(): void {
        this.clientService.getAllClients(this.page, this.size).subscribe({
            next: (response: ClientListDTO) => {
                if (response.clients) {
                    this.clients = response.clients
                }
                this.totalElements = response.totalElements || 0;
            },
            error: err => {
                this.showMessage('Error loading clients', 'error');
                console.error('Error fetching clients:', err);
            }
        });
    }

    isFormCompteValid(): boolean {
        return !!this.compte.rib && !!this.compte.solde && !!this.selectedClient;
    }

    saveCompte(): void {
        if (!this.isFormCompteValid()) {
            this.showMessage('Veuillez remplir tous les champs requis', 'error');
            return;
        }

        this.isLoading = true;
        this.compte.clientId = this.selectedClient.id;

        this.compteService.createCompte(this.compte).subscribe({
            next: (response) => {
                this.showMessage('Compte ajouté avec succès', 'success');
                this.resetFields();
                this.router.navigate(['/comptes']); // Redirect after successful creation
            },
            error: (error) => {
                console.error(error);
                this.showMessage('Erreur lors de l’ajout du compte', 'error');
            },
            complete: () => {
                this.isLoading = false;
            },
        });
    }

    resetFields(): void {
        this.compte = { rib: '', solde: 0, clientId: '' };
        this.selectedClient = {
            id: '',
            firstName: "",
            lastName: '',
        };
    }

    onClientSelected(event: any) {
        this.selectedClient = event;

        if (this.selectedClient) {
            this.compte.clientId = this.selectedClient.id;
        }
        console.log(this.selectedClient);

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

}
