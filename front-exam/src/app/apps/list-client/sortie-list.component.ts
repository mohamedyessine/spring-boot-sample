import { animate, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TreeNode } from 'primeng/api';
import { TreeTable } from 'primeng/treetable';
import { Sortie } from 'src/app/common/models/sortie';
import { UserSortieFullDTO } from 'src/app/common/models/userSortieFullDTO';
import { MarinSortieControllerService } from 'src/app/common/services/marinSortieController.service';
import { SortieControllerService } from 'src/app/common/services/sortieController.service';
import { UserSortieControllerService } from 'src/app/common/services/userSortieController.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-sortie-list',
    templateUrl: './sortie-list.component.html',
    styleUrls: ['./sortie-list.component.css'],
    animations: [
        trigger('toggleAnimation', [
            transition(':enter', [style({ opacity: 0, transform: 'scale(0.95)' }), animate('100ms ease-out', style({ opacity: 1, transform: 'scale(1)' }))]),
            transition(':leave', [animate('75ms', style({ opacity: 0, transform: 'scale(0.95)' }))]),
        ]),
    ],
})
export class SortieListComponent implements OnInit {
    files: TreeNode[] = [];
    cols: any[] = [];
    @ViewChild('tt') tt: any;
    filterMode = 'lenient';
    constructor(private userSortieService: UserSortieControllerService,
        private marinSortieService: MarinSortieControllerService,
        private sortieService: SortieControllerService,
        private router: Router) { }

    ngOnInit() {
        this.fetchSortie();
    }

    fetchSortie() {
        this.sortieService.getAllSorties().subscribe(
            (response: Sortie[]) => {
                console.log(response);
                this.files = response.map((sortie: Sortie) => ({
                    data: sortie,
                    children: sortie.subSorties ? this.mapSorties(sortie.subSorties) : undefined
                }));
                this.cols = [
                    { field: 'id', header: 'Sortie ID' },
                    { field: 'revenue', header: 'Revenue' },
                    { field: 'period', header: 'Periode' },
                    { field: 'totalDepense', header: 'Depense' },
                    { field: 'totalGain', header: 'Gain' },
                    { field: 'totalPart', header: 'Part' },
                    { field: 'bateau.name', header: 'Bateau' },
                    { field: 'closed', header: 'Status' },
                    { field: 'actions', header: 'Actions', sort: false, headerClass: 'justify-center' },
                ];
            },
            (error) => {
                console.error('Error fetching sorties:', error);
            }
        );
    }

    private mapSorties(sorties: Sortie[]): TreeNode[] {
        return sorties.map((sortie: Sortie) => ({
            data: sortie,
            children: sortie.subSorties ? this.mapSorties(sortie.subSorties) : undefined
        }));
    }

    editSortie(sortie: Sortie) {
        console.log("sortie ", sortie);
        this.userSortieService.setSelectedSortie(sortie);
        this.router.navigate(['/apps/sortie/preview'])
    }


    closeSortie(sortie: Sortie) {
        if (!sortie || !sortie.id) {
            this.showMessage('Invalid sortie object or sortie ID is missing.');
            return;
        }
        this.sortieService.closeSortie(sortie.id).subscribe(
            (response: any) => {
                this.showMessage('Sortie closed successfully.');
                this.fetchSortie(); // Refresh
            },
            error => {
                console.error('Error closing sortie:', error);
                this.showMessage('Error closing sortie.', 'error');
            }
        );
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

    addSortie(sortie: Sortie | null = null) {
        localStorage.removeItem('selectedSortie');
        console.log("sortie ", sortie);
        if (sortie) {
            this.userSortieService.setSelectedSortie(sortie);
        } else {

            this.userSortieService.setSelectedSortie(null);
        }
        this.router.navigate(['/apps/sortie/add']);
    }



}
