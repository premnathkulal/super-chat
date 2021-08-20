import { VuexModule, Module, Mutation, Action } from "vuex-module-decorators";
import { ContactActions, ContactMutations } from "@/types/types";

@Module({ namespaced: true })
class Contacts extends VuexModule {
  // public contactList: ContactList[] = [];
  public isLoggedIn = false;
  public uid: string | null = null;

  @Mutation
  public async [ContactMutations.LOAD_CONTACTS](): Promise<void> {
    //
  }

  @Action
  [ContactActions.LOAD_CONTACTS](): void {
    this.context.commit(ContactMutations.LOAD_CONTACTS);
  }

  // @Mutation
  // public [ContactMutations.ADD_CONTACT](contacts: { email: string }): void {
  //   //
  // }

  @Action
  [ContactActions.ADD_CONTACT](contacts: { email: string }): void {
    this.context.commit(ContactMutations.ADD_CONTACT, contacts);
  }

  @Mutation
  public [ContactMutations.SET_USER_ID](uid: string): void {
    this.uid = uid;
  }

  @Action
  [ContactActions.SET_USER_ID](uid: string | null): void {
    this.context.commit(ContactMutations.SET_USER_ID, uid);
  }
}
export default Contacts;
