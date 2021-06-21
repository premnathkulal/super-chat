import { VuexModule, Module, Mutation, Action } from "vuex-module-decorators";
import { ContactActions, ContactMutations } from "@/types/types";
import { updateContactList, getContactList } from "@/utils/api";
import { ContactList } from "@/types/interface";
import { AxiosResponse } from "axios";

@Module({ namespaced: true })
class Contacts extends VuexModule {
  public contactList: ContactList[] = [];
  public isLoggedIn = false;
  public uid: string | null = null;

  @Mutation
  public async [ContactMutations.LOAD_CONTACTS](): Promise<void> {
    getContactList(this.uid).then((response: AxiosResponse) => {
      this.contactList = response.data || [];
    });
  }

  @Action
  [ContactActions.LOAD_CONTACTS](): void {
    this.context.commit(ContactMutations.LOAD_CONTACTS);
  }

  @Mutation
  public [ContactMutations.ADD_CONTACT](contacts: {
    name: string;
    email: string;
  }): void {
    this.contactList.push(contacts);
    updateContactList(this.contactList, this.uid);
  }

  @Action
  [ContactActions.ADD_CONTACT](contacts: {
    name: string;
    email: string;
  }): void {
    this.context.commit(ContactMutations.ADD_CONTACT, contacts);
  }

  @Mutation
  public [ContactMutations.SET_USER_ID](uid: string): void {
    this.uid = uid;
    if (!uid) {
      this.contactList = [];
    }
  }

  @Action
  [ContactActions.SET_USER_ID](uid: string | null): void {
    this.context.commit(ContactMutations.SET_USER_ID, uid);
  }

  get loadContacts(): ContactList[] {
    return this.contactList;
  }
}
export default Contacts;
