import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AddressBookService } from '../../services/address-book';
import { Contact } from '../../models/contact';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact-form.html',
  styleUrls: ['./contact-form.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactFormComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private addressBookService = inject(AddressBookService);

  form = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', Validators.required],
  });

  contactId = this.route.snapshot.paramMap.get('id');

  constructor() {
    if (this.contactId) {
      this.addressBookService.getContacts().subscribe(contacts => {
        const contact = contacts.find(c => c.id === this.contactId);
        if (contact) {
          this.form.patchValue(contact);
        }
      });
    }
  }

  saveContact() {
    if (this.form.valid) {
      const contact = this.form.value as Contact;
      if (this.contactId) {
        contact.id = this.contactId;
        this.addressBookService.updateContact(contact).then(() => this.router.navigate(['/']));
      } else {
        this.addressBookService.addContact(contact).then(() => this.router.navigate(['/']));
      }
    }
  }
}
