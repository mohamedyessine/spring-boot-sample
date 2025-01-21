import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ClientDTO } from '../common/model/clientDTO';
import { ClientManagementService } from '../common/service/clientManagement.service';

@Component({
    selector: 'app-add-client',
    templateUrl: './add-client.component.html',
    styleUrls: ['./add-client.component.css']
})
export class AddClientComponent {
    constructor(
        private router: Router,
        private clientService: ClientManagementService

    ) { }

    comptes: { rib: string; solde: number }[] = [];
    isLoading = false;
    input6: string | undefined;
    client = { cin: '', firstName: '', lastName: '' };

    ngOnInit() {

    }

    addCompte() {
        this.comptes.push({ rib: '', solde: 0 });
    }

    removeCompte(index: number) {
        this.comptes.splice(index, 1);
    }

    isFormClientValid() {
        // Check if client information is valid
        if (!this.client.cin ) {
            return false;
        }

        // Check if all comptes are valid
        for (const compte of this.comptes) {
            if (!compte.rib || compte.solde == null) {
                return false;
            }
        }

        return true;
    }

    saveClientWithCompte() {
        if (!this.isFormClientValid()) {
            this.showMessage('Please fill all fields.', 'error');
            return;
        }

        this.isLoading = true;

        const payload: ClientDTO = {
            cin: this.client.cin,
            firstName: this.client.firstName,
            lastName: this.client.lastName,
            comptes: this.comptes.map((compte) => ({
                rib: compte.rib,
                solde: compte.solde,
            })),
        };

        this.clientService.createClientWithComptes(payload).subscribe({
            next: (response) => {
                this.isLoading = false;
                this.showMessage('Client and comptes added successfully!', 'success');
                this.resetFields();
            },
            error: (error) => {
                this.isLoading = false;
                this.showMessage('Error occurred while saving client.', 'error');
                console.error('Error:', error);
            },
        });
    }

    // Reset the form fields
    resetFields() {
        this.client = { cin: '', firstName: '', lastName: '' };
        this.comptes = [];
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
