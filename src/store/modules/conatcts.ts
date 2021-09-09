import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators';
import { ContactActions, ContactMutations } from '@/types/types';
import { connectionSocket } from '..';
import { loadGroup } from '@/utils/api';
import { AxiosResponse } from 'axios';

@Module({ namespaced: true })
class Contacts extends VuexModule {
  groupList: any = [];
  groupCreated = false;

  @Mutation
  public [ContactMutations.GROUP_CREATED_FLAG](): void {
    this.groupCreated = !this.groupCreated;
  }

  @Action
  public [ContactActions.GROUP_CREATED_FLAG](): void {
    this.context.commit(ContactMutations.GROUP_CREATED_FLAG);
  }

  @Mutation
  public [ContactMutations.GROUP_CREATED](groupList: any): void {
    this.groupList.push(groupList);
    this.groupCreated = true;
  }

  @Action
  public [ContactActions.GROUP_CREATED](groupList: any): void {
    this.context.commit(ContactMutations.GROUP_CREATED, groupList);
  }

  @Action
  public async [ContactActions.CREATE_GROUP](data: {
    groupName: string;
    groupOwners: string[];
  }): Promise<void> {
    const result = await connectionSocket.createGroup(data);
  }

  @Mutation
  public [ContactMutations.LOAD_GROUP](groupList: any): void {
    this.groupList = groupList;
  }

  @Action
  public [ContactActions.LOAD_GROUP](): void {
    loadGroup().then((result: AxiosResponse) => {
      this.context.commit(ContactMutations.LOAD_GROUP, result.data.data);
    });
  }

  get group(): any {
    return this.groupList;
  }

  get isGroupCreated(): boolean {
    return this.groupCreated;
  }
}
export default Contacts;
