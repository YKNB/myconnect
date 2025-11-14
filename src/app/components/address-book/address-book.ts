import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Contact } from '../../models/contact';
import { AddressBookService } from '../../services/address-book';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-address-book',
  imports: [CommonModule, RouterModule],
  templateUrl: './address-book.html',
  styleUrls: ['./address-book.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddressBookComponent {
  private addressBookService = inject(AddressBookService);

  contacts$: Observable<Contact[]> = this.addressBookService.getContacts();

  deleteContact(id: string) {
    this.addressBookService.deleteContact(id);
  }
}
