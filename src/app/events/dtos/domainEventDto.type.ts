import { EntityType } from "../../resources/types/entityTypes.enum"
import { UserType } from "../../resources/types/userTypes.enum"

export type DomainEventDto = {
  publicId: string,
  name: string,
  receiverTypes: UserType[],
  sendDate: string,
  entityType: EntityType,
  entityPublicId: string,
  title: string,
  message?: string | null
};
