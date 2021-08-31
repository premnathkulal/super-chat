import { VuexModule, Module, Mutation, Action } from "vuex-module-decorators";
import { ContactActions, ContactMutations } from "@/types/types";
import { connectionSocket } from "..";

@Module({ namespaced: true })
class Contacts extends VuexModule {
  groupList = [];

  @Mutation
  public [ContactMutations.GROUP_CREATED](groupList: any): void {
    console.log(groupList);

    this.groupList = groupList;
  }

  @Action
  public [ContactActions.GROUP_CREATED](groupList: any): void {
    this.context.commit(ContactMutations.GROUP_CREATED, groupList);
  }

  @Action
  public async [ContactActions.CREATE_GROUP](groupName: string): Promise<void> {
    // createGroup(groupName);
    const data = await connectionSocket.createGroup(groupName);
  }

  get group(): any {
    return this.groupList;
  }
}
export default Contacts;
