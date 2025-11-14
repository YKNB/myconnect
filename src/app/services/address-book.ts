import { inject, Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Contact } from '../models/contact';

@Injectable({
  providedIn: 'root',
})
export class AddressBookService {
  private firestore: Firestore = inject(Firestore);

  private contactsCollection = collection(this.firestore, 'contacts');

  getContacts(): Observable<Contact[]> {
    return collectionData(this.contactsCollection, { idField: 'id' }) as Observable<Contact[]>;
  }

  addContact(contact: Contact) {
    return addDoc(this.contactsCollection, contact);
  }

  updateContact(contact: Contact) {
    const contactDoc = doc(this.firestore, `contacts/${contact.id}`);
    return updateDoc(contactDoc, { ...contact });
  }

  deleteContact(id: string) {
    const contactDoc = doc(this.firestore, `contacts/${id}`);
    return deleteDoc(contactDoc);
  }
}
